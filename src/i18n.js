import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Use HTTP backend to load translation files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    supportedLngs: ['en', 'sv'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
    // Options for http backend
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    react: { useSuspense: true }, // Re-enable Suspense to handle async loading
  });

export default i18n;

i18n.on('languageChanged', language => {
  document.documentElement.lang = language.startsWith('sv') ? 'sv' : 'en';
});
