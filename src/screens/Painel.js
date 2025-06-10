import { Link, Outlet } from 'react-router-dom';
import { FaBox, FaTags } from 'react-icons/fa';
import styles from './Painel.module.css';
 
const Painel = () => {
  return (
    <div className={styles.painelContainer}>
      <aside className={styles.menuLateral}>
        <h2 className={styles.tituloMenu}>Painel</h2>
        <nav>
          <ul>
            <li>
              <Link to="products" className={styles.linkMenu}>
                <FaBox className={styles.icone} /> Produto
              </Link>
            </li>
            <li>
              <Link to="brand" className={styles.linkMenu}>
                <FaTags className={styles.icone} /> Marca
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
 
      <main className={styles.conteudo}>
        {/* Aqui renderiza Products ou Brand */}
        <Outlet />
      </main>
    </div>
  );
};
 
export default Painel;