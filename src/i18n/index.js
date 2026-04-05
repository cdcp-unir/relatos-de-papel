import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEs from "./locales/es/common.json";
import landingEs from "./locales/es/landing.json";
import authEs from "./locales/es/auth.json";

import commonEn from "./locales/en/common.json";
import landingEn from "./locales/en/landing.json";
import authEn from "./locales/en/auth.json";

const savedLanguage = localStorage.getItem("language");
const browserLanguage = navigator.language?.startsWith("es") ? "es" : "en";

i18n.use(initReactI18next).init({
  resources: {
    es: {
      common: commonEs,
      landing: landingEs,
      auth: authEs,
    },
    en: {
      common: commonEn,
      landing: landingEn,
      auth: authEn,
    },
  },
  lng: savedLanguage || browserLanguage,
  fallbackLng: "es",
  defaultNS: "common",
  ns: ["common", "landing", "auth"],
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  document.documentElement.lang = lng;
});

document.documentElement.lang = i18n.language;

export default i18n;