"use client";

import { useState, useEffect } from "react";
import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	orderBy,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";

export default function CommentSection({ softwareId }) {
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState({
		author: "",
		content: "",
	});

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const q = query(
					collection(db, "comments"),
					where("softwareId", "==", softwareId)
				);
				const querySnapshot = await getDocs(q);
				const commentsData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
					createdAt: doc.data().createdAt?.toDate(),
				}));
				console.log("Fetched comments:", commentsData);
				setComments(commentsData);
			} catch (error) {
				console.error("Error fetching comments:", error);
			}
		};

		fetchComments();
	}, [softwareId]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!newComment.author.trim() || !newComment.content.trim()) {
			return;
		}

		try {
			const docRef = await addDoc(collection(db, "comments"), {
				softwareId,
				author: newComment.author,
				content: newComment.content,
				createdAt: serverTimestamp(),
			});

			// Add the new comment to the list
			setComments([
				{
					id: docRef.id,
					softwareId,
					author: newComment.author,
					content: newComment.content,
					createdAt: new Date(),
				},
				...comments,
			]);

			// Reset the form
			setNewComment({
				author: "",
				content: "",
			});
		} catch (error) {
			console.error("Error adding comment:", error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewComment((prev) => ({
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

	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium">Comentarios</h3>

			<form
				onSubmit={handleSubmit}
				className="space-y-4">
				<div className="grid gap-2">
					<Label htmlFor="author">Tu nombre</Label>
					<Input
						id="author"
						name="author"
						value={newComment.author}
						onChange={handleChange}
						placeholder="Ingresa tu nombre"
						required
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="content">Comentario</Label>
					<Textarea
						id="content"
						name="content"
						value={newComment.content}
						onChange={handleChange}
						placeholder="Comparte tu opinión sobre este software..."
						className="min-h-[100px]"
						required
					/>
				</div>
				<Button type="submit">Publicar comentario</Button>
			</form>

			<div className="space-y-4">
				{comments.length > 0 ? (
					comments.map((comment) => (
						<div
							key={comment.id}
							className="flex gap-4 p-4 border rounded-lg">
							<Avatar>
								<AvatarFallback>{getInitials(comment.author)}</AvatarFallback>
							</Avatar>
							<div className="space-y-1">
								<div className="flex items-center gap-2">
									<span className="font-medium">{comment.author}</span>
									<span className="text-xs text-muted-foreground">
										{comment.createdAt
											? new Date(comment.createdAt).toLocaleDateString()
											: "Ahora"}
									</span>
								</div>
								<p className="text-sm">{comment.content}</p>
							</div>
						</div>
					))
				) : (
					<div className="text-center py-8">
						<MessageSquare className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
						<p className="text-muted-foreground">
							No hay comentarios aún. ¡Sé el primero en comentar!
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
