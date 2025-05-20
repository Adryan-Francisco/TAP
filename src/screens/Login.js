import { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('Login realizado com:', email, password);
    } else {
      setError('Por favor, preencha todos os campos!');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Digite sua Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.btnLogin}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
