import type { ReactNode } from 'react';
import Reveal from './Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'dark',
  align = 'left',
  className = '',
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: 'dark' | 'light';
  align?: 'left' | 'split';
  className?: string;
  id?: string;
}) {
  const eyebrowColor = tone === 'light' ? 'text-white/60' : 'text-brand';
  const titleColor = tone === 'light' ? 'text-white' : 'text-ink';
  const introColor = tone === 'light' ? 'text-white/70' : 'text-ink/70';

  if (align === 'split') {
    return (
      <div className={`grid gap-6 lg:grid-cols-12 lg:gap-14 ${className}`}>
        <div className="lg:col-span-6">
          <Reveal>
            <p className={`eyebrow ${eyebrowColor}`}>{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id={id} className={`h-section mt-4 md:mt-5 ${titleColor}`}>
              {title}
            </h2>
          </Reveal>
        </div>
        {intro ? (
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-2">
            <Reveal delay={0.12}>
              <div className={`lead ${introColor}`}>{intro}</div>
            </Reveal>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`max-w-[46rem] ${className}`}>
      <Reveal>
        <p className={`eyebrow ${eyebrowColor}`}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id={id} className={`h-section mt-4 md:mt-5 ${titleColor}`}>
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.12}>
          <div className={`lead mt-5 ${introColor}`}>{intro}</div>
        </Reveal>
      ) : null}
    </div>
  );
}
