import Image from 'next/image';
import LeadForm from './LeadForm';
import Reveal, { ImageReveal } from './Reveal';
import SectionHeading from './SectionHeading';
import { contact } from '@/lib/site';

const rows = [
  {
    label: 'Телефон · квартиры и объекты',
    value: contact.phone.display,
    href: contact.phone.href,
  },
  {
    label: 'Телефон · строительные материалы',
    value: contact.phoneMaterials.display,
    href: contact.phoneMaterials.href,
  },
  {
    label: 'WhatsApp',
    value: 'Написать в WhatsApp',
    href: contact.whatsapp,
    external: true,
  },
  {
    label: 'Instagram',
    value: contact.instagramHandle,
    href: contact.instagram,
    external: true,
  },
  {
    label: 'Офис продаж',
    value: contact.office,
    href: contact.twoGisBranches,
    external: true,
  },
  {
    label: 'Часы работы',
    value: contact.hoursNote,
  },
];

export default function Contact({ compact = false }: { compact?: boolean }) {
  return (
    <section id="contacts" className="scroll-mt-24 bg-stone py-20 md:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          align="split"
          eyebrow="Контакты"
          title="Обсудим ваш проект"
          intro={
            <p>
              Позвоните, напишите в WhatsApp или оставьте короткую заявку — перезвоним и ответим на
              вопросы по объектам, срокам и стоимости.
            </p>
          }
        />

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <dl className="divide-y divide-ink/10 border-y border-ink/10">
              {rows.map((r) => (
                <div key={r.label} className="py-4">
                  <dt className="label text-ink/45">{r.label}</dt>
                  <dd className="mt-1.5 text-[1rem] font-medium tracking-[-0.01em] text-ink">
                    {r.href ? (
                      <a
                        href={r.href}
                        {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="transition-colors hover:text-brand"
                      >
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={contact.twoGisMain}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-dark w-full sm:w-auto"
              >
                Открыть в 2ГИС
              </a>
              <a
                href={contact.route}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-dark w-full sm:w-auto"
              >
                Построить маршрут
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <LeadForm />
          </Reveal>
        </div>

        {!compact && (
          <div className="mt-14 md:mt-20">
            <ImageReveal>
              <figure className="relative overflow-hidden">
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
                  <Image
                    src="/images/office-opening.jpg"
                    alt="Вход в офис ASAR HOLDING в Кокшетау: вывеска компании на кирпичном фасаде"
                    fill
                    loading="lazy"
                    sizes="100vw"
                    className="object-cover object-[50%_38%]"
                  />
                  <div className="absolute inset-0 scrim" aria-hidden="true" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                    <p className="label text-white/55">Офис продаж</p>
                    <p className="mt-2 text-[clamp(1.125rem,2.2vw,1.75rem)] font-semibold tracking-[-0.02em] text-white">
                      {contact.officeFull}
                    </p>
                    <p className="mt-2 text-[0.875rem] text-white/65">{contact.hoursNote}</p>
                  </figcaption>
                </div>
              </figure>
            </ImageReveal>
          </div>
        )}
      </div>
    </section>
  );
}
