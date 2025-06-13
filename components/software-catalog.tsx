"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import LoadingSpinner from "@/components/loading-spinner"

export default function SoftwareCatalog() {
  const [software, setSoftware] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const q = query(collection(db, "software"), orderBy("anoLanzamiento", "desc"), limit(6))
        const querySnapshot = await getDocs(q)
        const softwareData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setSoftware(softwareData)
      } catch (error) {
        console.error("Error fetching software:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSoftware()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Software de Inteligencia Artificial</h2>
        <Link href="/busqueda">
          <Button variant="outline">Ver todo</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {software.length > 0 ? (
          software.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{item.nombre}</CardTitle>
                  <Badge variant="outline">{item.licencia}</Badge>
                </div>
                <CardDescription>{item.descripcionCorta}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-3 text-sm text-muted-foreground">{item.descripcion}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">{item.anoLanzamiento}</div>
                <div className="flex gap-2">
                  <Link href={`/software/${item.id}`}>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </Link>
                  <a href={item.enlace} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No hay software disponible en este momento.</p>
          </div>
        )}
      </div>
    </section>
  )
}
