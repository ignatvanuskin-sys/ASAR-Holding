import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/site';

const statusStyles: Record<Project['status'], string> = {
  Строится: 'bg-brand text-white',
  Сдан: 'bg-white/85 text-ink',
  'Готов к продаже': 'bg-bronze text-white',
};

export function StatusBadge({ status }: { status: Project['status'] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

/** Карточка объекта для сетки: фотография, затемнение, данные поверх снимка. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="block h-full focus-visible:outline-none"
        aria-label={`${project.title} — открыть страницу проекта`}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            loading="lazy"
            sizes="(max-width: 767px) 100vw, 30vw"
            className="zoom-img object-cover"
          />

          <div className="scrim absolute inset-0 opacity-95" aria-hidden="true" />
          <div
            className="absolute inset-0 border border-white/10 transition-colors duration-500 group-hover:border-white/25"
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={project.status} />
              <span className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-white/70">
                {project.category}
              </span>
            </div>

            <h3 className="h-card text-white">{project.title}</h3>

            <p className="flex items-start gap-2 text-[0.8125rem] leading-snug text-white/72">
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

            <span className="arrow-link mt-1 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:opacity-100">
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
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
