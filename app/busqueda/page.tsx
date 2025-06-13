"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
	collection,
	query,
	where,
	getDocs,
	orderBy,
	limit,
	startAfter,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "@/components/loading-spinner";

export default function BusquedaPage() {
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get("q") || "";
	const categoryFilter = searchParams.get("category") || "all";
	const yearFilter = searchParams.get("year") || "all";
	const licenseFilter = searchParams.get("license") || "all";

	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [lastVisible, setLastVisible] = useState(null);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		const fetchResults = async () => {
			setLoading(true);
			try {
				let q = collection(db, "software");
				const constraints = [];

				// Aplicar filtros
				if (categoryFilter !== "all") {
					constraints.push(where("categoria", "==", categoryFilter));
				}

				if (yearFilter !== "all") {
					if (yearFilter === "older") {
						constraints.push(where("anoLanzamiento", "<", 2020));
					} else {
						constraints.push(
							where("anoLanzamiento", "==", Number.parseInt(yearFilter))
						);
					}
				}

				if (licenseFilter !== "all") {
					constraints.push(where("licencia", "==", licenseFilter));
				}

				// Si hay una búsqueda de texto, necesitamos filtrar manualmente
				// ya que Firestore no soporta búsqueda de texto completo
				let querySnapshot;

				if (constraints.length > 0) {
					q = query(
						q,
						...constraints,
						orderBy("anoLanzamiento", "desc"),
						limit(10)
					);
					querySnapshot = await getDocs(q);
				} else {
					q = query(q, orderBy("anoLanzamiento", "desc"), limit(10));
					querySnapshot = await getDocs(q);
				}

				// Filtrar resultados por texto si hay una búsqueda
				const filteredResults = [];
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					if (
						!searchQuery ||
						data.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
						data.descripcionCorta
							.toLowerCase()
							.includes(searchQuery.toLowerCase()) ||
						data.descripcion
							.toLowerCase()
							.includes(searchQuery.toLowerCase()) ||
						data.objetivo.toLowerCase().includes(searchQuery.toLowerCase()) ||
						data.autor.toLowerCase().includes(searchQuery.toLowerCase())
					) {
						filteredResults.push({ id: doc.id, ...data });
					}
				});

				setResults(filteredResults);
				setLastVisible(
					querySnapshot.docs[querySnapshot.docs.length - 1] || null
				);
				setHasMore(querySnapshot.docs.length === 10);
			} catch (error) {
				console.error("Error fetching search results:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchResults();
	}, [searchQuery, categoryFilter, yearFilter, licenseFilter]);

	const loadMore = async () => {
		if (!lastVisible) return;

		setLoading(true);
		try {
			let q = collection(db, "software");
			const constraints = [];

			// Aplicar filtros
			if (categoryFilter !== "all") {
				constraints.push(where("categoria", "==", categoryFilter));
			}

			if (yearFilter !== "all") {
				if (yearFilter === "older") {
					constraints.push(where("anoLanzamiento", "<", 2020));
				} else {
					constraints.push(
						where("anoLanzamiento", "==", Number.parseInt(yearFilter))
					);
				}
			}

			if (licenseFilter !== "all") {
				constraints.push(where("licencia", "==", licenseFilter));
			}

			// Consulta con paginación
			q = query(
				q,
				...constraints,
				orderBy("anoLanzamiento", "desc"),
				startAfter(lastVisible),
				limit(10)
			);
			const querySnapshot = await getDocs(q);

			// Filtrar resultados por texto si hay una búsqueda
			const newResults = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				if (
					!searchQuery ||
					data.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
					data.descripcionCorta
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					data.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
					data.objetivo.toLowerCase().includes(searchQuery.toLowerCase()) ||
					data.autor.toLowerCase().includes(searchQuery.toLowerCase())
				) {
					newResults.push({ id: doc.id, ...data });
				}
			});

			setResults((prev) => [...prev, ...newResults]);
			setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
			setHasMore(querySnapshot.docs.length === 10);
		} catch (error) {
			console.error("Error loading more results:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-2">Resultados de búsqueda</h1>
			<p className="text-muted-foreground mb-6">
				{searchQuery
					? `Búsqueda: "${searchQuery}"`
					: "Todos los sistemas inteligentes"}
				{categoryFilter !== "all" && ` • Categoría: ${categoryFilter}`}
				{yearFilter !== "all" && ` • Año: ${yearFilter}`}
				{licenseFilter !== "all" && ` • Licencia: ${licenseFilter}`}
			</p>

			{loading && results.length === 0 ? (
				<LoadingSpinner />
			) : results.length > 0 ? (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{results.map((item) => (
							<Card
								key={item.id}
								className="flex flex-col">
								<CardHeader>
									<div className="flex justify-between items-start">
										<CardTitle>{item.nombre}</CardTitle>
										<Badge variant="outline">{item.licencia}</Badge>
									</div>
									<CardDescription>{item.descripcionCorta}</CardDescription>
								</CardHeader>
								<CardContent className="flex-1">
									<p className="line-clamp-3 text-sm text-muted-foreground">
										{item.descripcion}
									</p>
									{item.categoria && (
										<Badge
											variant="secondary"
											className="mt-2">
											{item.categoria}
										</Badge>
									)}
								</CardContent>
								<CardFooter className="flex justify-between">
									<div className="text-sm text-muted-foreground">
										{item.anoLanzamiento}
									</div>
									<div className="flex gap-2">
										<Link href={`/software/${item.id}`}>
											<Button
												variant="outline"
												size="sm">
												Ver detalles
											</Button>
										</Link>
										<a
											href={item.enlace}
											target="_blank"
											rel="noopener noreferrer">
											<Button
												size="sm"
												variant="ghost">
												<ExternalLink className="h-4 w-4" />
											</Button>
										</a>
									</div>
								</CardFooter>
							</Card>
						))}
					</div>

					{hasMore && (
						<div className="flex justify-center mt-8">
							<Button
								onClick={loadMore}
								disabled={loading}>
								{loading ? "Cargando..." : "Cargar más"}
							</Button>
						</div>
					)}
				</>
			) : (
				<div className="text-center py-16">
					<h2 className="text-xl font-medium mb-2">
						No se encontraron resultados
					</h2>
					<p className="text-muted-foreground mb-6">
						Intenta con otros términos de búsqueda o ajusta los filtros.
					</p>
					<Link href="/">
						<Button>Volver al inicio</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
