import Link from 'next/link';
import Wordmark from './Wordmark';
import { contact, navigation, site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pt-16 text-white md:pt-20">
      <div className="shell">
        <div className="grid gap-12 pb-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link href="/" aria-label="ASAR HOLDING — на главную">
              <Wordmark tone="light" />
            </Link>
            <p className="mt-5 max-w-[26rem] font-serif text-[1.25rem] italic leading-snug text-white/80">
              {site.tagline}
            </p>
            <p className="mt-5 max-w-[26rem] text-[0.875rem] leading-relaxed text-white/50">
              {site.legalName}. Строительство жилых зданий, коммерческих объектов, проектирование,
              дизайн и ремонт. {site.city}, {site.country}. Работаем с {site.since} года.
            </p>
          </div>

          <nav aria-label="Навигация в подвале" className="md:col-span-3">
            <p className="label text-white/40">Разделы</p>
            <ul className="mt-5 space-y-3">
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-[0.9375rem] text-white/72 transition-colors hover:text-white"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="label text-white/40">Контакты</p>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a href={contact.phone.href} className="block text-white/85 transition-colors hover:text-white">
                  {contact.phone.display}
                </a>
                <span className="text-[0.8125rem] text-white/40">{contact.phone.label}</span>
              </li>
              <li>
                <a
                  href={contact.phoneMaterials.href}
                  className="block text-white/85 transition-colors hover:text-white"
                >
                  {contact.phoneMaterials.display}
                </a>
                <span className="text-[0.8125rem] text-white/40">{contact.phoneMaterials.label}</span>
              </li>
              <li>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/85 transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/85 transition-colors hover:text-white"
                >
                  Instagram {contact.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={contact.twoGisMain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/85 transition-colors hover:text-white"
                >
                  2ГИС — карточка компании
                </a>
              </li>
            </ul>
            <address className="mt-6 not-italic text-[0.8125rem] leading-relaxed text-white/45">
              {contact.officeFull}
              <br />
              {contact.hoursNote}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-7 text-[0.75rem] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. Все права защищены.
          </p>
          <p className="max-w-[46rem] leading-relaxed">
            Информация об объектах, адресах и контактах приведена по данным открытых источников —
            2ГИС и официального профиля компании в Instagram — на момент публикации сайта. Не
            является публичной офертой.
          </p>
        </div>
      </div>
    </footer>
  );
}
