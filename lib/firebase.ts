import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCpZ9YvbNfk-4ZPTPV5HR9ybaeSp-t85Q0",
	authDomain: "tpintegradorsi.firebaseapp.com",
	projectId: "tpintegradorsi",
	storageBucket: "tpintegradorsi.firebasestorage.app",
	messagingSenderId: "349192374446",
	appId: "1:349192374446:web:6da974562b4549be3e053f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
