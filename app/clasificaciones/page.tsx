import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

const classifications = [
  {
    id: "sistemas-expertos",
    title: "Sistemas Expertos",
    description:
      "Los sistemas expertos son programas informáticos diseñados para resolver problemas complejos mediante el razonamiento basado en el conocimiento, imitando la capacidad de toma de decisiones de un experto humano.",
    image: "/placeholder.svg?height=200&width=400",
    examples: ["MYCIN (diagnóstico médico)", "DENDRAL (análisis químico)", "PROSPECTOR (geología)"],
    links: [
      {
        title: "Introducción a los Sistemas Expertos",
        url: "https://example.com/sistemas-expertos",
      },
    ],
  },
  {
    id: "redes-neuronales",
    title: "Redes Neuronales",
    description:
      "Las redes neuronales artificiales son modelos computacionales inspirados en el funcionamiento del cerebro humano, compuestos por nodos interconectados que procesan información y aprenden patrones a partir de datos.",
    image: "/placeholder.svg?height=200&width=400",
    examples: ["Reconocimiento de imágenes", "Procesamiento de lenguaje natural", "Predicción de series temporales"],
    links: [
      {
        title: "Fundamentos de Redes Neuronales",
        url: "https://example.com/redes-neuronales",
      },
    ],
  },
  {
    id: "algoritmos-geneticos",
    title: "Algoritmos Genéticos",
    description:
      "Los algoritmos genéticos son métodos adaptativos utilizados para resolver problemas de búsqueda y optimización, inspirados en los principios de la selección natural y la evolución biológica.",
    image: "/placeholder.svg?height=200&width=400",
    examples: ["Optimización de rutas", "Diseño de estructuras", "Programación automática"],
    links: [
      {
        title: "Introducción a los Algoritmos Genéticos",
        url: "https://example.com/algoritmos-geneticos",
      },
    ],
  },
  {
    id: "agentes-inteligentes",
    title: "Agentes Inteligentes",
    description:
      "Los agentes inteligentes son entidades autónomas que perciben su entorno a través de sensores y actúan sobre él mediante actuadores, con el objetivo de maximizar una medida de rendimiento.",
    image: "/placeholder.svg?height=200&width=400",
    examples: ["Asistentes virtuales", "Robots autónomos", "Agentes de recomendación"],
    links: [
      {
        title: "Fundamentos de Agentes Inteligentes",
        url: "https://example.com/agentes-inteligentes",
      },
    ],
  },
  {
    id: "aprendizaje-refuerzo",
    title: "Aprendizaje por Refuerzo",
    description:
      "El aprendizaje por refuerzo es un tipo de aprendizaje automático donde un agente aprende a comportarse en un entorno mediante la realización de acciones y la observación de los resultados (recompensas o penalizaciones).",
    image: "/placeholder.svg?height=200&width=400",
    examples: ["AlphaGo", "Sistemas de control autónomo", "Optimización de procesos industriales"],
    links: [
      {
        title: "Introducción al Aprendizaje por Refuerzo",
        url: "https://example.com/aprendizaje-refuerzo",
      },
    ],
  },
]

export default function ClasificacionesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Clasificaciones de Sistemas Inteligentes</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Explora las diferentes categorías de sistemas inteligentes, sus características y ejemplos representativos.
      </p>

      <div className="grid gap-8">
        {classifications.map((classification) => (
          <Card key={classification.id} id={classification.id}>
            <CardHeader>
              <CardTitle>{classification.title}</CardTitle>
              <CardDescription>{classification.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={classification.image || "/placeholder.svg"}
                    alt={classification.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Ejemplos</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {classification.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-medium mb-2">Enlaces de interés</h3>
                  <ul className="space-y-2">
                    {classification.links.map((link, index) => (
                      <li key={index}>
                        <Link
                          href={link.url}
                          className="flex items-center gap-2 text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.title} <ExternalLink size={14} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
