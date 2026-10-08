import Image from 'next/image';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { additionalServices, directions } from '@/lib/site';

export default function Directions() {
  return (
    <section id="directions" className="scroll-mt-24 bg-ink py-20 text-white md:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          align="split"
          tone="light"
          eyebrow="Направления"
          title="Что делает компания"
          intro={
            <p>
              Четыре направления, из которых состоит работа ASAR HOLDING. Всё, что нужно для
              реализации жилого или коммерческого объекта, — внутри одной компании.
            </p>
          }
        />

        <ul className="mt-12 border-t border-white/12 md:mt-16">
          {directions.map((d, i) => (
            <Reveal key={d.index} as="li" delay={i * 0.05}>
              <div className="group relative border-b border-white/12">
                <div className="grid items-center gap-5 py-6 md:grid-cols-12 md:gap-8 md:py-7">
                  <div className="flex items-baseline gap-4 md:col-span-1">
                    <span className="font-serif text-[1.125rem] text-white/40">{d.index}</span>
                  </div>

                  <div className="md:col-span-5">
                    <h3 className="h-card text-white">{d.title}</h3>
                  </div>

                  <div className="md:col-span-3">
                    <p className="text-[0.9375rem] leading-relaxed text-white/62">{d.text}</p>
                  </div>

                  <div className="md:col-span-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/9]">
                      <Image
                        src={d.image}
                        alt={d.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 767px) 100vw, 24vw"
                        className="zoom-img object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100"
                      />
                      <span
                        className="pointer-events-none absolute inset-0 bg-ink/25 transition-opacity duration-700 group-hover:opacity-0"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 md:mt-12">
            <span className="label text-white/40">Дополнительно</span>
            {additionalServices.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/18 px-3.5 py-1.5 text-[0.8125rem] text-white/75"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
