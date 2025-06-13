"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, limit, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function RecommendationsSection() {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // En una aplicación real, esto podría basarse en el historial del usuario
        // Por ahora, simplemente obtenemos algunos elementos destacados
        const q = query(collection(db, "software"), where("destacado", "==", true), limit(3))
        const querySnapshot = await getDocs(q)
        const recommendationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setRecommendations(recommendationsData)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
        // Si hay un error o no hay elementos destacados, mostramos algunos elementos predeterminados
        setRecommendations([
          {
            id: "rec1",
            nombre: "TensorFlow",
            descripcionCorta: "Biblioteca de código abierto para aprendizaje automático",
            categoria: "Machine Learning",
          },
          {
            id: "rec2",
            nombre: "GPT-4",
            descripcionCorta: "Modelo avanzado de procesamiento de lenguaje natural",
            categoria: "NLP",
          },
          {
            id: "rec3",
            nombre: "OpenCV",
            descripcionCorta: "Biblioteca de visión por computadora",
            categoria: "Computer Vision",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (loading || recommendations.length === 0) {
    return null
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Recomendado para ti</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.nombre}</CardTitle>
              <CardDescription>{item.descripcionCorta}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">{item.categoria}</div>
                <Link href={`/software/${item.id}`}>
                  <Button variant="ghost" size="sm">
                    Explorar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
