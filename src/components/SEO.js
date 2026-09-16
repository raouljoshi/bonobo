import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (title) document.title = title;
    const setMeta = (attribute, name, content) => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute(attribute, name); document.head.appendChild(meta); }
      meta.setAttribute('content', content);
    };
    if (description) setMeta('name', 'description', description);
    const url = `https://www.bonobogym.com${pathname}`;
    for (const prefix of ['og', 'twitter']) {
      if (title) setMeta('property', `${prefix}:title`, title);
      if (description) setMeta('property', `${prefix}:description`, description);
      setMeta('property', `${prefix}:url`, url);
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = url;
  }, [title, description, pathname]);
  return null;
};
export default SEO;
