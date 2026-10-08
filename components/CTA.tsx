import Link from 'next/link';
import Reveal from './Reveal';
import { contact } from '@/lib/site';

export default function CTA({
  title = 'Давайте обсудим строительство.',
  text = 'Расскажите, что вы планируете построить или купить. Ответим по телефону, WhatsApp или в Instagram — как вам удобнее.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-brand py-16 text-white md:py-20 lg:py-24">
      <div className="shell">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <h2 className="h-section text-white">{title}</h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-[1rem] leading-relaxed text-white/80">{text}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contacts" className="btn btn-light w-full sm:w-auto">
                Связаться с компанией
              </Link>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-light w-full sm:w-auto"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
