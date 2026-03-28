import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../../shared/components/Button';
import { Header } from '../../../shared/components/Header';
import { InputText, InputPassword } from '../../../shared/components/InputText';
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

  return (
    <div className="min-h-screen w-full text-white flex flex-col items-center">
      <Header />

      <section className="flex flex-col items-center justify-center h-[calc(100vh-80px)] min-w-[300px]">
        <h3 className="my-8 mx-auto text-2xl">Iniciar sesión</h3>
        <form className="flex flex-col items-center justify-center w-full gap-4" onSubmit={handleSubmit}>
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

          <Button className="w-full mt-8 btn-primary" type="submit" isLoading={isLoading}>Iniciar sesión</Button>

          {error && <p className="text-red-500 text-xl mt-4">{error}</p>}
        </form>
      </section>
    </div>
  );
}