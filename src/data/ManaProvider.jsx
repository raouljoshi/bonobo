import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchManaResource } from './mana';

const ManaContext = createContext({});
export function ManaProvider({ initialData = {}, children }) {
  return <ManaContext.Provider value={initialData}>{children}</ManaContext.Provider>;
}

export function useManaResource(resource) {
  const initialData = useContext(ManaContext);
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'en';
  const initial = initialData[locale]?.[resource];
  const [state, setState] = useState({ data: initial?.data ?? null, status: initial ? 'ready' : 'loading', locale });
  useEffect(() => {
    let active = true;
    let inFlight = false;
    // Do not keep old build-time prices or a previous language visible on failure.
    setState({ data: initial && Date.now() - initial.fetchedAt < 120000 ? initial.data : null, status: 'loading', locale });
    const refresh = async () => {
      if (inFlight) return;
      inFlight = true;
      try {
        const data = await fetchManaResource(resource, locale);
        if (active) setState({ data, status: 'ready', locale });
      } catch {
        if (active) setState({ data: null, status: 'error', locale });
      } finally { inFlight = false; }
    };
    refresh();
    const timer = window.setInterval(() => { if (!document.hidden) refresh(); }, 60000);
    window.addEventListener('focus', refresh);
    return () => { active = false; window.clearInterval(timer); window.removeEventListener('focus', refresh); };
  }, [resource, locale, initial]);
  return state.locale === locale ? state : { data: null, status: 'loading' };
}
