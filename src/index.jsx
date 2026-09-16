import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import './index.css';
import App from './App';
import i18n from './i18n';
import { ManaProvider } from './data/ManaProvider';

const bootstrapElement = document.getElementById('site-bootstrap');
const bootstrap = bootstrapElement ? JSON.parse(bootstrapElement.textContent) : null;
const root = document.getElementById('root');
const preferredLanguage = i18n.language;

async function start() {
  if (!i18n.isInitialized) await new Promise(resolve => i18n.on('initialized', resolve));
  const detectedLanguage = preferredLanguage || i18n.language;
  if (bootstrap) {
    i18n.addResourceBundle('en', 'translation', bootstrap.translations, true, true);
    await i18n.changeLanguage('en');
  }
  const app = <React.StrictMode><React.Suspense fallback="Loading…"><I18nextProvider i18n={i18n}><HydratedApp language={bootstrap ? detectedLanguage : null}><ManaProvider initialData={bootstrap?.initialData}><App /></ManaProvider></HydratedApp></I18nextProvider></React.Suspense></React.StrictMode>;
  if (bootstrap) {
    // Restore the visitor's language only after hydration of the English HTML.
    hydrateRoot(root, app);
  } else createRoot(root).render(app);
}
function HydratedApp({ language, children }) {
  React.useEffect(() => { if (language) i18n.changeLanguage(language); }, [language]);
  return children;
}
start();
