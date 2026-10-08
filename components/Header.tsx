'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Wordmark from './Wordmark';
import { contact, navigation } from '@/lib/site';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  // Когда открыто меню, шапка остаётся тёмной и сливается с оверлеем.
  const solid = scrolled && !open;
  const isProjectsPage = pathname.startsWith('/projects');

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500',
          solid
            ? 'bg-stone/92 shadow-[0_1px_0_rgba(14,17,19,0.09)] backdrop-blur-md'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div
          className={[
            'shell flex items-center justify-between gap-4 transition-[height] duration-500',
            solid ? 'h-[60px] md:h-[68px]' : 'h-[68px] md:h-[92px]',
          ].join(' ')}
        >
          <Link
            href="/"
            aria-label="ASAR HOLDING — на главную"
            className="inline-flex shrink-0 items-center py-3.5"
            onClick={close}
          >
            <Wordmark tone={solid ? 'dark' : 'light'} />
          </Link>

          <nav
            aria-label="Основная навигация"
            className="hidden items-center gap-1 lg:flex"
          >
            {navigation.map((item) => {
              const active =
                item.href === '/projects'
                  ? isProjectsPage
                  : pathname === item.href.replace('/#', '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'rounded-full px-3.5 py-2 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-300',
                    solid
                      ? 'text-ink/70 hover:bg-ink/[0.06] hover:text-ink'
                      : 'text-white/80 hover:bg-white/10 hover:text-white',
                    active ? (solid ? 'text-ink' : 'text-white') : '',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contact.phone.href}
              className={[
                'hidden items-center gap-2 rounded-full px-3.5 py-2 text-[0.9375rem] font-semibold tracking-[-0.01em] transition-colors duration-300 xl:inline-flex',
                solid ? 'text-ink hover:bg-ink/[0.06]' : 'text-white hover:bg-white/10',
              ].join(' ')}
            >
              {contact.phone.display}
            </a>

            {/* На телефоне роль CTA выполняет кнопка звонка */}
            <a
              href={contact.phone.href}
              aria-label={`Позвонить: ${contact.phone.display}`}
              className={[
                'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 sm:hidden',
                solid
                  ? 'border-ink/15 text-ink hover:bg-ink/[0.06]'
                  : 'border-white/30 text-white hover:bg-white/10',
              ].join(' ')}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
              </svg>
            </a>

            <Link
              href="/contacts"
              className={[
                'btn hidden !min-h-0 !py-2.5 !px-4 text-[0.875rem] sm:inline-flex',
                solid ? 'btn-primary' : 'btn-light',
              ].join(' ')}
            >
              Связаться
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              className={[
                'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden',
                solid
                  ? 'border-ink/15 text-ink hover:bg-ink/[0.06]'
                  : 'border-white/30 text-white hover:bg-white/10',
              ].join(' ')}
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={[
                    'absolute left-0 block h-[1.5px] w-5 bg-current transition-all duration-300',
                    open ? 'top-1.5 rotate-45' : 'top-0',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute left-0 top-1.5 block h-[1.5px] w-5 bg-current transition-all duration-300',
                    open ? 'opacity-0' : 'opacity-100',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute left-0 block h-[1.5px] w-5 bg-current transition-all duration-300',
                    open ? 'top-1.5 -rotate-45' : 'top-3',
                  ].join(' ')}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-ink lg:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Зона под шапкой не участвует в прокрутке, поэтому пункты меню
                  уходят под неё, а не наползают на логотип и кнопку закрытия.
                  Высота совпадает с высотой шапки в открытом состоянии. */}
              <div className="h-[68px] shrink-0 md:h-[92px]" aria-hidden="true" />

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pb-10">
                <nav aria-label="Меню" className="shell flex flex-col">
                  {navigation.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.045, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block border-b border-white/10 py-4 text-[1.5rem] font-semibold tracking-[-0.02em] text-white"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="shell mt-8 flex flex-col gap-3">
                  <a href={contact.phone.href} className="btn btn-light w-full !min-h-[3.25rem]">
                    {contact.phone.display}
                  </a>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost-light w-full !min-h-[3.25rem]"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost-light w-full !min-h-[3.25rem]"
                  >
                    Instagram {contact.instagramHandle}
                  </a>
                </div>

                <div className="shell mt-auto pt-10">
                  <p className="text-sm leading-relaxed text-white/55">
                    {contact.officeFull}
                    <br />
                    {contact.hoursNote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
