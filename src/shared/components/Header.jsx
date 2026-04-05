import { Link, useNavigate } from "react-router-dom";

import { Button } from "./Button";
import LanguageSelector from "./LanguageSelector";
import { PATHS } from "../../app/router/paths";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  return (
    <div className="sticky top-0 z-50 bg-base-100 border-b border-base-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            className="flex items-center gap-2 cursor-pointer"
            to={PATHS.LANDING}
          >
            <span className="text-xl font-bold tracking-tight">
              <span className="text-base-content">{t("brandPart1")}</span>
              <span className="text-primary">{t("brandPart2")}</span>
            </span>
          </Link>

          <div className="flex-none flex items-center gap-4">
            <LanguageSelector />

            <Button
              className="btn btn-accent"
              onClick={() => navigate(PATHS.LOGIN)}
            >
              {t("login")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};