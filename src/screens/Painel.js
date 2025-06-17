import { Link, Outlet } from 'react-router-dom';
import { MdInventory2, MdLocalOffer } from 'react-icons/md';
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
                <MdInventory2 className={styles.icone} /> Produto
              </Link>
            </li>
            <li>
              <Link to="brand" className={styles.linkMenu}>
                <MdLocalOffer className={styles.icone} /> Marca
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles.conteudo}>
        <Outlet />
      </main>
    </div>
  );
};

export default Painel;
