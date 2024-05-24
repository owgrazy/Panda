/**
 * Nome do arquivo: ordem-de-servico.js
 * Data de criação: 02/05/2024
 * Autor: Graziele Oliveira
 * Matrícula: 01632441
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por incluir a ligação com o CRUD e os campos dos dados a serem adicionados as ordens de serviços.
 * 
 * Este script é parte o curso de ADS.
 */

// Importando React e hooks necessários
import React, { useState, useEffect } from 'react';
// Importando o banco de dados Firestore e os métodos de CRUD
import { db } from '../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// Importando estilos CSS
import styles from './home.module.css';
// Importando o hook useRouter do Next.js para roteamento
import { useRouter } from 'next/router';


// Componente para o formulário de ordem de serviço
export default function OrdemDeServicoForm() {
  // Definindo estados para clientes, ordens e dados do formulário
  const [clientes, setClientes] = useState([]);
  const [ordens, setOrdens] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [clienteNome, setClienteNome] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [custoEstimado, setCustoEstimado] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // Efeito para buscar clientes e ordens ao carregar o componente
  useEffect(() => {
    fetchClientes();
    fetchOrdens();
  }, []);

  // Função para buscar clientes no banco de dados
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
    }
  };

  // Função para buscar ordens no banco de dados
  const fetchOrdens = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'ordens'));
      const ordensData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrdens(ordensData);
    } catch (error) {
      console.error('Erro ao buscar ordens:', error);
    }
  };

  // Função para lidar com a seleção de um cliente no formulário
  const handleClienteChange = (e) => {
    const selectedCliente = clientes.find(cliente => cliente.id === e.target.value);
    setClienteId(selectedCliente.id);
    setClienteNome(selectedCliente.nome);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Atualizando uma ordem de serviço existente
        const docRef = doc(db, 'ordens', editId);
        await updateDoc(docRef, {
          clienteId,
          clienteNome,
          data,
          descricao,
          custoEstimado,
          observacoes,
          status
        });
        alert('Ordem de serviço atualizada com sucesso!');
        setEditId(null);
      } else {
        // Adicionando uma nova ordem de serviço
        await addDoc(collection(db, 'ordens'), {
          clienteId,
          clienteNome,
          data,
          descricao,
          custoEstimado,
          observacoes,
          status
        });
        alert('Ordem de serviço criada com sucesso!');
      }

      // Resetando os campos do formulário após o envio
      setClienteId('');
      setClienteNome('');
      setData('');
      setDescricao('');
      setCustoEstimado('');
      setObservacoes('');
      setStatus('Pendente');
      // Atualizando a lista de ordens após adicionar/atualizar uma ordem
      fetchOrdens(); 
    } catch (error) {
      console.error('Erro ao salvar ordem de serviço:', error);
    }
  };

  // Função para lidar com a edição de uma ordem de serviço
  const handleEdit = (ordem) => {
    setEditId(ordem.id);
    setClienteId(ordem.clienteId);
    setClienteNome(ordem.clienteNome);
    setData(ordem.data);
    setDescricao(ordem.descricao);
    setCustoEstimado(ordem.custoEstimado);
    setObservacoes(ordem.observacoes);
    setStatus(ordem.status);
  };

  // Função para lidar com a exclusão de uma ordem de serviço
  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, 'ordens', id);
      await deleteDoc(docRef);
      // Atualizando a lista de ordens após a exclusão
      setOrdens(ordens.filter(ordem => ordem.id !== id));
    } catch (error) {
      console.error('Erro ao excluir ordem de serviço:', error);
    }
  };

  // Função para lidar com a busca de ordens de serviço
  const handleSearch = (e) => {
    e.preventDefault();
    // Atualizando a lista de ordens
    fetchOrdens();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente':
        return `${styles.status} ${styles['status-pendente']}`;
      case 'Em andamento':
        return `${styles.status} ${styles['status-em-andamento']}`;
      case 'Concluído':
        return `${styles.status} ${styles['status-concluido']}`;
      default:
        return styles.status;
    }
  };

  // Retornando o JSX que representa o formulário e a lista de ordens de serviço
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.h1}>{editId ? 'Editar Ordem de Serviço' : 'Criar Ordem de Serviço'}</h2>
        <div>
          <label>Cliente</label>
          {/* Dropdown para selecionar um cliente */}
          <select className={styles.input} value={clienteId} onChange={handleClienteChange} required>
            <option value="">Selecione um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Data</label>
          {/* Campo para inserir a data da ordem de serviço */}
          <input className={styles.input} type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>
        <div>
          <label>Descrição</label>
          {/* Campo para inserir a descrição da ordem de serviço */}
          <textarea className={styles.input} value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>
        <div>
          <label>Custo Estimado</label>
          {/* Campo para inserir o custo estimado da ordem de serviço */}
          <input className={styles.input} type="number" value={custoEstimado} onChange={(e) => setCustoEstimado(e.target.value)} required />
        </div>
        <div>
          <label>Observações</label>
          {/* Campo para inserir observações adicionais */}
          <textarea className={styles.input} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
        </div>
        <div>
          <label>Status</label>
          {/* Dropdown para selecionar o status da ordem de serviço */}
          <select className={styles.input} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>
        <div className={styles.button_container}>
          {/* Botão para enviar o formulário */}
          <button className={styles.button} type="submit">{editId ? 'Atualizar' : 'Criar'}</button>
          {/* Botão para redirecionar para a página de cadastro de cliente */}
          <button className={styles.buttoni} type="button" onClick={() => router.push('/cadastro')}>Cliente</button>
        </div>
      </form>
      {/* Div para exibir a lista de ordens de serviço */}
      <div className={styles.caixavizinha}>
        <form onSubmit={handleSearch}>
          {/* Campo de busca */}
          <input className={styles.inputb} type="text" placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} />
          {/* Botão para buscar */}
          <button className={styles.buttonb} type="submit">Buscar</button>
        </form>
        {/* Mapeando e exibindo as ordens de serviço */}
        {Array.isArray(ordens) && ordens.filter(ordem => ordem.clienteNome?.toLowerCase().includes(search.toLowerCase())).map(ordem => (
          <div key={ordem.id} className={styles.cadastrado}>
            <div className={styles.p}>
              <p>{ordem.clienteNome}</p>
              <p>{ordem.data}</p>
              <p>{ordem.descricao}</p>
              <p>{ordem.custoEstimado}</p>
              <p>{ordem.observacoes}</p>
              <p className={getStatusClass(ordem.status)}>{ordem.status}</p>
              <div> 
                {/* Botões para editar e excluir uma ordem de serviço */}
                <button className={styles.buttone} onClick={() => handleEdit(ordem)}>Editar</button>
                <button className={styles.buttond} onClick={() => handleDelete(ordem.id)}>Excluir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
