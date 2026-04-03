import { InputPassword, InputText } from '../../../shared/components/InputText';
import { Button } from '../../../shared/components/Button';
import { Header } from '../../../shared/components/Header';
import { register } from '../services/RegisterService';
import { useNavigate } from 'react-router';
import { useMemo, useState } from 'react';
import usersMock from '../../../mocks/users.json';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [emailTouched, setEmailTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [repeatPasswordTouched, setRepeatPasswordTouched] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim().toLowerCase();

  const emailHasFormat = emailRegex.test(email);
  const usernameHasMinLength = username.trim().length >= 3;
  const passwordHasMinLength = password.length >= 8;
  const passwordsMatch = password === repeatPassword && repeatPassword.length > 0;

  const emailExists = useMemo(() => {
    return usersMock.some(
      user => user.email.toLowerCase() === normalizedEmail
    );
  }, [normalizedEmail]);

  const usernameExists = useMemo(() => {
    return usersMock.some(
      user => user.username.toLowerCase() === normalizedUsername
    );
  }, [normalizedUsername]);

  const isEmailValid =
    emailTouched &&
    email.length > 0 &&
    emailHasFormat &&
    !emailExists;

  const isUsernameValid =
    usernameTouched &&
    username.length > 0 &&
    usernameHasMinLength &&
    !usernameExists;

  const isPasswordValid =
    passwordTouched &&
    password.length > 0 &&
    passwordHasMinLength;

  const isRepeatPasswordValid =
    repeatPasswordTouched &&
    repeatPassword.length > 0 &&
    passwordsMatch;

  const getEmailErrorMessage = () => {
    if (!emailTouched || !email) return '';
    if (!emailHasFormat) return 'Ingresa un correo válido.';
    if (emailExists) return 'Este correo ya está registrado.';
    return '';
  };

  const getUsernameErrorMessage = () => {
    if (!usernameTouched || !username) return '';
    if (!usernameHasMinLength) {
      return 'El nombre de usuario debe tener al menos 3 caracteres.';
    }
    if (usernameExists) return 'Este nombre de usuario ya está en uso.';
    return '';
  };

  const getPasswordErrorMessage = () => {
    if (!passwordTouched || !password) return '';
    if (!passwordHasMinLength) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
    return '';
  };

  const getRepeatPasswordErrorMessage = () => {
    if (!repeatPasswordTouched || !repeatPassword) return '';
    if (!passwordsMatch) return 'Las contraseñas no coinciden.';
    return '';
  };

  const validateForm = () => {
    if (!email || !username || !password || !repeatPassword) {
      return 'Por favor, completa todos los campos.';
    }

    if (!emailHasFormat) {
      return 'Ingresa un correo válido.';
    }

    if (emailExists) {
      return 'Este correo ya está registrado.';
    }

    if (!usernameHasMinLength) {
      return 'El nombre de usuario debe tener al menos 3 caracteres.';
    }

    if (usernameExists) {
      return 'Este nombre de usuario ya está en uso.';
    }

    if (!passwordHasMinLength) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (!passwordsMatch) {
      return 'Las contraseñas no coinciden.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailTouched(true);
    setUsernameTouched(true);
    setPasswordTouched(true);
    setRepeatPasswordTouched(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);

      await register({
        email,
        username,
        password,
      });

      navigate('/home');
    } catch (error) {
      console.error('Error registering:', error.message);
      setError(error.message || 'Ocurrió un error al crear la cuenta.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    console.log('Registro con Google');
  };

  const handleFacebookRegister = () => {
    console.log('Registro con Facebook');
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Header />

      <section className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="text-2xl font-bold text-center mb-6">Crea una cuenta</h3>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <InputText
                label="Correo electrónico"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                error={emailTouched && !!getEmailErrorMessage()}
                success={isEmailValid}
                errorMessage={getEmailErrorMessage()}
                successMessage={isEmailValid ? 'Correo disponible.' : ''}
                placeholder="ejemplo@correo.com"
              />

              <InputText
                label="Nombre de usuario"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setUsernameTouched(true)}
                error={usernameTouched && !!getUsernameErrorMessage()}
                success={isUsernameValid}
                errorMessage={getUsernameErrorMessage()}
                successMessage={isUsernameValid ? 'Nombre de usuario disponible.' : ''}
                placeholder="Tu nombre de usuario"
              />

              <InputPassword
                label="Contraseña"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                error={passwordTouched && !!getPasswordErrorMessage()}
                success={isPasswordValid}
                errorMessage={getPasswordErrorMessage()}
                successMessage={isPasswordValid ? 'Contraseña válida.' : ''}
                placeholder="Mínimo 8 caracteres"
              />

              <InputPassword
                label="Repetir contraseña"
                id="repeatPassword"
                name="repeatPassword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                onBlur={() => setRepeatPasswordTouched(true)}
                error={repeatPasswordTouched && !!getRepeatPasswordErrorMessage()}
                success={isRepeatPasswordValid}
                errorMessage={getRepeatPasswordErrorMessage()}
                successMessage={isRepeatPasswordValid ? 'Las contraseñas coinciden.' : ''}
                placeholder="Repite tu contraseña"
              />

              <Button
                className="w-full mt-2 btn-primary"
                type="submit"
                isLoading={isLoading}
              >
                Crear cuenta
              </Button>

              {error && (
                <p className="text-error text-sm mt-2 text-center">{error}</p>
              )}
            </form>

            <div className="divider">o continúa con</div>

            <div className="flex flex-col gap-3">
              <Button
                className="w-full btn-outline"
                type="button"
                onClick={handleGoogleRegister}
              >
                Continuar con Google
              </Button>

              <Button
                className="w-full btn-outline"
                type="button"
                onClick={handleFacebookRegister}
              >
                Continuar con Facebook
              </Button>
            </div>

            <div className="mt-6 text-center text-sm opacity-70">
              <p>
                ¿Ya tienes cuenta?{' '}
                <a href="/login" className="link link-primary">
                  Inicia sesión aquí
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}