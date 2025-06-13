const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Debes crear este archivo

// Inicializar la aplicación de Firebase Admin
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

console.log("Firebase Admin SDK inicializado correctamente.");
console.log("Puedes usar este script para tareas administrativas como:");
console.log("- Importar/exportar datos");
console.log("- Configurar reglas de seguridad");
console.log("- Gestionar usuarios");

// Ejemplo: Listar todas las colecciones
async function listCollections() {
	try {
		const collections = await db.listCollections();
		console.log("\nColecciones existentes:");
		collections.forEach((collection) => {
			console.log(`- ${collection.id}`);
		});
	} catch (error) {
		console.error("Error al listar colecciones:", error);
	}
}

listCollections();
