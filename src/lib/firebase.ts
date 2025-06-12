import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAijG-Cn0HpoG_RqMl5QPlKL-nZotuVMFs",
  authDomain: "network-app-251cb.firebaseapp.com",
  databaseURL: "https://network-app-251cb-default-rtdb.firebaseio.com",
  projectId: "network-app-251cb",
  storageBucket: "network-app-251cb.firebasestorage.app",
  messagingSenderId: "671505183830",
  appId: "1:671505183830:web:d19d2a1c49d679a0ca37f7",
  measurementId: "G-ESLWFXLXXE"
};

// Инициализируем Firebase только если он еще не инициализирован
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

export { database }; 