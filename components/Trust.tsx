import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { trustPoints } from '@/lib/site';

export default function Trust() {
  return (
    <section id="trust" className="scroll-mt-24 bg-stone-2 py-20 md:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          align="split"
          eyebrow="Почему ASAR HOLDING"
          title="Факты вместо обещаний"
          intro={
            <p>
              Мы не пишем «качество» и «индивидуальный подход» — эти слова ничего не значат.
              Ниже только то, что можно проверить: год работы, город, направление и открытые
              контакты.
            </p>
          }
        />

        <div className="mt-12 md:mt-16">
          <ol className="grid gap-px border-t border-ink/12 md:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((t, i) => (
              <Reveal key={t.index} as="li" delay={i * 0.06}>
                <div className="relative h-full border-b border-ink/12 py-7 md:border-b-0 lg:border-b-0 lg:pr-8">
                  <span
                    className="absolute -top-px left-0 hidden h-px w-full bg-ink/0 lg:block"
                    aria-hidden="true"
                  />
                  <span className="font-serif text-[1.75rem] leading-none text-brand">
                    {t.index}
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">
                    {t.title}
                  </h3>
                  <p className="mt-2.5 max-w-[22rem] text-[0.9375rem] leading-relaxed text-ink/60">
                    {t.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
