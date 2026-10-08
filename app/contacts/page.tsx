import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Contact from '@/components/Contact';
import Reveal from '@/components/Reveal';
import { contact, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Контакты ASAR HOLDING в Кокшетау: телефон +7 775 110 66 66, WhatsApp, Instagram, офис продаж на улице Магзи Абулкасымова, 164. Карточки компании в 2ГИС.',
  alternates: { canonical: '/contacts' },
  openGraph: {
    url: '/contacts',
    title: 'Контакты ASAR HOLDING — Кокшетау',
    description:
      'Телефон, WhatsApp, Instagram и офис продаж ASAR HOLDING. Кокшетау, улица Магзи Абулкасымова, 164.',
  },
};

const places = [
  {
    title: 'ЖК ASAR PREMIUM',
    sub: 'Жилой дом · строится',
    address: 'проспект Нурсултана Назарбаева, 96',
    href: contact.twoGisMain,
  },
  {
    title: 'Таунхаус на Ашимова',
    sub: 'Жилая недвижимость · дом сдан',
    address: 'улица Байкена Ашимова, 38',
    href: contact.twoGisTownhouse,
  },
  {
    title: 'Офис продаж',
    sub: 'Приём обращений',
    address: contact.office,
    href: contact.twoGisBranches,
  },
];

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow={`Контакты · ${site.city}`}
        title="Свяжитесь с ASAR HOLDING"
        intro={
          <p>
            Ответим по телефону, в WhatsApp или Instagram. Офис продаж находится в Кокшетау —
            можно приехать и обсудить проект лично.
          </p>
        }
        image="/images/office-opening.jpg"
        imageAlt="Вход в офис ASAR HOLDING в Кокшетау с вывеской компании"
        meta={[
          { label: 'Телефон', value: contact.phone.display },
          { label: 'WhatsApp', value: 'Написать' },
          { label: 'Instagram', value: contact.instagramHandle },
          { label: 'Город', value: site.city },
        ]}
      />

      <section className="bg-stone-2 py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-brand">Адреса компании</p>
            <h2 className="h-section mt-4 max-w-[24ch]">Где нас найти</h2>
          </Reveal>

          <ul className="mt-10 grid gap-px border-t border-ink/12 md:grid-cols-3">
            {places.map((p, i) => (
              <Reveal key={p.title} as="li" delay={i * 0.06}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between gap-6 border-b border-ink/12 py-7 md:pr-8 transition-colors"
                >
                  <div>
                    <span className="label text-ink/40">{p.sub}</span>
                    <span className="mt-3 block text-[1.125rem] font-semibold tracking-[-0.02em] text-ink">
                      {p.title}
                    </span>
                    <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ink/60">
                      {p.address}
                    </span>
                  </div>
                  <span className="arrow-link text-brand">
                    Открыть в 2ГИС
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
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Contact />
    </>
  );
}
