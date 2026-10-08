import { NextResponse } from 'next/server';

/**
 * Приём заявок с формы сайта.
 *
 * Сейчас обработчик только валидирует данные и пишет заявку в лог сервера.
 * Чтобы заявки уходили в CRM, на почту или в Telegram — допишите доставку
 * в блоке «Куда отправлять» (переменные окружения, webhook и т.п.).
 * Разметка и UX формы менять не нужно.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const data = (payload ?? {}) as Record<string, unknown>;
  const name = String(data.name ?? '').trim();
  const phone = String(data.phone ?? '').trim();
  const comment = String(data.comment ?? '').trim();
  const honeypot = String(data.company ?? '').trim();

  // Скрытое поле заполняют только боты — отвечаем «успешно», ничего не отправляя.
  if (honeypot) return NextResponse.json({ ok: true });

  const digits = phone.replace(/\D/g, '');
  if (name.length < 2 || digits.length < 10) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }

  // ── Куда отправлять ────────────────────────────────────────────────
  // Например: await fetch(process.env.LEAD_WEBHOOK_URL!, { method: 'POST', ... })
  const lead = {
    name,
    phone,
    comment,
    receivedAt: new Date().toISOString(),
    source: 'website',
  };
  console.info('[ASAR HOLDING] новая заявка', lead);

  return NextResponse.json({ ok: true });
}
