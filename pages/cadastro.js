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

import React, { useState, useEffect } from 'react';
import styles from './home.module.css';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function cadastro() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
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
      setClientes([]); // Set to empty array on error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const docRef = doc(db, 'clientes', editId);
        await updateDoc(docRef, {
          nome,
          endereco,
          telefone,
          email
        });
        setClientes(clientes.map(cliente => cliente.id === editId ? { id: editId, nome, endereco, telefone, email } : cliente));
        setEditId(null);
      } else {
        const docRef = await addDoc(collection(db, 'clientes'), {
          nome,
          endereco,
          telefone,
          email
        });
        setClientes([...clientes, { id: docRef.id, nome, endereco, telefone, email }]);
      }
      setNome('');
      setEndereco('');
      setTelefone('');
      setEmail('');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleEdit = (id, nome, endereco, telefone, email) => {
    setEditId(id);
    setNome(nome);
    setEndereco(endereco);
    setTelefone(telefone);
    setEmail(email);
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, 'clientes', id);
      await deleteDoc(docRef);
      setClientes(clientes.filter(cliente => cliente.id !== id));
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const querySnapshot = await getDocs(collection(db, 'clientes'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const filteredClientes = data.filter(cliente => cliente.nome.toLowerCase().includes(search.toLowerCase()));
      setClientes(filteredClientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  return (
    <>
      <h1 className={styles.heading}>Cadastro Cliente</h1>
      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input className={styles.input} type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          <input className={styles.input} type="tel" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          <input className={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className={styles.button} type="submit">Salvar</button>
        </form>
        <button className={styles.button} onClick={() => router.push('/ordem-de-servico')}>Criar Ordem de Serviço</button>
        <div className={styles.caixaclientes}>
          <form onSubmit={handleSearch}>
            <input className={styles.inputb} type="text" placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className={styles.buttonb} type="submit">Buscar</button>
          </form>
          {Array.isArray(clientes) && clientes.map(cliente => (
            <div key={cliente.id} className={styles.cadastrado}>
              <div className={styles.p}>
                <p>{cliente.nome}</p>
                <p>{cliente.endereco}</p>
                <p>{cliente.telefone}</p>
                <p>{cliente.email}</p>
                <div>
                  <button className={styles.buttone} onClick={() => handleEdit(cliente.id, cliente.nome, cliente.endereco, cliente.telefone, cliente.email)}>Editar</button>
                  <button className={styles.buttond} onClick={() => handleDelete(cliente.id)}>Excluir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
