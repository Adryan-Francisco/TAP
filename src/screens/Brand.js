import React from 'react';
import styles from './Brand.module.css';

const Brand = () => {
  return (
    <div className={styles.formWrapper}>
      <h2><center>Cadastrar Marca</center></h2>
      <form className={styles.form}>
        <label>
          <span>Nome da Marca:</span>
          <input type="text" placeholder="Digite o nome da marca" required />
        </label>
        <button type="submit" className={styles.btn}>Cadastrar</button>
      </form>
    </div>
  );
};

export default Brand;
