import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Projects from '@/components/Projects';
import Gallery from '@/components/Gallery';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Проекты и объекты',
  description:
    'Объекты ASAR HOLDING в Кокшетау: жилой дом ЖК ASAR PREMIUM на проспекте Нурсултана Назарбаева, 96, сданный таунхаус на улице Байкена Ашимова, 38 и дуплекс на улице Ауельбекова, 19.',
  alternates: { canonical: '/projects' },
  openGraph: {
    url: '/projects',
    title: 'Проекты и объекты ASAR HOLDING в Кокшетау',
    description:
      'Жилые дома, дуплексы и таунхаусы компании ASAR HOLDING: адреса, статусы и фотографии объектов.',
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow={`Объекты компании · ${site.city}`}
        title="Проекты ASAR HOLDING"
        intro={
          <p>
            Здесь только реальные объекты компании: жилой дом в центре Кокшетау, сданный таунхаус
            и объекты в работе. У каждого — адрес, статус и фотографии.
          </p>
        }
        image="/images/duplex-construction.jpg"
        imageAlt="Рабочие и прораб с проектом на строительной площадке компании ASAR HOLDING в Кокшетау"
        meta={[
          { label: 'Город', value: site.city },
          { label: 'Флагман', value: 'ЖК ASAR PREMIUM' },
          { label: 'Жилая недвижимость', value: 'Основное направление' },
          { label: 'Формат работы', value: 'Полный цикл' },
        ]}
      />

      <Projects showAll={false} />
      <Gallery />
      <CTA />
      <Contact compact />
    </>
  );
}
