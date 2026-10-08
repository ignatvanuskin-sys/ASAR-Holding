import Image from 'next/image';
import Link from 'next/link';
import ProjectCard, { StatusBadge } from './ProjectCard';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { projects, type Project } from '@/lib/site';

/**
 * Флагманский объект — разделённый блок: фотография в своей колонке,
 * данные — в тёмной панели. Такая композиция, во-первых, даёт крупному
 * объекту отдельный вес, во-вторых, не растягивает снимок на всю ширину
 * экрана, поэтому он остаётся резким.
 */
function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="grid overflow-hidden bg-ink lg:grid-cols-12">
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block focus-visible:outline-none lg:col-span-7"
        aria-label={`${project.title} — открыть страницу проекта`}
      >
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/3] lg:h-full">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 58vw"
            className="zoom-img object-cover"
          />
          <span
            className="pointer-events-none absolute inset-0 border border-white/10 transition-colors duration-500 group-hover:border-white/25"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute bottom-4 left-4 hidden items-center gap-2 rounded-full bg-ink/65 px-4 py-2 text-[0.8125rem] font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 lg:inline-flex"
            aria-hidden="true"
          >
            Смотреть проект
          </span>
        </div>
      </Link>

      <div className="flex flex-col justify-between gap-8 p-6 text-white sm:p-8 lg:col-span-5 lg:p-10">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="label text-white/45">Флагманский объект</span>
          </div>

          <h3 className="mt-5 text-[clamp(1.5rem,2.9vw,2.375rem)] font-semibold leading-[1.04] tracking-[-0.032em]">
            {project.title}
          </h3>

          <p className="mt-4 flex items-start gap-2 text-[0.875rem] leading-snug text-white/60">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.6" />
            </svg>
            {project.location}
          </p>

          <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/70">{project.summary}</p>

          <dl className="mt-7 divide-y divide-white/12 border-y border-white/12">
            {project.specs.slice(0, 3).map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-5 py-3">
                <dt className="text-[0.8125rem] text-white/45">{s.label}</dt>
                <dd className="text-right text-[0.875rem] font-medium text-white/90">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Link href={`/projects/${project.slug}`} className="arrow-link text-white">
          Смотреть проект
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function Projects({ showAll = true }: { showAll?: boolean }) {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.slug !== featured.slug);

  return (
    <section id="projects" className="scroll-mt-24 bg-stone py-20 md:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          align="split"
          eyebrow="Проекты"
          title={
            <>
              Объекты, которые
              <br className="hidden sm:block" /> можно увидеть на месте
            </>
          }
          intro={
            <p>
              Жилой дом в центре Кокшетау, готовый таунхаус и объекты в работе. Каждая карточка —
              реальный объект компании с адресом и статусом.
            </p>
          }
        />

        <div className="mt-12 md:mt-16">
          <Reveal>
            <FeaturedProject project={featured} />
          </Reveal>
        </div>

        {rest.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-3 md:gap-5">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}

        {showAll && (
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center md:mt-12">
              <Link href="/projects" className="btn btn-ghost-dark w-full sm:w-auto">
                Все проекты
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
