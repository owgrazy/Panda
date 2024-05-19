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
import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import styles from './home.module.css';
import { useRouter } from 'next/router';

export default function OrdemDeServicoForm() {
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [clienteNome, setClienteNome] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [custoEstimado, setCustoEstimado] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [status, setStatus] = useState('Pendente');
  const router = useRouter();

  useEffect(() => {
    fetchClientes();
  }, []);

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

  const handleClienteChange = (e) => {
    const selectedCliente = clientes.find(cliente => cliente.id === e.target.value);
    setClienteId(selectedCliente.id);
    setClienteNome(selectedCliente.nome);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
      setClienteId('');
      setClienteNome('');
      setData('');
      setDescricao('');
      setCustoEstimado('');
      setObservacoes('');
      setStatus('Pendente');
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Criar Ordem de Serviço</h2>
        <div>
          <label>Cliente:</label>
          <select className={styles.input} value={clienteId} onChange={handleClienteChange} required>
            <option value="">Selecione um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Data:</label>
          <input className={styles.input} type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea className={styles.input} value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>
        <div>
          <label>Custo Estimado:</label>
          <input className={styles.input} type="number" value={custoEstimado} onChange={(e) => setCustoEstimado(e.target.value)} required />
        </div>
        <div>
          <label>Observações:</label>
          <textarea className={styles.input} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <select className={styles.input} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>
        <button className={styles.button} type="submit">Criar Ordem de Serviço</button>
      </form>
      <button className={styles.button} onClick={() => router.push('/cadastro')}>Cadastrar CLiente</button>
    </div>
  );
}