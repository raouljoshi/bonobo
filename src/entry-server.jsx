import { Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Site } from './App';
import { ManaProvider } from './data/ManaProvider';
export { fetchManaResource } from './data/mana';

export async function render(url, translations, initialData) {
  const i18n = createInstance();
  await i18n.init({ lng: 'en', fallbackLng: 'en', resources: { en: { translation: translations } }, interpolation: { escapeValue: false } });
  return renderToString(
    <Suspense>
    <I18nextProvider i18n={i18n}>
      <ManaProvider initialData={initialData}>
        <MemoryRouter initialEntries={[url]}><Site /></MemoryRouter>
      </ManaProvider>
    </I18nextProvider>
    </Suspense>
  );
}
