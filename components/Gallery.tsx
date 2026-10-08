'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { galleryImages, site } from '@/lib/site';

const spanClass: Record<string, string> = {
  lg: 'col-span-2 md:col-span-4 aspect-[5/4]',
  wide: 'col-span-2 md:col-span-3 aspect-[4/3]',
  tall: 'col-span-1 md:col-span-2 aspect-[3/4] md:aspect-[4/5]',
  square: 'col-span-1 md:col-span-2 aspect-square',
};

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback((dir: number) => {
    setOpenIndex((cur) => {
      if (cur === null) return cur;
      return (cur + dir + galleryImages.length) % galleryImages.length;
    });
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    lastFocused.current = document.activeElement as HTMLElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      lastFocused.current?.focus?.();
    };
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : galleryImages[openIndex];

  return (
    <section id="gallery" className="scroll-mt-24 bg-stone py-20 md:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          align="split"
          eyebrow="Фотографии"
          title="Стройка, объекты, детали"
          intro={
            <p>
              Кадры с площадок и готовых объектов {site.name}: кладка и перекрытия, входные группы,
              паркинг, интерьеры после ремонта. Нажмите на фотографию, чтобы открыть её целиком.
            </p>
          }
        />

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-6 md:gap-4">
          {galleryImages.map((img, i) => (
            <Reveal key={img.src} delay={(i % 3) * 0.06} className={spanClass[img.span] ?? ''}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block h-full w-full overflow-hidden text-left focus-visible:outline-none"
                aria-label={`Открыть фотографию: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 50vw, 33vw"
                  className="zoom-img object-cover"
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/18"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр фотографии"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink/96 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <span className="label text-white/55">
                {openIndex! + 1} / {galleryImages.length}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
                aria-label="Закрыть просмотр"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div
              className="relative flex-1 px-3 pb-2 sm:px-6"
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>
            </div>

            <div className="flex items-center justify-between gap-4 px-4 pb-6 pt-3 sm:px-6">
              <p className="max-w-[60ch] text-[0.8125rem] leading-snug text-white/60">
                {current.alt}
              </p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
                  aria-label="Предыдущая фотография"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H6M11 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
                  aria-label="Следующая фотография"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
