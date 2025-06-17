import { useState, useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { useNavigate } from 'react-router-dom'; // Importando navegação


const Login = () => {
    const [displayEmail, setEmail] = useState('');
    const [displayPassword, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, error: authError, loading } = useAuthentication();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("")

        const user = {
            email: displayEmail,
            password: displayPassword
        }
        const res = await login(user, navigate); // Enviando navigate para o hook
    }

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div>
            <h2><center>Entrar</center></h2>
            <p><center>Faça login</center></p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>
                        E-mail:
                    </span>
                    <input type="email" name="displayEmail" required placeholder="E-mail"
                        value={displayEmail}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>
                        Senha:
                    </span>
                    <input type="password" name="displayPasword" required placeholder="Senha"
                        value={displayPassword}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <center>{!loading && <button className="btn">Logar</button>}</center>
                <center>{loading && <button className="btn" disabled>Aguarde...</button>}</center>
                <center>{error && <p className="error">{error}</p>}</center>
            </form>
        </div>
    )
}

export default Login
