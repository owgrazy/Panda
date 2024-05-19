/**
 * Nome do arquivo: index.js
 * Data de criação: 18/05/2024
 * Autor: Graziele Oliveira
 * Matrícula: 01632441
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por ser a tela inicial do meu projeto, a "home".
 *
 * Este script é parte o curso de ADS.
 */
import styles from './home.module.css';
import { Inter } from "next/font/google";
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <>
      <h1>Sistema de Serviços</h1>
      <div> 
        <button className={styles.button} onClick={() => router.push('/ordem-de-servico')}>Criar Ordem de Serviço</button>
        <button className={styles.button} onClick={() => router.push('/cadastro')}>Cadastrar Cliente</button>
      </div>
    </>
  );
}
