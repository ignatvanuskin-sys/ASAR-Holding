import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ink py-32 text-white">
      <div className="shell">
        <p className="eyebrow text-white/55">Страница не найдена</p>
        <h1 className="mt-5 max-w-[22ch] text-[clamp(2rem,5.6vw,4rem)] font-semibold leading-[1] tracking-[-0.035em]">
          Такой страницы на сайте нет
        </h1>
        <p className="lead mt-6 max-w-[42rem] text-white/70">
          Возможно, ссылка устарела. Посмотрите объекты компании или перейдите к контактам — мы
          поможем найти нужное.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/projects" className="btn btn-light w-full sm:w-auto">
            Смотреть проекты
          </Link>
          <Link href="/" className="btn btn-ghost-light w-full sm:w-auto">
            На главную
          </Link>
        </div>
      </div>
    </section>
  );
}
