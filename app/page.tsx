import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import About from '@/components/About';
import Directions from '@/components/Directions';
import Projects from '@/components/Projects';
import Trust from '@/components/Trust';
import Process from '@/components/Process';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'ASAR HOLDING — строительная компания в Кокшетау',
  description:
    'Строим не стены — строим доверие. ASAR HOLDING: строительство жилых домов, дуплексов и таунхаусов в Кокшетау с 2015 года. ЖК ASAR PREMIUM, полный цикл — проектируем, строим, реализуем.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <Directions />
      <Projects />
      <Trust />
      <Process />
      <Gallery />
      <Reviews />
      <CTA />
      <Contact />
    </>
  );
}
