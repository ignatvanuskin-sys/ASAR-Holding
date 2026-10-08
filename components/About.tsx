import Image from 'next/image';
import Link from 'next/link';
import Reveal, { ImageReveal } from './Reveal';
import SectionHeading from './SectionHeading';
import { site } from '@/lib/site';

const facts = [
  { label: 'Год начала работы', value: '2015' },
  { label: 'Город', value: 'Кокшетау' },
  { label: 'Основное направление', value: 'Строительство жилых зданий' },
  { label: 'Формат работы', value: 'Полный цикл — от идеи до объекта' },
];

export default function About({ showLink = true }: { showLink?: boolean }) {
  return (
    <section id="about" className="scroll-mt-24 bg-stone py-20 md:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          align="split"
          eyebrow="О компании"
          title={
            <>
              Создаём объекты,
              <br className="hidden sm:block" /> которые остаются надолго.
            </>
          }
          intro={
            <p>
              ASAR HOLDING — строительная компания из Кокшетау. Работаем с {site.since} года и
              занимаемся строительством жилых зданий: от проектирования и строительно-монтажных
              работ до реализации готовых квартир, помещений и парковочных мест.
            </p>
          }
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="body-text">
                Мы ведём объект полным циклом — «от идеи до готового объекта». Проектируем, строим
                и реализуем: за проект, стройку и результат отвечает один подрядчик, а не цепочка
                посредников. Такой подход компания называет своей формулой работы.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="body-text mt-5">
                Помимо жилья компания проектирует и возводит коммерческие объекты, выполняет дизайн
                и ремонт, обеспечивает юридическое сопровождение сделки и поставляет строительные
                материалы.
              </p>
            </Reveal>
            {showLink && (
              <Reveal delay={0.12}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/about" className="btn btn-ghost-dark w-full sm:w-auto">
                    Подробнее о компании
                  </Link>
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <dl className="divide-y divide-ink/10 border-y border-ink/10">
              {facts.map((f, i) => (
                <Reveal key={f.label} delay={0.08 + i * 0.05} as="div">
                  <div className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="label text-ink/45">{f.label}</dt>
                    <dd className="text-right text-[0.9375rem] font-medium tracking-[-0.01em] text-ink">
                      {f.value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        {/* Визуальный блок: офис компании и входная группа объекта */}
        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-12 md:gap-5">
          <ImageReveal className="md:col-span-8">
            <figure className="relative aspect-[16/11] w-full overflow-hidden md:aspect-[16/10]">
              <Image
                src="/images/office-facade.jpg"
                alt="Фасад здания с вывеской ASAR HOLDING в Кокшетау: кирпич и витражное остекление"
                fill
                loading="lazy"
                sizes="(max-width: 767px) 100vw, 62vw"
                className="object-cover"
              />
            </figure>
          </ImageReveal>

          <div className="flex flex-col gap-4 md:col-span-4 md:gap-5">
            <ImageReveal delay={0.1}>
              <figure className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/images/lobby-interior.jpg"
                  alt="Дизайнерская входная группа ЖК ASAR PREMIUM: бирюзовая панель с надписью, мрамор и латунь"
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 100vw, 32vw"
                  className="object-cover"
                />
              </figure>
            </ImageReveal>
            <Reveal delay={0.16}>
              <figcaption className="text-[0.8125rem] leading-relaxed text-ink/50">
                Входная группа ЖК ASAR PREMIUM — общественные зоны с дизайнерской отделкой.
              </figcaption>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
