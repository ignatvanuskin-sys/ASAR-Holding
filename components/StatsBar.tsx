import Reveal from './Reveal';
import { stats } from '@/lib/site';

export default function StatsBar() {
  return (
    <section aria-label="Компания в цифрах" className="border-b border-ink/10 bg-stone">
      <div className="shell">
        <dl className="grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className="relative py-8 md:py-11"
            >
              <div
                className={
                  i % 2 === 1
                    ? 'md:border-l md:border-ink/10 md:pl-6'
                    : 'md:pr-6'
                }
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-none tracking-[-0.02em] text-ink">
                    {s.value}
                  </span>
                  <span className="mt-3 block max-w-[13rem] text-[0.8125rem] leading-snug text-ink/55">
                    {s.label}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
