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

// Importando funções específicas do Firebase Firestore e a instância do banco de dados
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

// Função assíncrona que manipula as solicitações HTTP recebidas pelo servidor
export default async function handler(req, res) {
  // Obtendo o método da solicitação HTTP
  const { method } = req;

  // Verificando o método da solicitação
  switch (method) {
    // Caso a solicitação seja do tipo GET
    case 'GET':
      try {
        // Obtendo documentos da coleção "ordens" do Firestore
        const querySnapshot = await getDocs(collection(db, "ordens"));
        // Mapeando os documentos para um formato específico
        const ordens = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Respondendo com os dados obtidos
        res.status(200).json(ordens);
      } catch (e) {
        // Em caso de erro, registrando o erro e respondendo com status 500
        console.error("Erro ao buscar o serviço:", e);
        res.status(500).json({ error: "Erro ao buscar clientes" });
      }
      break;

    // Caso a solicitação seja do tipo POST
    case 'POST':
      // Extraindo os dados do corpo da solicitação
      const { nome, endereco, telefone, email } = req.body;
      try {
        // Adicionando um novo documento à coleção "clientes" no Firestore
        const docRef = await addDoc(collection(db, "clientes"), {
          nome,
          endereco,
          telefone,
          email
        });
        // Respondendo com o ID do documento recém-criado
        res.status(200).json({ id: docRef.id });
      } catch (e) {
        // Em caso de erro, registrando o erro e respondendo com status 500
        console.error("Erro ao adicionar cliente:", e);
        res.status(500).json({ error: "Erro ao adicionar cliente" });
      }
      break;

    // Caso a solicitação seja do tipo PUT
    case 'PUT':
      // Extraindo os dados do corpo da solicitação
      const { id, nome: nomeAtualizado, endereco: enderecoAtualizado, telefone: telefoneAtualizado, email: emailAtualizado } = req.body;
      try {
        // Atualizando um documento na coleção "clientes" no Firestore
        const docRef = doc(db, "clientes", id);
        await updateDoc(docRef, {
          nome: nomeAtualizado,
          endereco: enderecoAtualizado,
          telefone: telefoneAtualizado,
          email: emailAtualizado
        });
        // Respondendo com uma mensagem de sucesso
        res.status(200).json({ message: "Cliente atualizado com sucesso" });
      } catch (e) {
        // Em caso de erro, registrando o erro e respondendo com status 500
        console.error("Erro ao atualizar cliente:", e);
        res.status(500).json({ error: "Erro ao atualizar cliente" });
      }
      break;

    // Caso a solicitação seja do tipo DELETE
    case 'DELETE':
      // Extraindo o ID do corpo da solicitação
      const { id: idExcluir } = req.body;
      try {
        // Excluindo um documento na coleção "clientes" no Firestore
        const docRef = doc(db, "clientes", idExcluir);
        await deleteDoc(docRef);
        // Respondendo com uma mensagem de sucesso
        res.status(200).json({ message: "Cliente excluído com sucesso" });
      } catch (e) {
        // Em caso de erro, registrando o erro e respondendo com status 500
        console.error("Erro ao excluir cliente:", e);
        res.status(500).json({ error: "Erro ao excluir cliente" });
      }
      break;

    // Caso o método da solicitação não seja reconhecido
    default:
      // Respondendo com status 405 e uma mensagem de erro
      res.status(405).json({ error: "Método não permitido" });
      break;
  }
}
