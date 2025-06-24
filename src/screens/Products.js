import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/connection';
import styles from './Products.module.css';

const Produto = () => {
  const [produtoNome, setProdutoNome] = useState('');
  const [produtoPreco, setProdutoPreco] = useState('');
  const [marca, setMarca] = useState('');
  const [unidade, setUnidade] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const produtoCollection = collection(db, 'produtos');
  const marcaCollection = collection(db, 'brands');

  // Carregar marcas
  useEffect(() => {
    const q = query(marcaCollection, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setMarcas(list);
    });
    return () => unsubscribe();
  }, []);

  // Carregar produtos
  useEffect(() => {
    const q = query(produtoCollection, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProdutos(list);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      produtoNome.trim() === '' ||
      produtoPreco.trim() === '' ||
      marca.trim() === '' ||
      unidade.trim() === ''
    ) {
      setMessage('Preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const precoNumber = parseFloat(produtoPreco);
      if (isNaN(precoNumber)) {
        setMessage('Preço inválido.');
        setLoading(false);
        return;
      }

      if (editId) {
        const produtoRef = doc(db, 'produtos', editId);
        await updateDoc(produtoRef, {
          nome: produtoNome,
          preco: precoNumber,
          marca,
          unidade,
        });
        setMessage('Produto atualizado com sucesso!');
        setEditId(null);
      } else {
        await addDoc(produtoCollection, {
          nome: produtoNome,
          preco: precoNumber,
          marca,
          unidade,
          createdAt: Timestamp.now(),
        });
        setMessage('Produto cadastrado com sucesso!');
      }

      setProdutoNome('');
      setProdutoPreco('');
      setMarca('');
      setUnidade('');
      setSearch('');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setMessage('Erro ao salvar o produto.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (produto) => {
    setProdutoNome(produto.nome);
    setProdutoPreco(produto.preco.toString());
    setMarca(produto.marca || '');
    setUnidade(produto.unidade || '');
    setEditId(produto.id);
    setMessage('');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Deseja excluir este produto?');
    if (!confirmDelete) return;

    try {
      const produtoRef = doc(db, 'produtos', id);
      await deleteDoc(produtoRef);
      setMessage('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setMessage('Erro ao excluir o produto.');
    }
  };

  const filteredProdutos = produtos.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.formWrapper}>
      <h2 style={{ textAlign: 'center' }}>
        {editId ? 'Editar Produto' : 'Cadastrar Produto'}
      </h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome do Produto:
          <input
            type="text"
            placeholder="Digite o nome"
            value={produtoNome}
            onChange={(e) => setProdutoNome(e.target.value)}
          />
        </label>

        <label>
          Preço:
          <input
            type="text"
            placeholder="Digite o preço"
            value={produtoPreco}
            onChange={(e) => setProdutoPreco(e.target.value)}
          />
        </label>

        <label>
          Marca:
          <select value={marca} onChange={(e) => setMarca(e.target.value)}>
            <option value="">Selecione uma marca</option>
            {marcas.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Unidade:
          <input
            type="text"
            placeholder="Quantidade"
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
          />
        </label>

        <button type="submit" className={styles.btn} disabled={loading}>
          {editId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <input
        type="text"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {message && (
        <p style={{ color: message.toLowerCase().includes('erro') ? 'red' : 'green' }}>
          {message}
        </p>
      )}

      <h3>Produtos Cadastrados:</h3>
      <p>Total: {filteredProdutos.length}</p>

      {filteredProdutos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {filteredProdutos.map((produto) => (
            <li key={produto.id} className={styles.listItem}>
              <span>
                {produto.nome} - R$ {produto.preco.toFixed(2).replace('.', ',')}
                {produto.marca && <> • Marca: <strong>{produto.marca}</strong></>}
                {produto.unidade && <> • Unidade: <strong>{produto.unidade}</strong></>}
                {produto.createdAt && produto.createdAt.toDate && (
                  <small style={{ marginLeft: '10px', color: '#666' }}>
                    ({produto.createdAt.toDate().toLocaleDateString()})
                  </small>
                )}
              </span>
              <div>
                <button onClick={() => handleEdit(produto)} className={styles.btnEdit}>
                  Editar
                </button>
                <button onClick={() => handleDelete(produto.id)} className={styles.btnDelete}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Produto;
