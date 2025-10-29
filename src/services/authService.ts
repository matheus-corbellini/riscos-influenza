import { auth, db } from "../lib/firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type Unsubscribe,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type {
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/user";

export const authService = {
  async logOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error as string);
    }
  },

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // Garantir que a persistência de sessão está configurada
      await setPersistence(auth, browserSessionPersistence);
      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const firebaseUser = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      if (!userDoc.exists()) {
        throw new Error("Usuário não encontrado");
      }

      const userData = userDoc.data() as User;
      const updateUserData = {
        ...userData,
        lastLogin: new Date(),
      };

      await setDoc(doc(db, "users", firebaseUser.uid), updateUserData);
      return updateUserData;
    } catch (error) {
      throw new Error(error as string);
    }
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      if (!credentials.email || !credentials.password || !credentials.name) {
        throw new Error("Todos os campos são obrigatórios");
      }

      if (credentials.password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres");
      }

      // Garantir que a persistência de sessão está configurada
      await setPersistence(auth, browserSessionPersistence);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const firebaseUser = userCredential.user;

      const userData: User = {
        uid: firebaseUser.uid,
        email: credentials.email,
        name: credentials.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await setDoc(doc(db, "users", firebaseUser.uid), userData);
      return userData;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  observeAuthState(callback: (user: User | null) => void): Unsubscribe {
    try {
      return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Usuário está logado, busca dados completos no Firestore
          try {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data() as User;
              callback(userData);
            } else {
              callback(null);
            }
          } catch (error) {
            callback(null);
          }
        } else {
          // Usuário não está logado
          callback(null);
        }
      });
    } catch (error) {
      throw new Error("Erro ao observar estado de autenticação: " + error);
    }
  },
};
