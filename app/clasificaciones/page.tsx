import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const classifications = [
	{
		id: "sistemas-expertos",
		title: "Sistemas Expertos",
		description:
			"Los sistemas expertos son programas informáticos diseñados para resolver problemas complejos mediante el razonamiento basado en el conocimiento, imitando la capacidad de toma de decisiones de un experto humano.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Expert_system.svg/400px-Expert_system.svg.png",
		examples: [
			"MYCIN (diagnóstico médico)",
			"DENDRAL (análisis químico)",
			"PROSPECTOR (exploración geológica)",
		],
		links: [
			{
				title: "Wikipedia: Sistema experto",
				url: "https://es.wikipedia.org/wiki/Sistema_experto",
			},
		],
	},
	{
		id: "redes-neuronales",
		title: "Redes Neuronales",
		description:
			"Las redes neuronales artificiales son modelos computacionales inspirados en el funcionamiento del cerebro humano, compuestos por nodos interconectados que procesan información y aprenden patrones a partir de datos.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Artificial_neural_network.svg/400px-Artificial_neural_network.svg.png",
		examples: [
			"Reconocimiento de imágenes",
			"Procesamiento de lenguaje natural",
			"Predicción de series temporales",
		],
		links: [
			{
				title: "AWS: Red neuronal",
				url: "https://aws.amazon.com/es/what-is/neural-network/",
			},
		],
	},
	{
		id: "algoritmos-geneticos",
		title: "Algoritmos Genéticos",
		description:
			"Los algoritmos genéticos son métodos adaptativos utilizados para resolver problemas de búsqueda y optimización, inspirados en los principios de la selección natural y la evolución biológica.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Genetic_Algorithm_flowchart.svg/400px-Genetic_Algorithm_flowchart.svg.png",
		examples: [
			"Optimización de rutas",
			"Diseño de antenas",
			"Ajuste de hiperparámetros en modelos de IA",
		],
		links: [
			{
				title: "Wikipedia: Algoritmo genético",
				url: "https://es.wikipedia.org/wiki/Algoritmo_gen%C3%A9tico",
			},
		],
	},
	{
		id: "agentes-inteligentes",
		title: "Agentes Inteligentes",
		description:
			"Los agentes inteligentes son entidades autónomas que perciben su entorno a través de sensores y actúan sobre él mediante actuadores, con el objetivo de maximizar una medida de rendimiento.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Agent_architecture_architecture.svg/400px-Agent_architecture_architecture.svg.png",
		examples: [
			"Asistentes virtuales (Siri, Alexa)",
			"Robots autónomos",
			"Agentes de negociación automática",
		],
		links: [
			{
				title: "Wikipedia: Agente inteligente",
				url: "https://es.wikipedia.org/wiki/Agente_inteligente_(inteligencia_artificial)",
			},
		],
	},
	{
		id: "aprendizaje-refuerzo",
		title: "Aprendizaje por Refuerzo",
		description:
			"El aprendizaje por refuerzo es un tipo de aprendizaje automático donde un agente aprende a comportarse en un entorno mediante la realización de acciones y la observación de los resultados (recompensas o penalizaciones).",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Reinforcement_learning_diagram.svg/400px-Reinforcement_learning_diagram.svg.png",
		examples: [
			"AlphaGo",
			"Control de tráfico",
			"Optimización de energía en redes eléctricas",
		],
		links: [
			{
				title: "Wikipedia: Aprendizaje por refuerzo",
				url: "https://es.wikipedia.org/wiki/Aprendizaje_por_refuerzo",
			},
		],
	},
	{
		id: "representacion-conocimiento",
		title: "Representación del Conocimiento",
		description:
			"La representación del conocimiento es una rama de la inteligencia artificial que se encarga de estructurar información del mundo real de forma que un sistema pueda razonar sobre ella.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Semantic_net_example_en.svg/400px-Semantic_net_example_en.svg.png",
		examples: ["Ontologías", "Redes semánticas", "Lógicas de predicados"],
		links: [
			{
				title: "Wikipedia: Representación del conocimiento",
				url: "https://es.wikipedia.org/wiki/Representaci%C3%B3n_del_conocimiento",
			},
		],
	},
	{
		id: "aprendizaje",
		title: "Aprendizaje",
		description:
			"El aprendizaje en IA se refiere a la capacidad de los sistemas para mejorar su rendimiento a partir de la experiencia o de los datos, sin ser explícitamente programados para ello.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Machine_Learning_Chart.svg/400px-Machine_Learning_Chart.svg.png",
		examples: [
			"Aprendizaje supervisado",
			"Aprendizaje no supervisado",
			"Aprendizaje por refuerzo",
		],
		links: [
			{
				title: "Wikipedia: Aprendizaje automático",
				url: "https://es.wikipedia.org/wiki/Aprendizaje_autom%C3%A1tico",
			},
		],
	},
	{
		id: "deep-learning",
		title: "Deep Learning",
		description:
			"El deep learning es una subdisciplina del aprendizaje automático que utiliza redes neuronales profundas para modelar y resolver problemas complejos con grandes volúmenes de datos.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Deep_learning.svg/400px-Deep_learning.svg.png",
		examples: [
			"Reconocimiento facial",
			"Traducción automática",
			"Conducción autónoma",
		],
		links: [
			{
				title: "Wikipedia: Aprendizaje profundo",
				url: "https://es.wikipedia.org/wiki/Aprendizaje_profundo",
			},
		],
	},
	{
		id: "clasificacion-ia",
		title: "Clasificación de la IA",
		description:
			"La inteligencia artificial puede clasificarse en diferentes tipos según su capacidad y funcionalidad, como IA débil, general o fuerte, así como en categorías reactivas, con memoria limitada, conscientes de sí mismas, entre otras.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/AI_Taxonomy.svg/400px-AI_Taxonomy.svg.png",
		examples: [
			"IA débil (Siri)",
			"IA general (teórica)",
			"IA fuerte (hipotética)",
		],
		links: [
			{
				title: "Wikipedia: Inteligencia artificial",
				url: "https://es.wikipedia.org/wiki/Inteligencia_artificial",
			},
		],
	},
	{
		id: "modelos-ia",
		title: "Modelos de IA",
		description:
			"Los modelos de IA son estructuras matemáticas y computacionales utilizadas para realizar tareas como clasificación, predicción, agrupamiento y toma de decisiones.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Decision_tree_example.svg/400px-Decision_tree_example.svg.png",
		examples: [
			"Árboles de decisión",
			"Máquinas de vectores de soporte (SVM)",
			"Redes bayesianas",
		],
		links: [
			{
				title: "Wikipedia: Inteligencia Artificial – Un Enfoque Moderno",
				url: "https://es.wikipedia.org/wiki/Inteligencia_Artificial:_Un_Enfoque_Moderno",
			},
		],
	},
	{
		id: "busqueda-resolucion-problemas",
		title: "Búsqueda y Resolución de Problemas",
		description:
			"La búsqueda y resolución de problemas en IA se refiere a los métodos para encontrar soluciones óptimas o aceptables en espacios de estados mediante algoritmos como A*, backtracking y heurísticas.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/A_star_search_example.svg/400px-A_star_search_example.svg.png",
		examples: [
			"Ajedrez computacional",
			"Planificación de rutas",
			"Resolución de puzzles",
		],
		links: [
			{
				title: "Wikipedia: Algoritmo A*",
				url: "https://es.wikipedia.org/wiki/A*",
			},
		],
	},
	{
		id: "reconocimiento-patrones",
		title: "Reconocimiento de Patrones",
		description:
			"El reconocimiento de patrones es el proceso mediante el cual un sistema identifica regularidades o estructuras en datos complejos como imágenes, sonidos o textos.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Pattern_recognition.svg/400px-Pattern_recognition.svg.png",
		examples: [
			"Reconocimiento de escritura",
			"Análisis de voz",
			"Detección de fraudes",
		],
		links: [
			{
				title: "Wikipedia: Reconocimiento de patrones",
				url: "https://es.wikipedia.org/wiki/Reconocimiento_de_patrones",
			},
		],
	},
	{
		id: "procesamiento-lenguaje-natural",
		title: "Procesamiento de Lenguaje Natural (PLN)",
		description:
			"El PLN es una rama de la IA que se encarga de la interacción entre computadoras y el lenguaje humano, permitiendo que las máquinas comprendan, interpreten y generen texto o voz.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/NLP_flowchart.svg/400px-NLP_flowchart.svg.png",
		examples: [
			"Chatbots",
			"Análisis de sentimientos",
			"Sistemas de traducción automática",
		],
		links: [
			{
				title: "Wikipedia: Procesamiento de lenguaje natural",
				url: "https://es.wikipedia.org/wiki/Procesamiento_de_lenguaje_natural",
			},
		],
	},
	{
		id: "percepcion-computacional",
		title: "Percepción en Ambientes Computacionales",
		description:
			"La percepción computacional permite a los sistemas inteligentes interpretar datos sensoriales del entorno como imágenes, sonidos o señales, para tomar decisiones informadas.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Computer_vision.svg/400px-Computer_vision.svg.png",
		examples: [
			"Visión por computadora",
			"Reconocimiento de audio",
			"Sensores robóticos",
		],
		links: [
			{
				title: "Wikipedia: Visión por computadora",
				url: "https://es.wikipedia.org/wiki/Visi%C3%B3n_por_computadora",
			},
		],
	},
];

export default function ClasificacionesPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">
				Clasificaciones de Sistemas Inteligentes
			</h1>
			<p className="text-lg text-muted-foreground mb-8">
				Explora las diferentes categorías de sistemas inteligentes, sus
				características y ejemplos representativos.
			</p>

			<div className="grid gap-8">
				{classifications.map((classification) => (
					<Card
						key={classification.id}
						id={classification.id}>
						<CardHeader>
							<CardTitle>{classification.title}</CardTitle>
							<CardDescription>{classification.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<h3 className="text-lg font-medium mb-2">Ejemplos</h3>
									<ul className="list-disc pl-5 mb-4">
										{classification.examples.map((example, index) => (
											<li key={index}>{example}</li>
										))}
									</ul>

									<h3 className="text-lg font-medium mb-2">
										Enlaces de interés
									</h3>
									<ul className="space-y-2">
										{classification.links.map((link, index) => (
											<li key={index}>
												<Link
													href={link.url}
													className="flex items-center gap-2 text-primary hover:underline"
													target="_blank"
													rel="noopener noreferrer">
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
	);
}
