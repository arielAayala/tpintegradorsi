const { initializeApp } = require("firebase/app");
const {
	getFirestore,
	collection,
	doc,
	setDoc,
	addDoc,
	serverTimestamp,
	Timestamp,
} = require("firebase/firestore");

// Configuración de Firebase (reemplazar con tus propias credenciales)
const firebaseConfig = {
	apiKey: "AIzaSyCpZ9YvbNfk-4ZPTPV5HR9ybaeSp-t85Q0",
	authDomain: "tpintegradorsi.firebaseapp.com",
	projectId: "tpintegradorsi",
	storageBucket: "tpintegradorsi.firebasestorage.app",
	messagingSenderId: "349192374446",
	appId: "1:349192374446:web:6da974562b4549be3e053f",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Datos de ejemplo para el software de IA
const softwareData = [
	{
		id: "tensorflow",
		nombre: "TensorFlow",
		objetivo: "Biblioteca de código abierto para aprendizaje automático",
		enlace: "https://tensorflow.org",
		licencia: "Apache 2.0",
		anoLanzamiento: 2015,
		autor: "Google Brain Team",
		descripcionCorta: "Plataforma integral para machine learning",
		descripcion:
			"TensorFlow es una plataforma de código abierto integral para el aprendizaje automático. Cuenta con un ecosistema completo y flexible de herramientas, bibliotecas y recursos de la comunidad que permite a los investigadores impulsar el estado del arte en ML y a los desarrolladores crear e implementar fácilmente aplicaciones con tecnología ML.",
		video: "https://www.youtube.com/embed/yjprpOoH5c8",
		categoria: "Machine Learning",
		destacado: true,
	},
	{
		id: "pytorch",
		nombre: "PyTorch",
		objetivo: "Framework de deep learning para investigación y producción",
		enlace: "https://pytorch.org",
		licencia: "BSD",
		anoLanzamiento: 2016,
		autor: "Facebook AI Research",
		descripcionCorta: "Framework de deep learning dinámico",
		descripcion:
			"PyTorch es un framework de aprendizaje automático optimizado que acelera el camino desde la investigación hasta la implementación en producción. Ofrece gráficos computacionales dinámicos y una API intuitiva.",
		video: "https://www.youtube.com/embed/u7x8RXwLKcA",
		categoria: "Machine Learning",
		destacado: true,
	},
	{
		id: "opencv",
		nombre: "OpenCV",
		objetivo: "Biblioteca de visión por computadora",
		enlace: "https://opencv.org",
		licencia: "Apache 2.0",
		anoLanzamiento: 2000,
		autor: "Intel Corporation",
		descripcionCorta: "Biblioteca de visión por computadora y machine learning",
		descripcion:
			"OpenCV es una biblioteca de código abierto que incluye varios cientos de algoritmos de visión por computadora. Soporta múltiples lenguajes de programación y es ampliamente utilizada en aplicaciones de tiempo real.",
		video: "https://www.youtube.com/embed/oXlwWbU8l2o",
		categoria: "Computer Vision",
		destacado: true,
	},
	{
		id: "scikit-learn",
		nombre: "Scikit-learn",
		objetivo: "Herramientas de machine learning para Python",
		enlace: "https://scikit-learn.org",
		licencia: "BSD",
		anoLanzamiento: 2007,
		autor: "David Cournapeau",
		descripcionCorta: "Biblioteca de machine learning simple y eficiente",
		descripcion:
			"Scikit-learn es una biblioteca de aprendizaje automático simple y eficiente para Python. Proporciona herramientas simples y eficientes para minería de datos y análisis de datos.",
		categoria: "Machine Learning",
		destacado: false,
	},
	{
		id: "nltk",
		nombre: "NLTK",
		objetivo: "Procesamiento de lenguaje natural",
		enlace: "https://nltk.org",
		licencia: "Apache 2.0",
		anoLanzamiento: 2001,
		autor: "Steven Bird",
		descripcionCorta:
			"Plataforma para construir programas de Python para trabajar con datos de lenguaje humano",
		descripcion:
			"NLTK es una plataforma líder para construir programas de Python para trabajar con datos de lenguaje humano. Proporciona interfaces fáciles de usar para más de 50 recursos de corpus y léxico.",
		video: "https://www.youtube.com/embed/FLZvOKSCkxY",
		categoria: "NLP",
		destacado: false,
	},
	{
		id: "keras",
		nombre: "Keras",
		objetivo: "API de alto nivel para redes neuronales",
		enlace: "https://keras.io",
		licencia: "MIT",
		anoLanzamiento: 2015,
		autor: "François Chollet",
		descripcionCorta: "API de deep learning de alto nivel",
		descripcion:
			"Keras es una API de redes neuronales de alto nivel, escrita en Python y capaz de ejecutarse sobre TensorFlow, CNTK o Theano. Fue desarrollada con un enfoque en permitir la experimentación rápida.",
		video: "https://www.youtube.com/embed/RznKVRTFkBY",
		categoria: "Machine Learning",
		destacado: false,
	},
	{
		id: "spacy",
		nombre: "spaCy",
		objetivo: "Biblioteca de procesamiento de lenguaje natural",
		enlace: "https://spacy.io",
		licencia: "MIT",
		anoLanzamiento: 2015,
		autor: "Explosion AI",
		descripcionCorta: "Biblioteca de NLP industrial-strength",
		descripcion:
			"spaCy es una biblioteca para procesamiento avanzado de lenguaje natural en Python y Cython. Está diseñada específicamente para uso en producción y ayuda a construir aplicaciones que procesan y comprenden grandes volúmenes de texto.",
		video: "https://www.youtube.com/embed/WnGPv6HnBok",
		categoria: "NLP",
		destacado: false,
	},
	{
		id: "huggingface-transformers",
		nombre: "Hugging Face Transformers",
		objetivo: "Biblioteca de modelos pre-entrenados para NLP",
		enlace: "https://huggingface.co/transformers",
		licencia: "Apache 2.0",
		anoLanzamiento: 2018,
		autor: "Hugging Face",
		descripcionCorta:
			"State-of-the-art Natural Language Processing para PyTorch y TensorFlow",
		descripcion:
			"Transformers proporciona miles de modelos pre-entrenados para realizar tareas en diferentes modalidades como texto, visión y audio. Estos modelos pueden ser compartidos por la comunidad en el Model Hub de Hugging Face.",
		video: "https://www.youtube.com/embed/QEaBAZQCtwE",
		categoria: "NLP",
		destacado: true,
	},
	{
		id: "yolo",
		nombre: "YOLO (You Only Look Once)",
		objetivo: "Sistema de detección de objetos en tiempo real",
		enlace: "https://pjreddie.com/darknet/yolo/",
		licencia: "MIT",
		anoLanzamiento: 2016,
		autor: "Joseph Redmon",
		descripcionCorta: "Sistema de detección de objetos en tiempo real",
		descripcion:
			"YOLO es un sistema de detección de objetos en tiempo real. En una GPU Titan X procesa imágenes a 30 FPS y tiene un mAP del 57.9% en COCO test-dev.",
		video: "https://www.youtube.com/embed/MPU2HistivI",
		categoria: "Computer Vision",
		destacado: false,
	},
	{
		id: "openai-gym",
		nombre: "OpenAI Gym",
		objetivo: "Toolkit para desarrollar y comparar algoritmos de RL",
		enlace: "https://gym.openai.com",
		licencia: "MIT",
		anoLanzamiento: 2016,
		autor: "OpenAI",
		descripcionCorta:
			"Toolkit para desarrollar y comparar algoritmos de aprendizaje por refuerzo",
		descripcion:
			"Gym es un toolkit para desarrollar y comparar algoritmos de aprendizaje por refuerzo. Proporciona una amplia variedad de entornos de simulación y una interfaz común para interactuar con ellos.",
		video: "https://www.youtube.com/embed/3MgXOj9NXbk",
		categoria: "Reinforcement Learning",
		destacado: false,
	},
];

// Datos de ejemplo para calificaciones
const ratingsData = [
	{
		softwareId: "tensorflow",
		value: 5,
		userName: "María López",
		createdAt: serverTimestamp(), // Usar serverTimestamp en lugar de Date
	},
	{
		softwareId: "tensorflow",
		value: 4,
		userName: "Juan Pérez",
		createdAt: serverTimestamp(),
	},
	{
		softwareId: "pytorch",
		value: 5,
		userName: "Ana García",
		createdAt: serverTimestamp(),
	},
	{
		softwareId: "opencv",
		value: 4,
		userName: "Carlos Rodríguez",
		createdAt: serverTimestamp(),
	},
	{
		softwareId: "huggingface-transformers",
		value: 5,
		userName: "Laura Martínez",
		createdAt: serverTimestamp(),
	},
];

// Datos de ejemplo para comentarios
const commentsData = [
	{
		softwareId: "tensorflow",
		author: "María López",
		content:
			"TensorFlow es una herramienta excelente para proyectos de machine learning. La documentación es muy completa.",
		createdAt: serverTimestamp(),
	},
	{
		softwareId: "tensorflow",
		author: "Juan Pérez",
		content:
			"He utilizado TensorFlow en varios proyectos y siempre me ha dado buenos resultados. Recomendado para principiantes y expertos.",
		createdAt: serverTimestamp(),
	},
	{
		softwareId: "pytorch",
		author: "Ana García",
		content:
			"PyTorch tiene una curva de aprendizaje más suave que TensorFlow. Muy recomendado para investigación.",
		createdAt: serverTimestamp(),
	},
	{
		softwareId: "opencv",
		author: "Carlos Rodríguez",
		content:
			"OpenCV es fundamental para cualquier proyecto de visión por computadora. Tiene muchas funciones útiles.",
		createdAt: serverTimestamp(),
	},
];

// Datos de ejemplo para el foro
const foroData = [
	{
		title: "¿Cuál es el mejor framework para empezar con machine learning?",
		content:
			"Soy nuevo en el campo de la inteligencia artificial y me gustaría saber cuál es el mejor framework para comenzar a aprender machine learning. ¿TensorFlow, PyTorch, scikit-learn u otro?",
		author: "NoviceDev",
		createdAt: serverTimestamp(),
		replies: 2,
		views: 15,
	},
	{
		title: "Comparativa de rendimiento entre TensorFlow y PyTorch",
		content:
			"Estoy trabajando en un proyecto de deep learning y necesito decidir entre TensorFlow y PyTorch. ¿Alguien ha hecho benchmarks recientes comparando el rendimiento de ambos frameworks?",
		author: "AIResearcher",
		createdAt: serverTimestamp(),
		replies: 3,
		views: 24,
	},
	{
		title: "Recursos para aprender procesamiento de lenguaje natural",
		content:
			"Estoy interesado en aprender más sobre NLP. ¿Pueden recomendar libros, cursos o tutoriales para comenzar? Ya tengo conocimientos básicos de Python y machine learning.",
		author: "LanguageLover",
		createdAt: serverTimestamp(),
		replies: 5,
		views: 42,
	},
];

// Función para poblar la base de datos
async function seedDatabase() {
	try {
		console.log("Iniciando la población de la base de datos...");

		// Poblar colección de software
		console.log("Poblando colección de software...");
		for (const software of softwareData) {
			const { id, ...softwareWithoutId } = software;
			await setDoc(doc(db, "software", id), softwareWithoutId);
			console.log(`✓ Software añadido: ${software.nombre}`);
		}

		// Poblar colección de calificaciones
		console.log("\nPoblando colección de calificaciones...");
		for (const rating of ratingsData) {
			await addDoc(collection(db, "ratings"), rating);
			console.log(`✓ Calificación añadida para: ${rating.softwareId}`);
		}

		// Poblar colección de comentarios
		console.log("\nPoblando colección de comentarios...");
		for (const comment of commentsData) {
			await addDoc(collection(db, "comments"), comment);
			console.log(`✓ Comentario añadido para: ${comment.softwareId}`);
		}

		// Poblar colección de foro
		console.log("\nPoblando colección de foro...");
		for (const topic of foroData) {
			await addDoc(collection(db, "foro"), topic);
			console.log(`✓ Tema añadido: ${topic.title}`);
		}

		console.log("\n¡Base de datos poblada exitosamente!");
		console.log("\nResumen:");
		console.log(`- ${softwareData.length} softwares añadidos`);
		console.log(`- ${ratingsData.length} calificaciones añadidas`);
		console.log(`- ${commentsData.length} comentarios añadidos`);
		console.log(`- ${foroData.length} temas de foro añadidos`);
	} catch (error) {
		console.error("Error al poblar la base de datos:", error);
	}
}

// Ejecutar la función
seedDatabase();
