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

// Importando funções específicas do Firebase Firestore e a instância do banco de dados
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

// Função assíncrona que manipula as solicitações HTTP recebidas pelo servidor
export default async function handler(req, res) {
  // Obtendo o método da solicitação HTTP
  const { method } = req;

  // Verificando o método da solicitação
  switch (method) {
    // Caso a solicitação seja do tipo GET
    case 'GET':
      // Verificando se foi fornecido um ID na query da solicitação
      if (req.query.id) {
        // Buscar uma ordem de serviço específica
        try {
          // Obtendo o documento da ordem de serviço específica do Firestore
          const docRef = doc(db, "ordens", req.query.id);
          const docSnap = await getDoc(docRef);

          // Verificando se o documento existe
          if (docSnap.exists()) {
            // Respondendo com os dados da ordem de serviço específica
            res.status(200).json({ id: docSnap.id, ...docSnap.data() });
          } else {
            // Respondendo com status 404 se a ordem de serviço não foi encontrada
            res.status(404).json({ error: "Ordem de serviço não encontrada" });
          }
        } catch (e) {
          // Em caso de erro, registrando o erro e respondendo com status 500
          console.error("Erro ao buscar a ordem de serviço:", e);
          res.status(500).json({ error: "Erro ao buscar a ordem de serviço" });
        }
      } else {
        // Buscar todas as ordens de serviço
        try {
          // Obtendo todos os documentos da coleção "ordens" do Firestore
          const querySnapshot = await getDocs(collection(db, "ordens"));
          // Mapeando os documentos para um formato específico
          const ordens = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // Respondendo com os dados das ordens de serviço
          res.status(200).json(ordens);
        } catch (e) {
          // Em caso de erro, registrando o erro e respondendo com status 500
          console.error("Erro ao buscar ordens de serviço:", e);
          res.status(500).json({ error: "Erro ao buscar ordens de serviço" });
        }
      }
      break;

    // Caso a solicitação seja do tipo POST
    case 'POST':
      // Extraindo os dados do corpo da solicitação
      const { clienteId, data, descricao, custoEstimado, observacoes, status } = req.body;
      try {
        // Adicionando um novo documento à coleção "ordens" no Firestore
        const docRef = await addDoc(collection(db, "ordens"), {
          clienteId,
          data,
          descricao,
          custoEstimado,
          observacoes,
          status: status || "Pendente", // Status padrão: Pendente
          custoFinal: null // Custo final inicialmente nulo
        });
        // Respondendo com o ID do documento recém-criado
        res.status(200).json({ id: docRef.id });
      } catch (e) {
        // Em caso de erro, registrando o erro e respondendo com status 500
        console.error("Erro ao adicionar ordem de serviço:", e);
        res.status(500).json({ error: "Erro ao adicionar ordem de serviço" });
      }
      break;

    // Caso a solicitação seja do tipo PUT
    case 'PUT':
      // Extraindo os dados do corpo da solicitação
      const { id, clienteId: clienteIdAtualizado, data: dataAtualizada, descricao: descricaoAtualizada, custoEstimado: custoEstimadoAtualizado, custoFinal: custoFinalAtualizado, observacoes: observacoesAtualizadas, status: statusAtualizado } = req.body;
      try {
        // Atualizando um documento na coleção "ordens" no Firestore
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
        // Respondendo com uma mensagem de sucesso
        res.status(200).json({ message: "Ordem de serviço atualizada com sucesso" });
      } catch (e) {
        // Em caso de erro, registrando o erro e respondendo com status 500
        console.error("Erro ao atualizar ordem de serviço:", e);
        res.status(500).json({ error: "Erro ao atualizar ordem de serviço" });
      }
      break;

    // Caso a solicitação seja do tipo DELETE
    case 'DELETE':
      // Extraindo o ID do corpo da solicitação
      const { id: idExcluir } = req.body;
      try {
        // Excluindo um documento na coleção "ordens" no Firestore
        const docRef = doc(db, "ordens", idExcluir);
        await deleteDoc(docRef);
        // Respondendo com uma mensagem de sucesso
        res.status(200).json({ message: "Ordem de serviço excluída com sucesso" });
      } catch (e) {
        // Em caso de erro, registrando o erro e respondendo com status 500
        console.error("Erro ao excluir ordem de serviço:", e);
        res.status(500).json({ error: "Erro ao excluir ordem de serviço" });
      }
      break;

    // Caso o método da solicitação não seja reconhecido
    default:
      // Respondendo com status 405 e uma mensagem de erro
      res.status(405).json({ error: "Método não permitido" });
      break;
  }
}
