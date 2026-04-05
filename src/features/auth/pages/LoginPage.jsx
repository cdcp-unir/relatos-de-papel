import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { InputPassword, InputText } from "../../../shared/components/InputText";
import { Button } from "../../../shared/components/Button";
import Footer from "../../../shared/components/Footer";
import { Header } from "../../../shared/components/Header";
import { login } from "../services/LoginService";
import { PATHS } from "../../../app/router/paths";

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      alert(t("login.validation.requiredFields"));
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      navigate(PATHS.HOME);
    } catch (error) {
      const errorKey = error.message;
      setError(t(`errors.${errorKey}`));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Header />

      <section className="flex flex-col items-center justify-center grow px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="text-2xl font-bold text-center mb-6">
              {t("login.title")}
            </h3>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <InputText
                label={t("login.email")}
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputPassword
                label={t("login.password")}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                checkboxLabel={t("login.checkboxLabel")}
              />

              <Button
                className="w-full mt-4 btn-primary"
                type="submit"
                isLoading={isLoading}
              >
                {t("login.submit")}
              </Button>

              {error && (
                <p className="text-error text-sm mt-2 text-center">{error}</p>
              )}
            </form>

            <div className="mt-6 text-center text-sm opacity-70">
              <p>
                {t("login.noAccount")}{" "}
                <Link to={PATHS.REGISTER} className="link link-primary">
                  {t("login.registerHere")}
                </Link>
              </p>

              <p className="mt-2">
                <Link
                  to={PATHS.FORGOT_PASSWORD}
                  className="link link-secondary"
                >
                  {t("login.forgotPassword")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
