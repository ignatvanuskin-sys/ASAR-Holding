import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import About from '@/components/About';
import Directions from '@/components/Directions';
import Trust from '@/components/Trust';
import Process from '@/components/Process';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import { contact, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'О компании',
  description:
    'ASAR HOLDING — строительная компания из Кокшетау. Работаем с 2015 года: строительство жилых зданий, коммерческих объектов, проектирование, дизайн, ремонт, юридическое сопровождение.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    title: 'О компании ASAR HOLDING — строительная компания в Кокшетау',
    description:
      'Строительная компания из Кокшетау с 2015 года. Полный цикл: проектируем, строим, реализуем.',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Строительная компания · ${site.city} · с ${site.since} года`}
        title="Компания, которая строит в Кокшетау с 2015 года"
        intro={
          <p>
            ASAR HOLDING занимается строительством жилых зданий и коммерческих объектов. Мы ведём
            проект полным циклом: от идеи и рабочей документации до готового объекта и сделки.
          </p>
        }
        image="/images/office-facade.jpg"
        imageAlt="Фасад здания с вывеской ASAR HOLDING в Кокшетау"
        meta={[
          { label: 'Год начала работы', value: '2015' },
          { label: 'Город', value: site.city },
          { label: 'Направление', value: 'Строительство жилых зданий' },
          { label: 'Оценка в 2ГИС', value: `${contact.rating.value} из 5` },
        ]}
      />

      <About showLink={false} />
      <Directions />
      <Trust />
      <Process />
      <CTA />
      <Contact compact />
    </>
  );
}
