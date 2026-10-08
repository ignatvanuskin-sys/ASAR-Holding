import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Reveal, { ImageReveal } from '@/components/Reveal';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import { StatusBadge } from '@/components/ProjectCard';
import { contact, projects, site } from '@/lib/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Проект не найден' };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      url: `/projects/${project.slug}`,
      title: `${project.title} — ASAR HOLDING`,
      description: project.summary,
      images: [{ url: project.cover, width: 1200, height: 900, alt: project.coverAlt }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={project.category}
        title={project.title}
        intro={<p>{project.summary}</p>}
        image={project.cover}
        imageAlt={project.coverAlt}
        meta={project.specs.slice(0, 4).map((s) => ({ label: s.label, value: s.value }))}
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <StatusBadge status={project.status} />
          {project.statusNote ? (
            <span className="text-[0.8125rem] text-white/60">{project.statusNote}</span>
          ) : null}
        </div>
      </PageHero>

      <section className="bg-stone py-16 md:py-24 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-brand">О проекте</p>
              </Reveal>
              <div className="mt-6 space-y-5">
                {project.description.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className="body-text">{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              {project.source ? (
                <Reveal delay={0.15}>
                  <p className="mt-8 text-[0.8125rem] text-ink/50">
                    Источник данных:{' '}
                    <a
                      href={project.source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 transition-colors hover:text-brand"
                    >
                      {project.source.label}
                    </a>
                  </p>
                </Reveal>
              ) : null}
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal>
                <h2 className="label text-ink/45">Характеристики</h2>
              </Reveal>
              <dl className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
                {project.specs.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.04} as="div">
                    <div className="flex items-baseline justify-between gap-6 py-3.5">
                      <dt className="text-[0.875rem] text-ink/55">{s.label}</dt>
                      <dd className="text-right text-[0.9375rem] font-medium tracking-[-0.01em] text-ink">
                        {s.value}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <Reveal delay={0.12}>
                <h2 className="label mt-9 text-ink/45">Особенности</h2>
                <ul className="mt-5 space-y-3">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink/72">
                      <span
                        className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9 flex flex-col gap-3">
                  <a href={contact.phone.href} className="btn btn-primary w-full">
                    Позвонить: {contact.phone.display}
                  </a>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost-dark w-full"
                  >
                    Запросить в WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {project.gallery.length > 1 && (
        <section aria-label="Галерея объекта" className="bg-stone-2 py-16 md:py-24">
          <div className="shell">
            <Reveal>
              <h2 className="h-section max-w-[20ch]">Галерея объекта</h2>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
              {project.gallery.map((img, i) => (
                <ImageReveal
                  key={img.src}
                  delay={(i % 2) * 0.08}
                  className={i === 0 ? 'md:col-span-2' : ''}
                >
                  <figure className="relative w-full overflow-hidden">
                    <div
                      className={`relative w-full ${
                        i === 0 ? 'aspect-[16/10] lg:aspect-[21/9]' : 'aspect-[4/3]'
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        loading="lazy"
                        sizes={i === 0 ? '100vw' : '(max-width: 767px) 100vw, 50vw'}
                        className="object-cover"
                      />
                    </div>
                    {img.caption ? (
                      <figcaption className="mt-3 text-[0.8125rem] text-ink/50">
                        {img.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </ImageReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Переход между проектами */}
      <section className="bg-stone py-12 md:py-16">
        <div className="shell">
          <div className="grid gap-4 border-t border-ink/12 pt-8 sm:grid-cols-2 sm:gap-8">
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center justify-between gap-4 py-2"
            >
              <span>
                <span className="label block text-ink/40">Предыдущий объект</span>
                <span className="mt-1.5 block text-[1.0625rem] font-medium tracking-[-0.015em] text-ink">
                  {prev.title}
                </span>
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="shrink-0 text-ink/40 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-ink"
                aria-hidden="true"
              >
                <path d="M19 12H6M11 18l-6-6 6-6" />
              </svg>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-between gap-4 py-2 sm:flex-row-reverse sm:text-right"
            >
              <span>
                <span className="label block text-ink/40">Следующий объект</span>
                <span className="mt-1.5 block text-[1.0625rem] font-medium tracking-[-0.015em] text-ink">
                  {next.title}
                </span>
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="shrink-0 text-ink/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink"
                aria-hidden="true"
              >
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <p className="mt-8 text-center text-[0.8125rem] text-ink/45">
            Все объекты — в{' '}
            <Link href="/projects" className="underline underline-offset-2 hover:text-brand">
              разделе «Проекты»
            </Link>
            . Объекты компании в {site.city} можно посмотреть на месте.
          </p>
        </div>
      </section>

      <CTA
        title="Интересует этот объект?"
        text="Уточним наличие, планировки и условия. Позвоните или напишите в WhatsApp — ответим в рабочее время."
      />
      <Contact compact />
    </>
  );
}
