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

// Importando a fonte Inter do Google Fonts
import { Inter } from "next/font/google";
// Importando o hook useRouter do Next.js para roteamento
import { useRouter } from 'next/router';

// Configuração da fonte Inter
const inter = Inter({ subsets: ["latin"] });

// Componente Home que será renderizado como a página inicial
export default function Home() {
  // Obtendo o objeto de roteamento
  const router = useRouter();

  // Retornando o JSX que representa a página inicial
  return (
    <>
      <div>
        {/* Título principal do aplicativo */}
        <h1>Panda ツ</h1>
      </div>
      {/* Título secundário do aplicativo */}
      <h1>Sistema Web</h1>
    </>
  );
}
