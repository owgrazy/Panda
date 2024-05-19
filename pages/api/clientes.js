/**
 * Nome do arquivo: clientes.js
 * Data de criação: 02/05/2024
 * Autor: Graziele Oliveira
 * Matrícula: 01632441
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por incluir os principais métodos do cliente,
 * como o GET, POST, PUT  e DELETE.
 *
 * Este script é parte o curso de ADS.
 */

// pages/api/clientes.js
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const querySnapshot = await getDocs(collection(db, "ordens"));
        const ordens = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        res.status(200).json(ordens);
      } catch (e) {
        console.error("Erro ao buscar o serviço:", e);
        res.status(500).json({ error: "Erro ao buscar clientes" });
      }
      break;

    case 'POST':
      const { nome, endereco, telefone, email } = req.body;
      try {
        const docRef = await addDoc(collection(db, "clientes"), {
          nome,
          endereco,
          telefone,
          email
        });
        res.status(200).json({ id: docRef.id });
      } catch (e) {
        console.error("Erro ao adicionar cliente:", e);
        res.status(500).json({ error: "Erro ao adicionar cliente" });
      }
      break;

    case 'PUT':
      const { id, nome: nomeAtualizado, endereco: enderecoAtualizado, telefone: telefoneAtualizado, email: emailAtualizado } = req.body;
      try {
        const docRef = doc(db, "clientes", id);
        await updateDoc(docRef, {
          nome: nomeAtualizado,
          endereco: enderecoAtualizado,
          telefone: telefoneAtualizado,
          email: emailAtualizado
        });
        res.status(200).json({ message: "Cliente atualizado com sucesso" });
      } catch (e) {
        console.error("Erro ao atualizar cliente:", e);
        res.status(500).json({ error: "Erro ao atualizar cliente" });
      }
      break;

    case 'DELETE':
      const { id: idExcluir } = req.body;
      try {
        const docRef = doc(db, "clientes", idExcluir);
        await deleteDoc(docRef);
        res.status(200).json({ message: "Cliente excluído com sucesso" });
      } catch (e) {
        console.error("Erro ao excluir cliente:", e);
        res.status(500).json({ error: "Erro ao excluir cliente" });
      }
      break;

    default:
      res.status(405).json({ error: "Método não permitido" });
      break;
  }
}
