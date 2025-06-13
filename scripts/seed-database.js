const firebaseConfig = {
	// Aquí irían las configuraciones de Firebase
	// Por ahora usamos datos de ejemplo
};

// Datos de ejemplo para el software de IA
const softwareData = [
	{
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
	},
	{
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
		categoria: "NLP",
	},
	{
		nombre: "Keras",
		objetivo: "API de alto nivel para redes neuronales",
		enlace: "https://keras.io",
		licencia: "MIT",
		anoLanzamiento: 2015,
		autor: "François Chollet",
		descripcionCorta: "API de deep learning de alto nivel",
		descripcion:
			"Keras es una API de redes neuronales de alto nivel, escrita en Python y capaz de ejecutarse sobre TensorFlow, CNTK o Theano. Fue desarrollada con un enfoque en permitir la experimentación rápida.",
		categoria: "Machine Learning",
	},
];

console.log("Datos de ejemplo para la base de datos:");
console.log("=====================================");

softwareData.forEach((software, index) => {
	console.log(`${index + 1}. ${software.nombre}`);
	console.log(`   Categoría: ${software.categoria}`);
	console.log(`   Año: ${software.anoLanzamiento}`);
	console.log(`   Licencia: ${software.licencia}`);
	console.log(`   Descripción: ${software.descripcionCorta}`);
	console.log("   ---");
});

console.log("\nPara usar estos datos:");
console.log("1. Configura Firebase en tu proyecto");
console.log('2. Crea una colección llamada "software"');
console.log("3. Agrega estos documentos a la colección");
console.log("4. Configura las variables de entorno de Firebase");
