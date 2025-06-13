"use client";

import { useState, useEffect } from "react";
import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function RatingSystem({ softwareId }) {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [userName, setUserName] = useState("");
	const [hasRated, setHasRated] = useState(false);
	const [averageRating, setAverageRating] = useState(0);
	const [totalRatings, setTotalRatings] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	useEffect(() => {
		const fetchRatings = async () => {
			try {
				const q = query(
					collection(db, "ratings"),
					where("softwareId", "==", softwareId)
				);
				const querySnapshot = await getDocs(q);

				if (!querySnapshot.empty) {
					let total = 0;
					querySnapshot.forEach((doc) => {
						total += doc.data().value;
					});
					setAverageRating(total / querySnapshot.size);
					setTotalRatings(querySnapshot.size);
				}
			} catch (error) {
				console.error("Error fetching ratings:", error);
				setError(
					"No se pudieron cargar las calificaciones. Intenta de nuevo más tarde."
				);
			}
		};

		if (softwareId) {
			fetchRatings();
		}
	}, [softwareId]);

	const handleRatingSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (rating === 0) {
			setError("Por favor selecciona una calificación.");
			return;
		}

		if (!userName.trim()) {
			setError("Por favor ingresa tu nombre.");
			return;
		}

		setLoading(true);

		try {
			await addDoc(collection(db, "ratings"), {
				softwareId,
				value: rating,
				userName,
				createdAt: serverTimestamp(),
			});

			// Actualizar el promedio y total localmente
			const newTotal = averageRating * totalRatings + rating;
			const newCount = totalRatings + 1;
			setAverageRating(newTotal / newCount);
			setTotalRatings(newCount);

			setHasRated(true);
			setSuccess("¡Gracias por tu calificación!");
		} catch (error) {
			console.error("Error adding rating:", error);
			setError("Hubo un problema al enviar tu calificación. Intenta de nuevo.");
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setHasRated(false);
		setRating(0);
		setUserName("");
		setSuccess("");
	};

	return (
		<div className="space-y-4">
			<div>
				<h3 className="text-lg font-medium mb-2">Calificaciones</h3>
				<div className="flex items-center gap-2">
					<div className="flex">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className={cn(
									"w-5 h-5",
									star <= averageRating
										? "fill-yellow-400 text-yellow-400"
										: "text-muted-foreground"
								)}
							/>
						))}
					</div>
					<span className="font-medium">{averageRating.toFixed(1)}</span>
					<span className="text-muted-foreground">
						({totalRatings} calificaciones)
					</span>
				</div>
			</div>

			{error && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{success && (
				<Alert className="bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800">
					<CheckCircle2 className="h-4 w-4" />
					<AlertTitle>Éxito</AlertTitle>
					<AlertDescription>{success}</AlertDescription>
				</Alert>
			)}

			{!hasRated ? (
				<form
					onSubmit={handleRatingSubmit}
					className="space-y-4 border rounded-lg p-4">
					<div>
						<Label htmlFor="user-name">Tu nombre</Label>
						<Input
							id="user-name"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							placeholder="Ingresa tu nombre"
							required
						/>
					</div>
					<div>
						<Label>Tu calificación</Label>
						<div className="flex gap-1 mt-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className={cn(
										"w-6 h-6 cursor-pointer transition-colors",
										star <= (hover || rating)
											? "fill-yellow-400 text-yellow-400"
											: "text-muted-foreground"
									)}
									onClick={() => setRating(star)}
									onMouseEnter={() => setHover(star)}
									onMouseLeave={() => setHover(0)}
								/>
							))}
						</div>
						{rating > 0 && (
							<p className="text-sm mt-1">
								{rating === 1 && "Malo"}
								{rating === 2 && "Regular"}
								{rating === 3 && "Bueno"}
								{rating === 4 && "Muy bueno"}
								{rating === 5 && "Excelente"}
							</p>
						)}
					</div>
					<Button
						type="submit"
						disabled={loading}>
						{loading ? "Enviando..." : "Enviar calificación"}
					</Button>
				</form>
			) : (
				<div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950">
					<div className="flex items-center gap-2 mb-4">
						<CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
						<p className="text-green-600 dark:text-green-400 font-medium">
							¡Gracias por tu calificación!
						</p>
					</div>
					<Button
						variant="outline"
						onClick={resetForm}>
						Calificar de nuevo
					</Button>
				</div>
			)}
		</div>
	);
}
