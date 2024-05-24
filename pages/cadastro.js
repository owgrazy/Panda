/**
 * Nome do arquivo: cadastro.js
 * Data de criação: 10/05/2024
 * Autor: Graziele Oliveira
 * Matrícula: 01632441
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por incluir a ligação com o CRUD e os campos dos dados a serem inseridos pelo cliente.
 *
 * Este script é parte o curso de ADS.
 */

// Importando módulos e funções necessárias
import React, { useState, useEffect } from 'react';
import styles from './home.module.css'; // Estilos CSS
import { db } from '../services/firebase'; // Instância do banco de dados Firestore
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'; // Funções do Firestore
import { useRouter } from 'next/router'; // Roteamento

// Componente de cadastro de clientes
export default function Cadastro() {
  // Definindo estados para os dados do cliente e controle de edição
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const router = useRouter();

  // Efeito para buscar clientes ao carregar o componente
  useEffect(() => {
    fetchClientes();
  }, []);

  // Função para buscar clientes no Firestore
  const fetchClientes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'clientes'));
      const clientesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClientes(clientesData);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setClientes([]);
    }
  };

  // Função para lidar com o envio do formulário de cadastro
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificando se todos os campos estão preenchidos
      if (!nome || !endereco || !telefone || !email) {
        alert('Por favor, preencha todos os campos');
        return;
      }

      // Verificando se é uma edição ou criação de cliente
      if (editId) {
        const docRef = doc(db, 'clientes', editId);
        await updateDoc(docRef, {
          nome,
          endereco,
          telefone,
          email
        });
        setEditId(null);
      } else {
        await addDoc(collection(db, 'clientes'), {
          nome,
          endereco,
          telefone,
          email
        });
      }
      // Limpando os campos após adição ou edição e atualizando a lista de clientes
      setNome('');
      setEndereco('');
      setTelefone('');
      setEmail('');
      fetchClientes();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  // Função para preencher os campos com os dados do cliente a ser editado
  const handleEdit = (id, nome, endereco, telefone, email) => {
    setEditId(id);
    setNome(nome);
    setEndereco(endereco);
    setTelefone(telefone);
    setEmail(email);
  };

  // Função para excluir um cliente
  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, 'clientes', id);
      await deleteDoc(docRef);
      fetchClientes(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  // Função para buscar clientes com base no termo de busca
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    try {
      const querySnapshot = await getDocs(collection(db, 'clientes'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Filtrando os clientes com base no termo de busca
      const filteredClientes = data.filter(cliente => cliente.nome.toLowerCase().includes(value.toLowerCase()));
      setClientes(filteredClientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  // Retornando o JSX do componente
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.h1}>{editId ? 'Atualizar Cliente' : 'Cadastrar Cliente'}</h2>
        <label>Nome</label>
        <input className={styles.input} type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <label>Endereço</label>
        <input className={styles.input} type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
        <label>Telefone</label>
        <input className={styles.input} type="tel" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        <label>E-mail</label>
        <input className={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <div className={styles.button_container}>
          <button className={styles.button} type="submit">{editId ? 'Atualizar' : 'Criar'}</button>
          <button className={styles.buttoni} onClick={() => router.push('/ordem-de-servico')}>Ordem de Serviço</button>
        </div>
      </form>
      <div className={styles.caixavizinha}>
        <form onSubmit={handleSearch}>
          <input className={styles.inputb} type="text" placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className={styles.buttonb} type="submit">Buscar</button>
        </form>
        {/* Mapeando e exibindo os clientes */}
        {clientes.map(cliente => (
          <div key={cliente.id} className={styles.cadastrado}>
            <p>{cliente.nome}</p>
            <p>{cliente.endereco}</p>
            <p>{cliente.telefone}</p>
            <p>{cliente.email}</p>
            <div>
              {/* Botões de edição e exclusão */}
              <button className={styles.buttone} onClick={() => handleEdit(cliente.id, cliente.nome, cliente.endereco, cliente.telefone, cliente.email)}>Editar</button>
              <button className={styles.buttond} onClick={() => handleDelete(cliente.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
