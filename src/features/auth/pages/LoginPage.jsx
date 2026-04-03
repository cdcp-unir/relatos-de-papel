import { InputPassword, InputText } from '../../../shared/components/InputText';

import { Button } from '../../../shared/components/Button';
import { Header } from '../../../shared/components/Header';
import { login } from '../services/LoginService';
import { useNavigate } from 'react-router';
import { useState } from 'react';

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
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Header */}
      <Header />

      {/* Contenedor principal */}
      <section className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h3>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

              <Button
                className="w-full mt-4 btn-primary"
                type="submit"
                isLoading={isLoading}
              >
                Iniciar sesión
              </Button>

              {error && (
                <p className="text-error text-sm mt-2 text-center">{error}</p>
              )}
            </form>

            {/* Extras */}
            <div className="mt-6 text-center text-sm opacity-70">
              <p>
                ¿No tienes cuenta?{" "}
                <a href="/register" className="link link-primary">
                  Regístrate aquí
                </a>
              </p>
              <p className="mt-2">
                <a href="/forgot-password" className="link link-secondary">
                  ¿Olvidaste tu contraseña?
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}