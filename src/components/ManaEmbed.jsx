import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MANA_ORIGIN, MANA_STUDIO_URL } from '../utils/booking';

const heightMessages = {
  schedule: 'scheduleIframeHeight',
  memberships: 'membershipIframeHeight',
  credits: 'creditsIframeHeight',
};

export default function ManaEmbed({ type }) {
  const { t } = useTranslation();
  const frameRef = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    const timer = window.setTimeout(() => setStatus('slow'), 15000);
    // embed.js handles sizing. Only a message from this frame confirms readiness;
    // iframe onLoad also fires for blocked/error pages.
    const onMessage = (event) => {
      const height = event.data?.[heightMessages[type]];
      if (event.origin !== MANA_ORIGIN || event.source !== frameRef.current?.contentWindow ||
          typeof height !== 'number' || !Number.isFinite(height) || height <= 0) return;
      window.clearTimeout(timer);
      setStatus('ready');
    };
    window.addEventListener('message', onMessage);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('message', onMessage);
    };
  }, [type]);

  return (
    <div className="mana-embed">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
        <p>{t('mana.live')}</p>
        <a href={`${MANA_STUDIO_URL}/${type}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-gray-900 underline underline-offset-4">
          {t(`mana.open_${type}`)} <span className="sr-only">{t('mana.new_tab')}</span><span aria-hidden="true" className="ml-1">↗</span>
        </a>
      </div>
      {status !== 'ready' && (
        <p role="status" className="mb-4 rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
          {t(status === 'slow' ? 'mana.slow' : 'mana.loading')}
        </p>
      )}
      <iframe
        ref={frameRef}
        id={`mana-${type}`}
        title={t(`mana.title_${type}`)}
        src={`${MANA_STUDIO_URL}/embed/${type}`}
        className="block w-full rounded-xl border-0 bg-white"
        style={{ height: type === 'schedule' ? 800 : 600 }}
        onError={() => setStatus('slow')}
      />
    </div>
  );
}
