import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { processSteps } from '@/lib/site';

export default function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-ink py-20 text-white md:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          align="split"
          tone="light"
          eyebrow="Как мы работаем"
          title={
            <>
              Проектируем.
              <br className="hidden sm:block" /> Строим. Реализуем.
            </>
          }
          intro={
            <p>
              Формулировка самой компании: «От идеи до готового объекта. Проектируем. Строим.
              Реализуем». Так выглядит путь объекта — от проекта до передачи ключей.
            </p>
          }
        />

        <ol className="mt-12 grid gap-px md:mt-16 md:grid-cols-3">
          {processSteps.map((s, i) => (
            <Reveal key={s.index} as="li" delay={i * 0.08}>
              <div className="relative h-full border-t border-white/15 pt-7 md:pr-10">
                <span
                  className="absolute left-0 top-0 h-px w-12 bg-brand-soft"
                  aria-hidden="true"
                />
                <span className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-none tracking-[-0.02em] text-white/20">
                  {s.index}
                </span>
                <h3 className="mt-5 text-[1.25rem] font-semibold tracking-[-0.02em] text-white">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[26rem] text-[0.9375rem] leading-relaxed text-white/62">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-[44rem] border-t border-white/12 pt-6 text-[0.875rem] leading-relaxed text-white/45 md:mt-16">
            Компания гарантирует качество, соблюдение сроков и прозрачность на каждом этапе — это
            публично заявленный принцип работы. Дополнительно мы сопровождаем сделку юридически.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
