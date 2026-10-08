import Image from 'next/image';
import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Meta = { label: string; value: string };

/**
 * Верхний блок внутренних страниц.
 *
 * variant="overlay" — фотография во всю ширину под затемнением.
 *   Используется там, где снимок достаточно крупный (от ~1080 px).
 * variant="split"   — фотография в отдельной колонке без растягивания.
 *   Используется для объектов, где исходники меньше ширины экрана: так
 *   изображение остаётся резким, а не растянутым.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  meta,
  children,
  variant = 'overlay',
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  meta?: Meta[];
  children?: ReactNode;
  variant?: 'overlay' | 'split';
}) {
  const metaRow =
    meta && meta.length > 0 ? (
      <Reveal delay={0.18}>
        <dl className="mt-11 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/14 pt-7 sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="label text-white/45">{m.label}</dt>
              <dd className="mt-1.5 text-[0.9375rem] font-medium text-white/90">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    ) : null;

  const textBlock = (
    <>
      <Reveal>
        <p className="eyebrow text-white/62">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-5 max-w-[24ch] text-[clamp(2.125rem,6.4vw,4.75rem)] font-semibold leading-[0.99] tracking-[-0.035em]">
          {title}
        </h1>
      </Reveal>
      {intro ? (
        <Reveal delay={0.12}>
          <div className="lead mt-6 max-w-[44rem] text-white/74">{intro}</div>
        </Reveal>
      ) : null}
      {children}
      {metaRow}
    </>
  );

  if (variant === 'split') {
    return (
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
          {image ? (
            <>
              <Image
                src={image}
                alt={imageAlt ?? ''}
                fill
                priority
                sizes="42vw"
                className="object-cover object-[50%_40%]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-ink via-ink/25 to-ink/10"
                aria-hidden="true"
              />
            </>
          ) : null}
        </div>

        <div className="shell relative z-10">
          <div className="max-w-[min(100%,44rem)] pb-14 pt-32 md:pb-20 md:pt-44 lg:pb-28 lg:pt-48">
            {textBlock}
          </div>
        </div>

        {image ? (
          <div className="relative w-full lg:hidden">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image
                src={image}
                alt={imageAlt ?? ''}
                fill
                priority
                sizes="100vw"
                className="object-cover object-[50%_42%]"
              />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" aria-hidden="true" />
            </div>
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-ink pb-14 pt-32 text-white md:pb-20 md:pt-44 lg:pb-24 lg:pt-52">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ''}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_45%]"
          />
          <div className="absolute inset-0 bg-ink/58" aria-hidden="true" />
          <div className="absolute inset-0 scrim" aria-hidden="true" />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_80%_0%,rgba(47,124,105,0.22),transparent_60%)]"
          aria-hidden="true"
        />
      )}

      <div className="shell relative z-10">{textBlock}</div>
    </section>
  );
}
