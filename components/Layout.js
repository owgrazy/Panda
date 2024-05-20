/**
 * Nome do arquivo: Layout.js
 * Data de criação: 19/05/2024
 * Autor: Graziele Oliveira
 * Matrícula: 01632441
 *
 * Descrição:
 * Este arquivo Java Script é responsável por trazer o "esqueleto" do meu "menu hamburguer", onde juntamente ao arquivo CSS, nos trás um menu hamburguer para faciliar o acesso as páginas/rotas do sistema.
 *
 * Este script é parte o curso de ADS.
 */
import { useState } from 'react';
import Link from 'next/link';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className={`${styles.sidebar} ${menuOpen ? styles.open : ''}`}>
        <div className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <div></div>
        </div>
        <nav className={styles.nav}>
          <Link href="/" legacyBehavior>
            <a onClick={toggleMenu}>Home</a>
          </Link>
          <Link href="/ordem-de-servico" legacyBehavior>
            <a onClick={toggleMenu}>Ordens de Serviço</a>
          </Link>
          <Link href="/cadastro" legacyBehavior>
            <a onClick={toggleMenu}>Clientes</a>
          </Link>
        </nav>
      </div>
      <main className={`${styles.mainContent} ${menuOpen ? styles.sidebarOpen : ''}`}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
