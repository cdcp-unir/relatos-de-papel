import { InputPassword, InputText } from "../../../shared/components/InputText";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import { Button } from "../../../shared/components/Button";
import { Header } from "../../../shared/components/Header";
import { PATHS } from "../../../app/router/paths";
import { register } from "../services/RegisterService";
import { useTranslation } from "react-i18next";
import usersMock from "@mocks/users.json";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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
    return usersMock.some((user) => user.email.toLowerCase() === normalizedEmail);
  }, [normalizedEmail]);

  const usernameExists = useMemo(() => {
    return usersMock.some(
      (user) => user.username.toLowerCase() === normalizedUsername
    );
  }, [normalizedUsername]);

  const isEmailValid =
    emailTouched &&
    email.length > 0 &&
    emailHasFormat &&
    !emailExists;

  const isUsernameValid =
    usernameTouched &&
    username.trim().length > 0 &&
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
    if (!emailTouched || !email) return "";
    if (!emailHasFormat) return t("register.validation.invalidEmail");
    if (emailExists) return t("errors.EMAIL_EXISTS");
    return "";
  };

  const getUsernameErrorMessage = () => {
    if (!usernameTouched || !username) return "";
    if (!usernameHasMinLength) return t("register.validation.usernameMinLength");
    if (usernameExists) return t("errors.USERNAME_EXISTS");
    return "";
  };

  const getPasswordErrorMessage = () => {
    if (!passwordTouched || !password) return "";
    if (!passwordHasMinLength) {
      return t("register.validation.passwordMinLength");
    }
    return "";
  };

  const getRepeatPasswordErrorMessage = () => {
    if (!repeatPasswordTouched || !repeatPassword) return "";
    if (!passwordsMatch) return t("register.validation.passwordsDoNotMatch");
    return "";
  };

  const validateForm = () => {
    if (!email || !username || !password || !repeatPassword) {
      return t("register.validation.allFieldsRequired");
    }

    if (!emailHasFormat) {
      return t("register.validation.invalidEmail");
    }

    if (emailExists) {
      return t("errors.EMAIL_EXISTS");
    }

    if (!usernameHasMinLength) {
      return t("register.validation.usernameMinLength");
    }

    if (usernameExists) {
      return t("errors.USERNAME_EXISTS");
    }

    if (!passwordHasMinLength) {
      return t("register.validation.passwordMinLength");
    }

    if (!passwordsMatch) {
      return t("register.validation.passwordsDoNotMatch");
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

      navigate(PATHS.HOME);
    } catch (error) {
      console.error("Error registering:", error.message);
      setError(
        t(`errors.${error.message}`, {
          defaultValue: t("register.errors.generic"),
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Header />

      <section className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="text-2xl font-bold text-center mb-6">
              {t("register.title")}
            </h3>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <InputText
                label={t("register.email")}
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                error={emailTouched && !!getEmailErrorMessage()}
                success={isEmailValid}
                errorMessage={getEmailErrorMessage()}
                successMessage={isEmailValid ? t("register.success.emailAvailable") : ""}
                placeholder={t("register.placeholders.email")}
              />

              <InputPassword
                label={t("register.password")}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                error={passwordTouched && !!getPasswordErrorMessage()}
                success={isPasswordValid}
                errorMessage={getPasswordErrorMessage()}
                successMessage={isPasswordValid ? t("register.success.passwordValid") : ""}
                placeholder={t("register.placeholders.password")}
                checkboxLabel={t("login.checkboxLabel")}
              />

              <InputPassword
                label={t("register.repeatPassword")}
                id="repeatPassword"
                name="repeatPassword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                onBlur={() => setRepeatPasswordTouched(true)}
                error={repeatPasswordTouched && !!getRepeatPasswordErrorMessage()}
                success={isRepeatPasswordValid}
                errorMessage={getRepeatPasswordErrorMessage()}
                successMessage={
                  isRepeatPasswordValid ? t("register.success.passwordsMatch") : ""
                }
                placeholder={t("register.placeholders.repeatPassword")}
                checkboxLabel={t("login.checkboxLabel")}
              />

              <Button
                className="w-full mt-2 btn-primary"
                type="submit"
                isLoading={isLoading}
              >
                {t("register.submit")}
              </Button>

              {error && (
                <p className="text-error text-sm mt-2 text-center">{error}</p>
              )}
            </form>

            <div className="mt-6 text-center text-sm opacity-70">
              <p>
                {t("register.alreadyHaveAccount")}{" "}
                <Link to={PATHS.LOGIN} className="link link-primary">
                  {t("register.loginHere")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}