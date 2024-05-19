/**
 * Nome do arquivo: ordens-servicos.js
 * Data de criação: 02/05/2024
 * Autor: Graziele Oliveira
 * Matrícula: 01632441
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por incluir os principais métodos de ordens do serviço,
 * como o GET, POST, PUT  e DELETE.
 *
 * Este script é parte o curso de ADS.
 */

import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.id) {
        // Buscar uma ordem de serviço específica
        try {
          const docRef = doc(db, "ordens", req.query.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            res.status(200).json({ id: docSnap.id, ...docSnap.data() });
          } else {
            res.status(404).json({ error: "Ordem de serviço não encontrada" });
          }
        } catch (e) {
          console.error("Erro ao buscar a ordem de serviço:", e);
          res.status(500).json({ error: "Erro ao buscar a ordem de serviço" });
        }
      } else {
        // Buscar todas as ordens de serviço
        try {
          const querySnapshot = await getDocs(collection(db, "ordens"));
          const ordens = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          res.status(200).json(ordens);
        } catch (e) {
          console.error("Erro ao buscar ordens de serviço:", e);
          res.status(500).json({ error: "Erro ao buscar ordens de serviço" });
        }
      }
      break;

    case 'POST':
      const { clienteId, data, descricao, custoEstimado, observacoes, status } = req.body;
      try {
        const docRef = await addDoc(collection(db, "ordens"), {
          clienteId,
          data,
          descricao,
          custoEstimado,
          observacoes,
          status: status || "Pendente", // Status padrão: Pendente
          custoFinal: null // Custo final inicialmente nulo
        });
        res.status(200).json({ id: docRef.id });
      } catch (e) {
        console.error("Erro ao adicionar ordem de serviço:", e);
        res.status(500).json({ error: "Erro ao adicionar ordem de serviço" });
      }
      break;

    case 'PUT':
      const { id, clienteId: clienteIdAtualizado, data: dataAtualizada, descricao: descricaoAtualizada, custoEstimado: custoEstimadoAtualizado, custoFinal: custoFinalAtualizado, observacoes: observacoesAtualizadas, status: statusAtualizado } = req.body;
      try {
        const docRef = doc(db, "ordens", id);
        await updateDoc(docRef, {
          clienteId: clienteIdAtualizado,
          data: dataAtualizada,
          descricao: descricaoAtualizada,
          custoEstimado: custoEstimadoAtualizado,
          custoFinal: custoFinalAtualizado,
          observacoes: observacoesAtualizadas,
          status: statusAtualizado
        });
        res.status(200).json({ message: "Ordem de serviço atualizada com sucesso" });
      } catch (e) {
        console.error("Erro ao atualizar ordem de serviço:", e);
        res.status(500).json({ error: "Erro ao atualizar ordem de serviço" });
      }
      break;

    case 'DELETE':
      const { id: idExcluir } = req.body;
      try {
        const docRef = doc(db, "ordens", idExcluir);
        await deleteDoc(docRef);
        res.status(200).json({ message: "Ordem de serviço excluída com sucesso" });
      } catch (e) {
        console.error("Erro ao excluir ordem de serviço:", e);
        res.status(500).json({ error: "Erro ao excluir ordem de serviço" });
      }
      break;

    default:
      res.status(405).json({ error: "Método não permitido" });
      break;
  }
}
