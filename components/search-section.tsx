"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [advancedFilters, setAdvancedFilters] = useState({
    category: "all",
    year: "all",
    license: "all",
  })
  const [isListening, setIsListening] = useState(false)
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const params = new URLSearchParams()
      params.append("q", searchQuery)

      if (advancedFilters.category !== "all") {
        params.append("category", advancedFilters.category)
      }

      if (advancedFilters.year !== "all") {
        params.append("year", advancedFilters.year)
      }

      if (advancedFilters.license !== "all") {
        params.append("license", advancedFilters.license)
      }

      router.push(`/busqueda?${params.toString()}`)
    }
  }

  const startVoiceRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Tu navegador no soporta el reconocimiento de voz. Intenta con Chrome.")
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = "es-ES"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setSearchQuery(transcript)
    }

    recognition.onerror = (event) => {
      console.error("Error en reconocimiento de voz:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  return (
    <section className="py-8">
      <Card>
        <CardHeader>
          <CardTitle>Buscar Sistemas Inteligentes</CardTitle>
          <CardDescription>
            Encuentra software de inteligencia artificial por nombre, objetivo, licencia y más
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="simple" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="simple">Búsqueda Simple</TabsTrigger>
              <TabsTrigger value="advanced">Búsqueda Avanzada</TabsTrigger>
            </TabsList>
            <TabsContent value="simple">
              <form onSubmit={handleSearch} className="flex w-full max-w-lg items-center space-x-2 mx-auto mt-4">
                <div className="relative flex-1">
                  <Input
                    type="search"
                    placeholder="Buscar software, herramientas, conceptos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={`absolute right-0 top-0 h-full ${isListening ? "text-red-500" : ""}`}
                    onClick={startVoiceRecognition}
                  >
                    <Mic className="h-4 w-4" />
                    <span className="sr-only">Buscar por voz</span>
                  </Button>
                </div>
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" /> Buscar
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="advanced">
              <form onSubmit={handleSearch} className="space-y-4 mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="search-query">Palabras clave</Label>
                    <Input
                      id="search-query"
                      type="search"
                      placeholder="Buscar por nombre, descripción..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                      value={advancedFilters.category}
                      onValueChange={(value) => setAdvancedFilters({ ...advancedFilters, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        <SelectItem value="machine-learning">Machine Learning</SelectItem>
                        <SelectItem value="nlp">Procesamiento de Lenguaje Natural</SelectItem>
                        <SelectItem value="computer-vision">Visión por Computadora</SelectItem>
                        <SelectItem value="expert-systems">Sistemas Expertos</SelectItem>
                        <SelectItem value="robotics">Robótica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Año de lanzamiento</Label>
                    <Select
                      value={advancedFilters.year}
                      onValueChange={(value) => setAdvancedFilters({ ...advancedFilters, year: value })}
                    >
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Seleccionar año" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los años</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="older">Anterior a 2020</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="license">Licencia</Label>
                    <Select
                      value={advancedFilters.license}
                      onValueChange={(value) => setAdvancedFilters({ ...advancedFilters, license: value })}
                    >
                      <SelectTrigger id="license">
                        <SelectValue placeholder="Seleccionar licencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las licencias</SelectItem>
                        <SelectItem value="open-source">Open Source</SelectItem>
                        <SelectItem value="commercial">Comercial</SelectItem>
                        <SelectItem value="free">Gratuito</SelectItem>
                        <SelectItem value="academic">Académico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" /> Buscar
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}
