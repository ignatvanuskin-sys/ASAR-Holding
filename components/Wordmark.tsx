import { site } from '@/lib/site';

/**
 * Текстовый знак компании. Логотип-эмблему намеренно не воспроизводим
 * графически: используем наборный знак, как это делают корпоративные сайты
 * застройщиков до передачи официального логотипа в векторе.
 */
export default function Wordmark({
  className = '',
  tone = 'dark',
}: {
  className?: string;
  tone?: 'dark' | 'light';
}) {
  const primary = tone === 'light' ? 'text-white' : 'text-ink';
  const secondary = tone === 'light' ? 'text-white/60' : 'text-ink/55';

  return (
    <span className={`inline-flex items-baseline gap-[0.42em] leading-none ${className}`}>
      <span
        className={`text-[1.0625rem] font-extrabold tracking-[0.14em] sm:text-[1.125rem] ${primary}`}
      >
        {site.wordmark}
      </span>
      <span className={`text-[0.6875rem] font-medium tracking-[0.3em] ${secondary}`}>
        {site.wordmarkAccent}
      </span>
    </span>
  );
}
