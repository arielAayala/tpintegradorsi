"use client";

import { useState, useEffect } from "react";
import {
	collection,
	getDocs,
	addDoc,
	serverTimestamp,
	query,
	orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingSpinner from "@/components/loading-spinner";
import Link from "next/link";

export default function ForoPage() {
	const [topics, setTopics] = useState([]);
	const [loading, setLoading] = useState(true);
	const [newTopic, setNewTopic] = useState({
		title: "",
		content: "",
		author: "",
	});
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const fetchTopics = async () => {
			try {
				const q = query(collection(db, "foro"), orderBy("createdAt", "desc"));
				const querySnapshot = await getDocs(q);
				const topicsData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setTopics(topicsData);
			} catch (error) {
				console.error("Error fetching topics:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTopics();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!newTopic.title || !newTopic.content || !newTopic.author) {
			return;
		}

		try {
			await addDoc(collection(db, "foro"), {
				...newTopic,
				createdAt: serverTimestamp(),
				replies: 0,
				views: 0,
			});

			// Refresh topics
			const q = query(collection(db, "foro"), orderBy("createdAt", "desc"));
			const querySnapshot = await getDocs(q);
			const topicsData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setTopics(topicsData);

			// Reset form
			setNewTopic({
				title: "",
				content: "",
				author: "",
			});
			setOpen(false);
		} catch (error) {
			console.error("Error adding topic:", error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewTopic((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-3xl font-bold">Foro de Discusión</h1>
					<p className="text-muted-foreground mt-2">
						Participa en debates sobre sistemas inteligentes y comparte tus
						conocimientos
					</p>
				</div>
				<Dialog
					open={open}
					onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className="mr-2 h-4 w-4" /> Nuevo Tema
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[500px]">
						<form onSubmit={handleSubmit}>
							<DialogHeader>
								<DialogTitle>Crear nuevo tema</DialogTitle>
								<DialogDescription>
									Comparte tus ideas o preguntas con la comunidad. Sé claro y
									respetuoso.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid gap-2">
									<Label htmlFor="title">Título</Label>
									<Input
										id="title"
										name="title"
										value={newTopic.title}
										onChange={handleChange}
										placeholder="Escribe un título descriptivo"
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="content">Contenido</Label>
									<Textarea
										id="content"
										name="content"
										value={newTopic.content}
										onChange={handleChange}
										placeholder="Describe tu tema, pregunta o idea..."
										className="min-h-[120px]"
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="author">Tu nombre</Label>
									<Input
										id="author"
										name="author"
										value={newTopic.author}
										onChange={handleChange}
										placeholder="¿Cómo quieres que te conozcan?"
										required
									/>
								</div>
							</div>
							<DialogFooter>
								<Button type="submit">Publicar tema</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<Tabs
				defaultValue="recientes"
				className="w-full">
				<TabsList className="mb-6">
					<TabsTrigger value="recientes">Recientes</TabsTrigger>
					<TabsTrigger value="populares">Populares</TabsTrigger>
				</TabsList>
				<TabsContent value="recientes">
					<div className="space-y-4">
						{topics.length > 0 ? (
							topics.map((topic) => (
								<Card key={topic.id}>
									<CardHeader>
										<CardTitle className="text-xl">{topic.title}</CardTitle>
										<CardDescription>
											Iniciado por {topic.author} •{" "}
											{new Date(topic.createdAt?.toDate()).toLocaleDateString()}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="line-clamp-2">{topic.content}</p>
									</CardContent>
									<CardFooter className="flex justify-between">
										<div className="flex items-center text-sm text-muted-foreground">
											<MessageSquare className="mr-1 h-4 w-4" />
											{topic.replies || 0} respuestas
										</div>
										<Link href={`/foro/${topic.id}`}>
											<Button
												variant="outline"
												size="sm">
												Ver discusión
											</Button>
										</Link>
									</CardFooter>
								</Card>
							))
						) : (
							<div className="text-center py-12">
								<MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
								<h3 className="text-lg font-medium mb-2">
									No hay temas de discusión aún
								</h3>
								<p className="text-muted-foreground mb-4">
									Sé el primero en iniciar una conversación
								</p>
								<Button onClick={() => setOpen(true)}>Crear nuevo tema</Button>
							</div>
						)}
					</div>
				</TabsContent>
				<TabsContent value="populares">
					<div className="space-y-4">
						{/* Aquí se mostrarían los temas ordenados por popularidad */}
						<div className="text-center py-12">
							<p className="text-muted-foreground">
								Los temas populares se mostrarán aquí
							</p>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
