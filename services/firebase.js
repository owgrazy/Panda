/**
 * Nome do arquivo: firebase.js
 * Data de criação: 10/05/2024
 * Autor: Graziele Oliveira
 * Matrícula: 01632441
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por realizar a conexão do meu projeto com o banco de dados.
 *
 * Este script é parte o curso de ADS.
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-8BKiw6itaOxxgj4tPhV0hcupGccoCQI",
  authDomain: "dback-cfab2.firebaseapp.com",
  databaseURL: "https://dback-cfab2-default-rtdb.firebaseio.com",
  projectId: "dback-cfab2",
  storageBucket: "dback-cfab2.appspot.com",
  messagingSenderId: "570321836504",
  appId: "1:570321836504:web:7d1c33c9469ecb298b7aad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };