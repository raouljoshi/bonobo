import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { buildLabsEmailLink, VALD_MEDIA, VALD_SOURCES } from '../utils/labs';

const SourceLink = ({ href, children, light = false }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`font-semibold underline underline-offset-4 ${
      light
        ? 'text-white decoration-white/40 hover:decoration-white'
        : 'text-gray-900 decoration-gray-300 hover:decoration-gray-900'
    }`}
  >
    {children}
  </a>
);

const SegmentVideo = ({ segment, media }) => {
  const embedUrl = VALD_MEDIA.segmentVideos[segment.id];
  const sourceUrl = VALD_MEDIA.segmentSources[segment.id] || VALD_SOURCES.humantrak;

  return (
    <div className="overflow-hidden rounded-lg bg-gray-950 shadow-xl">
      <div className="aspect-video">
        <iframe
          title={segment.media_title}
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="h-full w-full"
        />
      </div>
      <div className="p-4 text-sm text-gray-300">
        {segment.media_caption}{' '}
        <SourceLink href={sourceUrl} light>
          {media.video_fallback}
        </SourceLink>
      </div>
    </div>
  );
};

const OfferCard = ({ offer, segment, email }) => (
  <article className="flex flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">{offer.duration}</p>
    <h3 className="mt-2 text-xl font-bold text-gray-900">{offer.title}</h3>
    <p className="mt-3 text-lg font-bold text-gray-900">{offer.price || offer.price_note}</p>
    <p className="mt-3 text-gray-600">{offer.description}</p>
    <ul className="mt-5 space-y-2 text-sm text-gray-600">
      {offer.includes.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="text-gray-900">+</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <a
      href={buildLabsEmailLink(offer.title, email.subject_prefix, segment.email_context)}
      className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-center font-semibold text-white hover:bg-gray-700"
    >
      {offer.button || segment.button}
    </a>
  </article>
);

const Labs = () => {
  const { t } = useTranslation();
  const labs = t('labs_page', { returnObjects: true });

  useEffect(() => {
    if (!window.location.hash) return;

    window.requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    });
  }, []);

  if (!labs || !labs.hero || !Array.isArray(labs.segments)) {
    return null;
  }

  const primaryOffer = labs.segments[0]?.offers?.[1] || labs.segments[0]?.offers?.[0];

  return (
    <div className="bg-white">
      <SEO title={t('seo.labs.title')} description={t('seo.labs.description')} />

      <section className="bg-gray-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-300">{labs.hero.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{labs.hero.title}</h1>
            <p className="mt-5 max-w-2xl text-xl text-gray-300">{labs.hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#individuals"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 py-3 font-semibold text-gray-950 hover:bg-gray-200"
              >
                {labs.hero.primary_cta}
              </a>
              <a
                href="#teams-clubs"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                {labs.hero.secondary_cta}
              </a>
            </div>
          </div>
          <figure className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-2xl">
            <img
              src={VALD_MEDIA.heroImage}
              alt={labs.hero.image_alt}
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
            <figcaption className="px-4 py-3 text-xs text-gray-400">{labs.media.credit}</figcaption>
          </figure>
        </div>
      </section>

      <nav className="border-b border-gray-200 bg-white" aria-label={labs.segment_nav.label}>
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {labs.segments.map((segment) => (
            <a
              key={segment.id}
              href={`#${segment.id}`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:border-gray-900 hover:bg-gray-50"
            >
              {segment.nav_label}
            </a>
          ))}
        </div>
      </nav>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">{labs.measure.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">{labs.measure.title}</h2>
              <p className="mt-4 text-lg text-gray-600">{labs.measure.description}</p>
              <p className="mt-4 text-sm text-gray-500">
                {labs.measure.source_intro}{' '}
                <SourceLink href={VALD_SOURCES.humantrak}>{labs.measure.source_product}</SourceLink>,{' '}
                <SourceLink href={VALD_SOURCES.testTypes}>{labs.measure.source_tests}</SourceLink>.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {labs.measure.items.map((item) => (
                <div key={item.title} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">{labs.process.title}</h2>
            <p className="mt-4 text-lg text-gray-600">{labs.process.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {labs.process.steps.map((step, index) => (
              <div key={step.title} className="rounded-lg bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 font-bold text-white">{index + 1}</div>
                <h3 className="mt-4 font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">{labs.segments_intro.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">{labs.segments_intro.title}</h2>
            <p className="mt-4 text-lg text-gray-600">{labs.segments_intro.description}</p>
          </div>

          <div className="mt-12 space-y-14">
            {labs.segments.map((segment) => (
              <section key={segment.id} id={segment.id} className="scroll-mt-28">
                <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">{segment.eyebrow}</p>
                    <h3 className="mt-3 text-3xl font-extrabold text-gray-900">{segment.title}</h3>
                    <p className="mt-4 text-lg text-gray-600">{segment.description}</p>
                    <ul className="mt-6 grid gap-3">
                      {segment.highlights.map((highlight) => (
                        <li key={highlight} className="rounded-md bg-gray-50 p-3 text-sm font-medium text-gray-700">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <SegmentVideo segment={segment} media={labs.media} />
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-3">
                  {segment.offers.map((offer) => (
                    <OfferCard key={offer.title} offer={offer} segment={segment} email={labs.email} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="rounded-lg bg-gray-900 p-8 text-white">
            <h2 className="text-3xl font-extrabold">{labs.boundary.title}</h2>
            <p className="mt-4 text-gray-300">{labs.boundary.description}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {labs.boundary.items.map((item) => (
                <li key={item} className="rounded-md bg-white/10 p-3 text-sm text-gray-100">{item}</li>
              ))}
            </ul>
          </div>
          <figure className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <img src={VALD_MEDIA.contextImage} alt={labs.boundary.image_alt} loading="lazy" className="h-full w-full object-cover" />
            <figcaption className="px-4 py-3 text-xs text-gray-500">
              {labs.media.credit} <SourceLink href={VALD_SOURCES.reliability}>{labs.boundary.reliability_link}</SourceLink>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-gray-900">{labs.references.title}</h2>
            <p className="mt-2 text-gray-600">{labs.references.description}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              {[
                VALD_SOURCES.humantrak,
                VALD_SOURCES.markerless,
                VALD_SOURCES.testTypes,
                VALD_SOURCES.measures,
                VALD_SOURCES.reliability,
                VALD_SOURCES.individualsVideo,
                VALD_SOURCES.teamsVideo,
                VALD_SOURCES.enterprisesVideo,
              ].map((href, index) => (
                <SourceLink key={href} href={href}>{labs.references.links[index]}</SourceLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{labs.final_cta.title}</h2>
          <p className="mt-4 text-lg text-gray-300">{labs.final_cta.description}</p>
          <a
            href={buildLabsEmailLink(primaryOffer?.title || labs.final_cta.button, labs.email.subject_prefix, labs.final_cta.email_context)}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 py-3 font-semibold text-gray-950 hover:bg-gray-200"
          >
            {labs.final_cta.button}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Labs;
