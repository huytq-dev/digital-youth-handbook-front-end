import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// import enTranslations from "./locales/en.json";
import viTranslations from "./locales/vi.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      //   en: {
      //     translation: enTranslations,
      //   },
      vi: {
        translation: viTranslations,
      },
    },
    fallbackLng: "vi",
    debug: false,
    // Return empty string instead of key if translation not found
    returnEmptyString: false,
    returnNull: false,
    // Return the key itself if translation not found (better for debugging)
    returnObjects: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
