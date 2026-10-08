'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { contact, site } from '@/lib/site';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '10%']);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.35]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
      aria-label="ASAR HOLDING — строительная компания в Кокшетау"
    >
      {/* Фотография объекта компании */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[47%] lg:max-w-[820px]"
      >
        <Image
          src="/images/asar-premium-facade.jpg"
          alt="Девятиэтажный жилой дом ЖК ASAR PREMIUM компании ASAR HOLDING в Кокшетау"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 47vw"
          className="object-cover object-[50%_42%]"
        />
        {/* На мобильных фото занимает весь экран, поэтому затемнение сильнее —
            так текст остаётся читаемым на любом кадре (WCAG AA). */}
        <div className="absolute inset-0 bg-ink/58 lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/35 to-ink/5 lg:block" />
        <div className="absolute inset-0 scrim lg:hidden" />
      </motion.div>

      {/* Тонкая вертикальная линия-разделитель на больших экранах */}
      <div className="absolute inset-y-0 left-[53%] hidden w-px bg-white/10 lg:block" aria-hidden="true" />

      <motion.div
        style={{ opacity: fade }}
        className="shell relative z-10 flex min-h-[100svh] flex-col justify-end pb-12 pt-28 sm:pb-16 md:pb-20 lg:justify-center lg:pb-28 lg:pt-36"
      >
        <div className="max-w-[min(100%,42rem)]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="eyebrow text-white/70"
          >
            Строительная компания · {site.city} · с {site.since} года
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease }}
            className="display mt-5 md:mt-6"
          >
            <span className="block">{site.wordmark}</span>
            <span className="block text-white/92">{site.wordmarkAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.36, ease }}
            className="mt-7 font-serif text-[clamp(1.375rem,2.6vw,2.1rem)] italic leading-[1.2] tracking-[-0.01em] text-white"
          >
            {site.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.46, ease }}
            className="lead mt-6 max-w-[36rem] text-white/72"
          >
            Проектируем и строим жилые дома, дуплексы и таунхаусы, реализуем квартиры,
            парковочные места и коммерческие помещения в Кокшетау. Один подрядчик —
            полный контроль результата.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/contacts" className="btn btn-primary w-full sm:w-auto">
              Связаться с компанией
            </Link>
            <Link href="/projects" className="btn btn-ghost-light w-full sm:w-auto">
              Смотреть проекты
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease }}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/14 pt-7 sm:grid-cols-3 md:mt-14"
          >
            <div>
              <dt className="label text-white/50">Объект в работе</dt>
              <dd className="mt-1.5 text-[0.9375rem] font-medium text-white/90">
                ЖК ASAR PREMIUM
              </dd>
            </div>
            <div>
              <dt className="label text-white/50">Направление</dt>
              <dd className="mt-1.5 text-[0.9375rem] font-medium text-white/90">
                Жилое строительство
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="label text-white/50">Рейтинг в 2ГИС</dt>
              <dd className="mt-1.5 text-[0.9375rem] font-medium text-white/90">
                {contact.rating.value} из 5 · {contact.rating.count} оценок
              </dd>
            </div>
          </motion.dl>
        </div>
      </motion.div>

      {/* Индикатор прокрутки */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="pointer-events-none absolute bottom-8 right-[clamp(1.125rem,4.5vw,4.5rem)] z-10 hidden items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <span className="label text-white/45">Листайте</span>
        <span className="relative h-px w-14 overflow-hidden bg-white/25">
          <motion.span
            className="absolute inset-y-0 left-0 w-6 bg-white/80"
            animate={reduce ? {} : { x: ['-100%', '250%'] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
