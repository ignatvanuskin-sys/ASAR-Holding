'use client';

import { useId, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { contact } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'phone', string>>;

/**
 * Форма заявки. Frontend полностью готов к подключению: отправляет POST на
 * /api/lead (route handler в проекте). Чтобы подключить CRM — достаточно
 * доработать обработчик, менять разметку формы не нужно.
 */
export default function LeadForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({ name: '', phone: '', comment: '' });

  const nameId = `${uid}-name`;
  const phoneId = `${uid}-phone`;
  const commentId = `${uid}-comment`;

  function validate(): Errors {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = 'Укажите имя — как к вам обращаться.';
    const digits = values.phone.replace(/\D/g, '');
    if (digits.length < 10) next.phone = 'Укажите телефон в формате +7 700 000 00 00.';
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus('idle');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
      setValues({ name: '', phone: '', comment: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[22rem] flex-col justify-center rounded-2xl border border-brand/25 bg-brand/[0.06] p-7 md:p-9"
            role="status"
            aria-live="polite"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </span>
            <h3 className="mt-5 text-[1.375rem] font-semibold tracking-[-0.02em]">
              Заявка отправлена
            </h3>
            <p className="mt-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink/70">
              Спасибо. Мы свяжемся с вами по указанному номеру. Если вопрос срочный — позвоните
              напрямую:{' '}
              <a className="font-semibold text-brand underline underline-offset-2" href={contact.phone.href}>
                {contact.phone.display}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="btn btn-ghost-dark mt-7 self-start"
            >
              Отправить ещё одну заявку
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={onSubmit}
            noValidate
            className="rounded-2xl border border-ink/12 bg-white p-6 md:p-9"
          >
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor={nameId} className="label block text-ink/55">
                  Имя
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${nameId}-error` : undefined}
                  className="field mt-2"
                  placeholder="Как к вам обращаться"
                />
                {errors.name && (
                  <p id={`${nameId}-error`} role="alert" className="mt-2 text-[0.8125rem] text-red-700">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={phoneId} className="label block text-ink/55">
                  Телефон
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={values.phone}
                  onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
                  className="field mt-2"
                  placeholder="+7 700 000 00 00"
                />
                {errors.phone && (
                  <p id={`${phoneId}-error`} role="alert" className="mt-2 text-[0.8125rem] text-red-700">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={commentId} className="label block text-ink/55">
                  Комментарий
                </label>
                <textarea
                  id={commentId}
                  name="comment"
                  rows={3}
                  value={values.comment}
                  onChange={(e) => setValues((v) => ({ ...v, comment: e.target.value }))}
                  className="field mt-2 resize-y"
                  placeholder="Что планируете построить или купить"
                />
              </div>

              {/* Honeypot для ботов — скрыт от людей */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor={`${uid}-company`}>Компания</label>
                <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? 'Отправляем…' : 'Отправить заявку'}
              </button>

              {status === 'error' && (
                <p role="alert" className="text-[0.8125rem] leading-relaxed text-red-700">
                  Не удалось отправить заявку. Попробуйте ещё раз или позвоните по телефону{' '}
                  {contact.phone.display}.
                </p>
              )}

              <p className="text-[0.75rem] leading-relaxed text-ink/45">
                Отправляя форму, вы соглашаетесь на обработку указанных данных для обратной связи
                по вашему запросу.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
