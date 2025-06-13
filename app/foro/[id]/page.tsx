"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	doc,
	getDoc,
	collection,
	query,
	where,
	orderBy,
	addDoc,
	serverTimestamp,
	updateDoc,
	increment,
	getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "@/components/loading-spinner";

export default function ForoDetailPage({ params }) {
	const router = useRouter();
	const topicId = params.id; // Usamos directamente el ID del tema
	const [topic, setTopic] = useState(null);
	const [replies, setReplies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [replyLoading, setReplyLoading] = useState(false);
	const [newReply, setNewReply] = useState({
		author: "",
		content: "",
	});

	useEffect(() => {
		const fetchTopicAndReplies = async () => {
			try {
				// Obtener el tema
				const topicDoc = await getDoc(doc(db, "foro", topicId));

				if (!topicDoc.exists()) {
					router.push("/foro");
					return;
				}

				const topicData = { id: topicDoc.id, ...topicDoc.data() };
				setTopic(topicData);

				// Incrementar vistas
				await updateDoc(doc(db, "foro", topicId), {
					views: increment(1),
				});

				// Obtener respuestas - Nota: Necesitas crear el índice en Firestore
				try {
					// Primero intentamos con la consulta ordenada
					const repliesQuery = query(
						collection(db, "respuestas-foro"),
						where("topicId", "==", topicId),
						orderBy("createdAt", "asc")
					);

					const repliesSnapshot = await getDocs(repliesQuery);
					const repliesData = repliesSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
						createdAt: doc.data().createdAt?.toDate(),
					}));

					setReplies(repliesData);
				} catch (indexError) {
					console.error(
						"Error con índice, intentando sin ordenar:",
						indexError
					);

					// Si falla por el índice, intentamos sin ordenar
					const basicQuery = query(
						collection(db, "respuestas-foro"),
						where("topicId", "==", topicId)
					);

					const repliesSnapshot = await getDocs(basicQuery);
					const repliesData = repliesSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
						createdAt: doc.data().createdAt?.toDate(),
					}));

					// Ordenamos manualmente
					repliesData.sort((a, b) => {
						if (!a.createdAt) return 1;
						if (!b.createdAt) return -1;
						return a.createdAt - b.createdAt;
					});

					setReplies(repliesData);
				}
			} catch (error) {
				console.error("Error fetching topic and replies:", error);
			} finally {
				setLoading(false);
			}
		};

		if (topicId) {
			fetchTopicAndReplies();
		}
	}, [topicId, router]);

	const handleSubmitReply = async (e) => {
		e.preventDefault();

		if (!newReply.author.trim() || !newReply.content.trim()) {
			return;
		}

		setReplyLoading(true);

		try {
			// Añadir respuesta
			const replyData = {
				topicId: topicId,
				author: newReply.author,
				content: newReply.content,
				createdAt: serverTimestamp(),
			};

			const docRef = await addDoc(collection(db, "respuestas-foro"), replyData);

			// Actualizar contador de respuestas
			await updateDoc(doc(db, "foro", topicId), {
				replies: increment(1),
			});

			// Añadir la respuesta a la lista local
			setReplies([
				...replies,
				{
					id: docRef.id,
					...replyData,
					createdAt: new Date(),
				},
			]);

			// Limpiar formulario
			setNewReply({
				author: "",
				content: "",
			});
		} catch (error) {
			console.error("Error adding reply:", error);
		} finally {
			setReplyLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewReply((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const getInitials = (name) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.substring(0, 2);
	};

	const formatDate = (date) => {
		if (!date) return "Ahora";
		return new Date(date).toLocaleDateString("es-ES", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	if (!topic) {
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-2xl font-bold mb-4">Tema no encontrado</h1>
				<Link href="/foro">
					<Button>Volver al foro</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Link
				href="/foro"
				className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary">
				<ArrowLeft size={16} />
				<span>Volver al foro</span>
			</Link>

			<Card className="mb-8">
				<CardHeader>
					<div className="flex justify-between items-start">
						<div>
							<CardTitle className="text-2xl">{topic.title}</CardTitle>
							<CardDescription className="mt-1">
								Iniciado por {topic.author} •{" "}
								{formatDate(topic.createdAt?.toDate())}
							</CardDescription>
						</div>
						<div className="text-sm text-muted-foreground">
							{topic.views || 0} visitas • {topic.replies || 0} respuestas
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex gap-4">
						<Avatar className="h-10 w-10">
							<AvatarFallback>{getInitials(topic.author)}</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<p className="whitespace-pre-wrap">{topic.content}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<h2 className="text-xl font-bold mb-4">Respuestas</h2>

			<div className="space-y-4 mb-8">
				{replies.length > 0 ? (
					replies.map((reply) => (
						<Card key={reply.topicId}>
							<CardHeader>
								<div className="flex items-center gap-2">
									<Avatar className="h-8 w-8">
										<AvatarFallback>{getInitials(reply.author)}</AvatarFallback>
									</Avatar>
									<div>
										<div className="font-medium">{reply.author}</div>
										<div className="text-xs text-muted-foreground">
											{formatDate(reply.createdAt)}
										</div>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p className="whitespace-pre-wrap">{reply.content}</p>
							</CardContent>
						</Card>
					))
				) : (
					<div className="text-center py-8">
						<MessageSquare className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
						<p className="text-muted-foreground">
							No hay respuestas aún. ¡Sé el primero en responder!
						</p>
					</div>
				)}
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Responder</CardTitle>
					<CardDescription>
						Comparte tu opinión o conocimiento sobre este tema
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmitReply}
						className="space-y-4">
						<div className="grid gap-2">
							<Label htmlFor="author">Tu nombre</Label>
							<Input
								id="author"
								name="author"
								value={newReply.author}
								onChange={handleChange}
								placeholder="¿Cómo quieres que te conozcan?"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="content">Tu respuesta</Label>
							<Textarea
								id="content"
								name="content"
								value={newReply.content}
								onChange={handleChange}
								placeholder="Escribe tu respuesta..."
								className="min-h-[120px]"
								required
							/>
						</div>
						<Button
							type="submit"
							disabled={replyLoading}>
							{replyLoading ? "Enviando..." : "Enviar respuesta"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
