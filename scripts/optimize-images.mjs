/**
 * Готовит рабочие изображения сайта из исходников компании (_assets/raw).
 *
 * Что делает:
 *  - убирает рекламные текстовые наложения из Instagram-кадров (кроп);
 *  - приводит размеры к разумным для веба значениям;
 *  - сжимает JPEG (mozjpeg) — дальше Next/Image сам отдаёт AVIF/WebP;
 *  - собирает og.jpg и иконки.
 */
import { mkdir, readdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const RAW = join(process.cwd(), '_assets', 'raw');
const OUT = join(process.cwd(), 'public');
const IMG = join(OUT, 'images');

/** file -> { crop: {top,height,left,width}, width }
 *  crop задаётся в пикселях исходника. */
const PLAN = {
  // Флагман: убираем верхний текст «ASAR PREMIUM»
  'asar-premium-facade.jpg': { crop: { top: 252, height: 848 }, width: 640 },
  // Вывеска: убираем нижний текстовый блок «ОТ ИДЕИ ДО ГОТОВОГО ОБЪЕКТА»
  'office-facade.jpg': { crop: { top: 0, height: 1000 }, width: 1080 },
  // Паркинг: убираем текстовое наложение по центру (оставляем нижнюю часть)
  'parking.jpg': { crop: { top: 1360, height: 328 }, width: 1350 },
  // Интерьер: убираем логотип и надпись «УСЛУГИ ДИЗАЙН/РЕМОНТ» (берём верхнюю часть)
  'interior-kitchen.jpg': { crop: { top: 30, height: 552 }, width: 1080 },
  // Дуплекс: убираем нижний оверлей «ДУБЛЕКС …» с логотипом
  'duplex-construction.jpg': { crop: { top: 0, height: 1180 }, width: 1080 },
  'duplex-brick-interior.jpg': { crop: { top: 0, height: 1180 }, width: 1080 },
  // Лобби: срезаем лишнее сверху/снизу
  'lobby-interior.jpg': { crop: { top: 60, height: 1620 }, width: 1280 },
  'asar-premium-plan.jpg': { crop: null, width: 1238 },
  'commercial-render.webp': { crop: null, width: 1400 },
  'crane-slab.jpg': { crop: null, width: 640 },
  'golden-brick-ceremony.jpg': { crop: null, width: 640 },
  'client-inside.jpg': { crop: null, width: 640 },
  'concrete-mixer-site.jpg': { crop: null, width: 640 },
  'insulation-works.jpg': { crop: null, width: 640 },
  'foreman-site.jpg': { crop: null, width: 640 },
  'office-opening.jpg': { crop: null, width: 720 },
};

const GRAPHITE = { r: 16, g: 19, b: 21, alpha: 1 };
const BRAND = { r: 27, g: 94, b: 82, alpha: 1 };

async function main() {
  await mkdir(IMG, { recursive: true });
  const files = await readdir(RAW);
  const done = [];

  for (const file of files) {
    const rule = PLAN[file];
    if (!rule) {
      console.warn('skip (нет правила):', file);
      continue;
    }
    const src = join(RAW, file);
    const meta = await sharp(src).metadata();
    const sw = meta.width ?? 0;
    const sh = meta.height ?? 0;

    let pipe = sharp(src).rotate();
    if (rule.crop) {
      const top = Math.max(0, Math.min(rule.crop.top ?? 0, sh - 1));
      const height = Math.max(1, Math.min(rule.crop.height ?? sh - top, sh - top));
      pipe = pipe.extract({
        left: Math.max(0, Math.min(rule.crop.left ?? 0, sw - 1)),
        top,
        width: Math.max(1, Math.min(rule.crop.width ?? sw, sw)),
        height,
      });
    }
    if (rule.width) pipe = pipe.resize({ width: rule.width, withoutEnlargement: true });

    const name = `${parse(file).name}.jpg`;
    await pipe.jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(join(IMG, name));
    done.push(name);
  }

  // ── OG-изображение 1200×630: графитовая панель + акцент + реальное фото фасада ──
  const ogBg = await sharp({
    create: { width: 1200, height: 630, channels: 3, background: GRAPHITE },
  })
    .png()
    .toBuffer();

  const ogPhoto = await sharp(join(RAW, 'office-facade.jpg'))
    .extract({ left: 40, top: 150, width: 1000, height: 720 })
    .resize({ width: 700, height: 630, fit: 'cover', position: 'right' })
    .modulate({ brightness: 0.92 })
    .toBuffer();

  await sharp(ogBg)
    .composite([
      { input: ogPhoto, left: 500, top: 0 },
      {
        input: await sharp({
          create: { width: 8, height: 630, channels: 3, background: BRAND },
        })
          .png()
          .toBuffer(),
        left: 492,
        top: 0,
      },
      {
        input: await sharp({
          create: { width: 700, height: 630, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0.18 } },
        })
          .png()
          .toBuffer(),
        left: 500,
        top: 0,
      },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(OUT, 'og.jpg'));

  // ── Иконки ──
  const iconSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" fill="#101315"/>
      <path d="M32 13 L47 51 H38.5 L32 33.5 L25.5 51 H17 Z" fill="#1B5E52"/>
      <rect x="25.5" y="41" width="13" height="4.5" fill="#A8875A"/>
    </svg>`,
  );
  await sharp(iconSvg).resize(180, 180).png().toFile(join(OUT, 'apple-icon.png'));

  console.log(`Готово. Изображений: ${done.length}`);
  console.log(done.join('\n'));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
