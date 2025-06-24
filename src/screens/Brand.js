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
import styles from './Brand.module.css'; // Certifique-se de que esse arquivo existe

const Brand = () => {
  const [brandName, setBrandName] = useState('');
  const [brands, setBrands] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const brandCollection = collection(db, 'brands');

  useEffect(() => {
    const q = query(brandCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBrands(list);
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

    if (brandName.trim() === '') {
      setMessage('Por favor, preencha o nome da marca.');
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        const brandRef = doc(db, 'brands', editId);
        await updateDoc(brandRef, { name: brandName });
        setMessage('Marca atualizada com sucesso!');
        setEditId(null);
      } else {
        await addDoc(brandCollection, {
          name: brandName,
          createdAt: Timestamp.now(),
        });
        setMessage('Marca cadastrada com sucesso!');
      }

      setBrandName('');
      setSearch('');
    } catch (error) {
      console.error('Erro ao salvar marca:', error);
      setMessage('Erro ao salvar a marca.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (brand) => {
    setBrandName(brand.name);
    setEditId(brand.id);
    setMessage('');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta marca?');
    if (!confirmDelete) return;

    try {
      const brandRef = doc(db, 'brands', id);
      await deleteDoc(brandRef);
      setMessage('Marca excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir marca:', error);
      setMessage('Erro ao excluir a marca.');
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.formWrapper}>
      <h2 style={{ textAlign: 'center' }}>
        {editId ? 'Editar Marca' : 'Cadastrar Marca'}
      </h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome da Marca:
          <input
            type="text"
            placeholder="Digite o nome da marca"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </label>
        <button type="submit" className={styles.btn} disabled={loading}>
          {editId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <input
        type="text"
        placeholder="Buscar marcas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {message && (
        <p style={{ color: message.toLowerCase().includes('erro') ? 'red' : 'green' }}>
          {message}
        </p>
      )}

      <h3>Marcas Cadastradas:</h3>
      <p>Total: {filteredBrands.length}</p>

      {filteredBrands.length === 0 ? (
        <p>Nenhuma marca encontrada.</p>
      ) : (
        <ul className={styles.list}>
          {filteredBrands.map((brand) => (
            <li key={brand.id} className={styles.listItem}>
              <span>
                {brand.name}
                {brand.createdAt && brand.createdAt.toDate && (
                  <small style={{ marginLeft: '10px', color: '#666' }}>
                    ({brand.createdAt.toDate().toLocaleDateString()})
                  </small>
                )}
              </span>
              <div>
                <button onClick={() => handleEdit(brand)} className={styles.btnEdit}>
                  Editar
                </button>
                <button onClick={() => handleDelete(brand.id)} className={styles.btnDelete}>
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

export default Brand;
