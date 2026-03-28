import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../../shared/components/Button';
import { Header } from '../../../shared/components/Header';
import { InputText, InputPassword } from '../../../shared/components/InputText';
import './LoginPage.css';
import { login } from './LoginService';

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      alert('Por favor, ingresa tu nombre de usuario y contraseña.');
      return;
    }

    try {
      setIsLoading(true);
      await login(username, password);
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error.message);
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

        <Button className="login-button" type="submit" isLoading={isLoading}>Iniciar sesión</Button>
        
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  </div >;
}