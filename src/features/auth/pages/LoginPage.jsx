import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../../shared/components/Button';
import { Header } from '../../../shared/components/Header';
import { InputText, InputPassword } from '../../../shared/components/InputText';
import './LoginPage.css';
import { getLoginState, setLoginState } from '../../../state/loginState';

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    setLoginState({
      isAuthenticated: true,
      username,
      password
    });

    console.log("estado de login:", getLoginState());

    return {
      username,
      password
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Por favor, ingresa tu nombre de usuario y contraseña.');
      return;
    }

    try {
      setIsLoading(true);
      await login(username, password);
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  return <div className="login-page">
    <Header />

    <section className="login-section">
      <h3 className="title">Iniciar sesión</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <InputText
          label="Nombre de usuario"
          id="username"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <InputPassword
          label="Contraseña"
          id="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error.message}</p>}
        
        <Button className="login-button" type="submit" isLoading={isLoading}>Iniciar sesión</Button>
      </form>
    </section>
  </div >;
}