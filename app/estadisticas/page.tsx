"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoadingSpinner from "@/components/loading-spinner"

export default function EstadisticasPage() {
  const [softwareStats, setSoftwareStats] = useState([])
  const [categoryStats, setCategoryStats] = useState([])
  const [topRatedSoftware, setTopRatedSoftware] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch software data
        const softwareSnapshot = await getDocs(collection(db, "software"))
        const softwareData = softwareSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        // Fetch ratings data
        const ratingsSnapshot = await getDocs(collection(db, "ratings"))
        const ratingsData = ratingsSnapshot.docs.map((doc) => doc.data())

        // Process data for statistics
        const softwareByYear = {}
        const categoryCounts = {}
        const softwareRatings = {}

        softwareData.forEach((software) => {
          // Count by year
          const year = software.anoLanzamiento || "Desconocido"
          softwareByYear[year] = (softwareByYear[year] || 0) + 1

          // Count by category
          const category = software.categoria || "Sin categoría"
          categoryCounts[category] = (categoryCounts[category] || 0) + 1
        })

        // Calculate average ratings
        ratingsData.forEach((rating) => {
          if (!softwareRatings[rating.softwareId]) {
            softwareRatings[rating.softwareId] = {
              count: 0,
              total: 0,
            }
          }
          softwareRatings[rating.softwareId].count += 1
          softwareRatings[rating.softwareId].total += rating.value
        })

        // Format data for charts
        const softwareStatsData = Object.entries(softwareByYear).map(([year, count]) => ({
          year,
          count,
        }))

        const categoryStatsData = Object.entries(categoryCounts).map(([category, count]) => ({
          category,
          count,
        }))

        // Calculate top rated software
        const topRated = softwareData
          .map((software) => {
            const ratings = softwareRatings[software.id]
            const averageRating = ratings ? ratings.total / ratings.count : 0
            return {
              ...software,
              averageRating,
              ratingCount: ratings ? ratings.count : 0,
            }
          })
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 5)

        setSoftwareStats(softwareStatsData)
        setCategoryStats(categoryStatsData)
        setTopRatedSoftware(topRated)
      } catch (error) {
        console.error("Error fetching statistics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Estadísticas</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Explora las tendencias y datos sobre los sistemas inteligentes en nuestra plataforma.
      </p>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ratings">Calificaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Software por Año de Lanzamiento</CardTitle>
                <CardDescription>Distribución de software según su año de lanzamiento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={softwareStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" name="Cantidad" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Software por Categoría</CardTitle>
                <CardDescription>Distribución de software según su categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#82ca9d" name="Cantidad" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="ratings">
          <Card>
            <CardHeader>
              <CardTitle>Software Mejor Calificado</CardTitle>
              <CardDescription>Los 5 sistemas con mejores calificaciones de los usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRatedSoftware.length > 0 ? (
                  topRatedSoftware.map((software) => (
                    <div key={software.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <h3 className="font-medium">{software.nombre}</h3>
                        <p className="text-sm text-muted-foreground">{software.descripcionCorta}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="text-amber-500 font-bold mr-2">{software.averageRating.toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">({software.ratingCount} calificaciones)</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4 text-muted-foreground">No hay calificaciones disponibles</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
