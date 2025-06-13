"use client"

import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import RatingSystem from "@/components/rating-system"
import CommentSection from "@/components/comment-section"
import LoadingSpinner from "@/components/loading-spinner"

export default function SoftwareDetailPage({ params }) {
  const [software, setSoftware] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const softwareDoc = await getDoc(doc(db, "software", params.id))
        if (softwareDoc.exists()) {
          setSoftware({ id: softwareDoc.id, ...softwareDoc.data() })
        }
      } catch (error) {
        console.error("Error fetching software:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSoftware()
  }, [params.id])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!software) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Software no encontrado</h1>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary">
        <ArrowLeft size={16} />
        <span>Volver al catálogo</span>
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl">{software.nombre}</CardTitle>
                  <CardDescription className="text-lg mt-2">{software.descripcionCorta}</CardDescription>
                </div>
                <Badge variant="outline">{software.licencia}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Descripción</h3>
                  <p className="text-muted-foreground">{software.descripcion}</p>
                </div>

                {software.video && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Video demostrativo</h3>
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={software.video}
                        title={`Video demostrativo de ${software.nombre}`}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                <RatingSystem softwareId={params.id} />
                <CommentSection softwareId={params.id} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Información</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Autor</h3>
                  <p>{software.autor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Año de lanzamiento</h3>
                  <p>{software.anoLanzamiento}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Objetivo</h3>
                  <p>{software.objetivo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Enlace</h3>
                  <a
                    href={software.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    Visitar sitio <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
