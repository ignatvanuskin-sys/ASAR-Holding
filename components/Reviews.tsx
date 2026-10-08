import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { contact } from '@/lib/site';

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-ink py-20 text-white md:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          align="split"
          tone="light"
          eyebrow="Репутация"
          title="Отзывы, которым можно проверить источник"
          intro={
            <p>
              Мы не публикуем отзывы, которых не существует, и не придумываем оценки. Ниже — то,
              что открыто в 2ГИС на момент публикации сайта.
            </p>
          }
        />

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="flex items-end gap-6">
              <span className="font-serif text-[clamp(3.75rem,10vw,6.5rem)] leading-[0.8] tracking-[-0.03em] text-white">
                {contact.rating.value}
              </span>
              <div className="pb-2">
                <p className="text-[0.9375rem] font-medium text-white/85">из 5</p>
                <p className="mt-1 text-[0.8125rem] text-white/50">
                  {contact.rating.count} оценок в 2ГИС
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t border-white/12 pt-7">
              <p className="text-[0.9375rem] leading-relaxed text-white/70">
                Пользователи 2ГИС поставили компании{' '}
                <span className="text-white">{contact.rating.value} из 5</span> по{' '}
                {contact.rating.count} оценкам. Карточки компании ведёт сама компания — проверить
                данные можно в приложении или на сайте 2ГИС.
              </p>
              <p className="text-[0.9375rem] leading-relaxed text-white/70">
                Текстовых отзывов с подтверждённым посещением на момент публикации нет. Поэтому
                раздела с отзывами клиентов на сайте не будет — вместо него мы даём прямые ссылки
                на первоисточник.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-white/12 border-y border-white/12">
              <li>
                <a
                  href={contact.twoGisMain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-white"
                >
                  <span>
                    <span className="block text-[1.0625rem] font-medium text-white/90">
                      ЖК ASAR — карточка в 2ГИС
                    </span>
                    <span className="mt-1 block text-[0.8125rem] text-white/50">
                      пр. Нурсултана Назарбаева, 96
                    </span>
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="shrink-0 text-white/45 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden="true"
                  >
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={contact.twoGisTownhouse}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-white"
                >
                  <span>
                    <span className="block text-[1.0625rem] font-medium text-white/90">
                      Таунхаус на Ашимова, 38 — карточка в 2ГИС
                    </span>
                    <span className="mt-1 block text-[0.8125rem] text-white/50">
                      ул. Байкена Ашимова, 38 · дом сдан
                    </span>
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="shrink-0 text-white/45 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden="true"
                  >
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-white"
                >
                  <span>
                    <span className="block text-[1.0625rem] font-medium text-white/90">
                      Instagram {contact.instagramHandle}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] text-white/50">
                      Публикации компании: ход строительства и объекты
                    </span>
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="shrink-0 text-white/45 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden="true"
                  >
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
