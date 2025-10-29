import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnC27JStpAMt1v_4t_xRZ_QppHNA3TiK8",
  authDomain: "searchplayer-28601.firebaseapp.com",
  projectId: "searchplayer-28601",
  storageBucket: "searchplayer-28601.firebasestorage.app",
  messagingSenderId: "1038349338996",
  appId: "1:1038349338996:web:98255f1dbb8d55dbf78421",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Configurar persistência de sessão - usuário precisa fazer login toda vez que abrir o navegador
setPersistence(auth, browserSessionPersistence).catch((error) => {
  console.error("Erro ao configurar persistência:", error);
});

export { app, auth, db };
export default firebaseConfig;
