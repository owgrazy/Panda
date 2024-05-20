
// pages/_app.js
import '../styles/globals.css';  // Importa o CSS global
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
