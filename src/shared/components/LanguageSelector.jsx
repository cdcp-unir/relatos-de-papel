import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

import spanish from "../../assets/svg/spanish.svg";
import english from "../../assets/svg/english.svg";

export default function LanguageSelector() {
  const { t } = useTranslation("common");
  const currentLang = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost gap-2">
        <img
          src={currentLang === "es" ? spanish : english}
          alt={currentLang === "es" ? t("spanish") : t("english")}
          className="w-6 h-6"
        />
        <span className="hidden sm:inline">
          {currentLang === "es" ? t("spanish") : t("english")}
        </span>
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
      >
        <li>
          <button type="button" onClick={() => changeLanguage("es")}>
            {t("spanish")}
          </button>
        </li>
        <li>
          <button type="button" onClick={() => changeLanguage("en")}>
            {t("english")}
          </button>
        </li>
      </ul>
    </div>
  );
}