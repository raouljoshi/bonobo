import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VALD_MEDIA } from '../../utils/labs';

const LabsTeaser = () => {
  const { t } = useTranslation();
  const labs = t('labs_teaser', { returnObjects: true });

  return (
    <section className="bg-gray-950 py-16 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-300">{labs.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{labs.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">{labs.description}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {labs.proof_points.map((point) => (
              <div key={point.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm text-gray-300">{point.description}</p>
              </div>
            ))}
          </div>
          <Link
            to="/labs"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 py-3 font-semibold text-gray-950 hover:bg-gray-200"
          >
            {labs.button}
          </Link>
        </div>
        <figure className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
          <img
            src={VALD_MEDIA.productImage}
            alt={labs.image_alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <figcaption className="px-4 py-3 text-xs text-gray-400">{labs.media_credit}</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default LabsTeaser;
