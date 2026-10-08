/**
 * Единый источник данных сайта.
 *
 * ВАЖНО: все факты ниже собраны из открытых источников —
 * 2ГИС (карточки ТОО ASAR Holding) и Instagram @asar_holding.
 * Ничего не додумано: если данные не подтверждены источником, они не выводятся
 * на сайте вовсе.
 *
 * Источники:
 *  - 2ГИС, «ЖК ASAR» (строящийся объект), пр. Нурсултана Назарбаева, 96
 *  - 2ГИС, «ASAR Holding» (таунхаус), ул. Байкена Ашимова, 38 — дом сдан
 *  - 2ГИС, «ASAR Holding» (офис продаж), ул. Магзи Абулкасымова, 164
 *  - Instagram @asar_holding — публикации и подписи
 */

/**
 * Публичный адрес сайта. Подставляется в metadataBase, canonical, Open Graph,
 * sitemap.xml и robots.txt.
 *
 * По умолчанию — рабочий адрес продакшена на Vercel. Когда к проекту будет
 * подключён собственный домен, задайте переменную окружения
 * NEXT_PUBLIC_SITE_URL=https://ваш-домен в настройках хостинга.
 * Иначе canonical и sitemap будут указывать на несуществующий домен,
 * и поисковые системы не смогут корректно проиндексировать сайт.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://asar-holding.vercel.app'
).replace(/\/+$/, '');

export const site = {
  name: 'ASAR HOLDING',
  wordmark: 'ASAR',
  wordmarkAccent: 'HOLDING',
  legalName: 'ТОО ASAR Holding',
  city: 'Кокшетау',
  country: 'Казахстан',
  since: '2015',
  /** Слоган компании — её собственные слова из официального профиля. */
  tagline: 'Строим не стены — строим доверие',
  subTagline: 'Доверие — наш фундамент',
  url: siteUrl,
} as const;

export const contact = {
  phone: { display: '+7 775 110 66 66', href: 'tel:+77751106666', label: 'Квартиры и объекты' },
  phoneMaterials: {
    display: '+7 707 909 56 59',
    href: 'tel:+77079095659',
    label: 'Строительные материалы',
  },
  whatsapp: 'https://wa.me/77751106666',
  instagram: 'https://www.instagram.com/asar_holding',
  instagramHandle: '@asar_holding',
  office: 'улица Магзи Абулкасымова, 164',
  officeFull: 'улица Магзи Абулкасымова, 164, Кокшетау',
  /** По данным 2ГИС офис открывается в 09:00; точный график уточняется по телефону. */
  hoursNote: 'Приём обращений с 09:00 — по данным 2ГИС',
  twoGisMain: 'https://2gis.kz/kokshetau/firm/70000001090429128',
  twoGisTownhouse: 'https://2gis.kz/kokshetau/firm/70000001099317368',
  twoGisBranches: 'https://2gis.kz/kokshetau/branches/70000001097451912',
  /** Маршрут до ЖК ASAR (пр. Н. Назарбаева, 96) из карточки 2ГИС */
  route:
    'https://2gis.kz/kokshetau/directions/points/%7C69.388705%2C53.278707%3B70000001090429128',
  rating: { value: '4,9', count: 40, source: '2ГИС' },
} as const;

export const navigation = [
  { href: '/about', label: 'О компании' },
  { href: '/projects', label: 'Проекты' },
  { href: '/#directions', label: 'Направления' },
  { href: '/#trust', label: 'Преимущества' },
  { href: '/contacts', label: 'Контакты' },
] as const;

export type ProjectImage = {
  src: string;
  alt: string;
  /** Описание для галереи проекта */
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Полное название объекта, если отличается от заголовка карточки */
  fullTitle?: string;
  category: string;
  location: string;
  status: 'Строится' | 'Сдан' | 'Готов к продаже';
  statusNote?: string;
  year?: string;
  featured?: boolean;
  summary: string;
  description: string[];
  specs: { label: string; value: string }[];
  features: string[];
  cover: string;
  coverAlt: string;
  gallery: ProjectImage[];
  source?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: 'asar-premium',
    title: 'ЖК ASAR PREMIUM',
    fullTitle: 'ЖК ASAR PREMIUM (в 2ГИС — «ЖК ASAR»)',
    category: 'Жилая недвижимость',
    location: 'Кокшетау, проспект Нурсултана Назарбаева, 96',
    status: 'Строится',
    statusNote: 'Строящийся объект по данным 2ГИС',
    featured: true,
    summary:
      'Девятиэтажный жилой дом с подземным паркингом и дизайнерскими общественными зонами — флагманский объект компании в центре Кокшетау.',
    description: [
      'ЖК ASAR PREMIUM — жилой дом на проспекте Нурсултана Назарбаева, 96 в Кокшетау. В карточке 2ГИС объект отмечен как строящийся, высотность — 9 этажей.',
      'В составе объекта — квартиры, подземный паркинг с машиноместами, а также общественные зоны с дизайнерской отделкой: лобби с панелями, латунными решётками и мрамором.',
      'Компания ведёт объект полным циклом: проектирование, строительно-монтажные работы и реализацию квартир и парковочных мест.',
    ],
    specs: [
      { label: 'Тип объекта', value: 'Жилой дом' },
      { label: 'Этажность', value: '9 этажей' },
      { label: 'Адрес', value: 'пр. Нурсултана Назарбаева, 96' },
      { label: 'Статус', value: 'Строится' },
    ],
    features: [
      'Подземный паркинг с продажей машиномест',
      'Дизайнерская отделка общественных зон',
      'Ремонт квартир под ключ',
      'Полный цикл: проектирование, строительство, реализация',
    ],
    cover: '/images/asar-premium-facade.jpg',
    coverAlt:
      'Девятиэтажный жилой дом ЖК ASAR PREMIUM в Кокшетау с башенным краном рядом',
    gallery: [
      {
        src: '/images/asar-premium-facade.jpg',
        alt: 'Фасад девятиэтажного жилого дома ЖК ASAR PREMIUM в Кокшетау',
        caption: 'Фасад объекта',
      },
      {
        src: '/images/lobby-interior.jpg',
        alt: 'Дизайнерское лобби ЖК ASAR PREMIUM: бирюзовая панель с надписью ASAR PREMIUM, мрамор и латунь',
        caption: 'Общественная зона и входная группа',
      },
      {
        src: '/images/parking.jpg',
        alt: 'Подземный паркинг ЖК ASAR PREMIUM с разметкой машиномест',
        caption: 'Подземный паркинг',
      },
      {
        src: '/images/asar-premium-plan.jpg',
        alt: 'Фасад ЖК ASAR PREMIUM и планировка однокомнатной квартиры',
        caption: 'Фасад и планировка',
      },
    ],
    source: {
      label: 'Карточка в 2ГИС',
      href: 'https://2gis.kz/kokshetau/firm/70000001090429128',
    },
  },
  {
    slug: 'townhouse-ashimova',
    title: 'Таунхаус на Ашимова, 38',
    category: 'Жилая недвижимость',
    location: 'Кокшетау, улица Байкена Ашимова, 38',
    status: 'Сдан',
    statusNote: 'В карточке 2ГИС отмечен как «Дом сдан»',
    summary:
      'Готовый объект компании — таунхаус на улице Байкена Ашимова. Компания приводит его как пример завершённого проекта.',
    description: [
      'Таунхаус на улице Байкена Ашимова, 38 в Кокшетау — готовый объект компании. В карточке 2ГИС он отмечен статусом «Дом сдан».',
      'Компания публикует этот объект как наглядный пример реализованного проекта: от проектирования и строительства до готового дома.',
    ],
    specs: [
      { label: 'Тип объекта', value: 'Таунхаус' },
      { label: 'Адрес', value: 'ул. Байкена Ашимова, 38' },
      { label: 'Ориентир', value: 'угол ул. Сакена Сейфуллина, 73' },
      { label: 'Статус', value: 'Сдан' },
    ],
    features: [
      'Завершённое строительство',
      'Реализован полный цикл — от проекта до сдачи',
    ],
    cover: '/images/duplex-construction.jpg',
    coverAlt: 'Строительство кирпичного дома с поддонами кирпича на площадке',
    gallery: [
      {
        src: '/images/duplex-construction.jpg',
        alt: 'Кирпичная кладка и строительные материалы на объекте компании',
        caption: 'Объект компании',
      },
      {
        src: '/images/golden-brick-ceremony.jpg',
        alt: 'Церемония закладки на объекте: крановый крюк с золотыми шарами над кровлей дома',
        caption: 'Завершение кровельных работ',
      },
    ],
    source: {
      label: 'Карточка в 2ГИС',
      href: 'https://2gis.kz/kokshetau/firm/70000001099317368',
    },
  },
  {
    slug: 'duplex-aubekova',
    title: 'Дуплекс на Ауельбекова, 19',
    category: 'Жилая недвижимость',
    location: 'Кокшетау, улица Ауельбекова, 19',
    status: 'Строится',
    summary:
      'Двухэтажный дуплекс в Кокшетау. Компания публикует ход строительства объекта: кладка, перекрытия, монтаж плит крыши.',
    description: [
      'Строящийся двухэтажный дуплекс на улице Ауельбекова, 19 в Кокшетау.',
      'Компания ведёт публичную рубрику «Ход строительства»: кирпичная кладка, устройство перекрытий, монтаж плит крыши второго этажа.',
    ],
    specs: [
      { label: 'Тип объекта', value: 'Дуплекс' },
      { label: 'Этажность', value: '2 этажа' },
      { label: 'Адрес', value: 'ул. Ауельбекова, 19' },
      { label: 'Статус', value: 'Строится' },
    ],
    features: ['Кирпичная кладка', 'Монолитные перекрытия', 'Публичный ход строительства'],
    cover: '/images/duplex-brick-interior.jpg',
    coverAlt: 'Кирпичные стены строящегося дуплекса изнутри и деревянная опалубка лестницы',
    gallery: [
      {
        src: '/images/duplex-brick-interior.jpg',
        alt: 'Внутренние кирпичные стены строящегося дуплекса и опалубка лестницы',
        caption: 'Кладка и лестничный марш',
      },
      {
        src: '/images/duplex-construction.jpg',
        alt: 'Строительная площадка дуплекса: кирпич, поддоны, рабочие с проектом',
        caption: 'Ход строительства',
      },
      {
        src: '/images/crane-slab.jpg',
        alt: 'Башенный кран поднимает пустотную плиту перекрытия над кирпичными стенами',
        caption: 'Монтаж перекрытий',
      },
    ],
  },
  {
    slug: 'townhouse-212',
    title: 'Таунхаус 212 м²',
    category: 'Жилая недвижимость',
    location: 'Кокшетау',
    status: 'Готов к продаже',
    summary:
      'Просторный таунхаус площадью 212 м²: 5 комнат, собственный двор и гараж. Объект в реализации компании.',
    description: [
      'Таунхаус площадью 212 м² в Кокшетау — объект в реализации компании.',
      'Характеристики из публикации компании: 5 комнат, собственный двор и гараж.',
      'Актуальную стоимость и условия просмотра уточняйте по телефону или в WhatsApp.',
    ],
    specs: [
      { label: 'Тип объекта', value: 'Таунхаус' },
      { label: 'Площадь', value: '212 м²' },
      { label: 'Комнат', value: '5' },
      { label: 'Город', value: 'Кокшетау' },
    ],
    features: ['Собственный двор', 'Гараж', '5 комнат'],
    cover: '/images/office-facade.jpg',
    coverAlt: 'Кирпичный фасад здания с витражным остеклением и вывеской Asar holding',
    gallery: [
      {
        src: '/images/office-facade.jpg',
        alt: 'Фасад кирпичного здания с вывеской Asar holding',
        caption: 'Фасад объекта',
      },
      {
        src: '/images/interior-kitchen.jpg',
        alt: 'Кухня-столовая в интерьере после отделки',
        caption: 'Интерьер',
      },
    ],
  },
];

export const directions = [
  {
    index: '01',
    title: 'Жилая недвижимость',
    text: 'Проектирование и строительство жилых домов, дуплексов и таунхаусов в Кокшетау. Полный цикл: от идеи до готового объекта.',
    image: '/images/asar-premium-facade.jpg',
    alt: 'Девятиэтажный жилой дом в Кокшетау',
  },
  {
    index: '02',
    title: 'Коммерческие объекты',
    text: 'Проектирование и строительство коммерческих объектов. Помещения площадью от 100 м² с витражным остеклением и отдельными входами.',
    image: '/images/commercial-render.jpg',
    alt: 'Одноэтажное коммерческое здание со стеклянными витринами',
  },
  {
    index: '03',
    title: 'Строительно-монтажные работы',
    text: 'Строительно-монтажные работы под ключ. Один подрядчик — полный контроль результата.',
    image: '/images/crane-slab.jpg',
    alt: 'Башенный кран и кирпичные стены строящегося здания',
  },
  {
    index: '04',
    title: 'Дизайн и ремонт',
    text: 'Дизайн-проект и ремонт квартир под ключ, включая объекты собственного строительства.',
    image: '/images/interior-kitchen.jpg',
    alt: 'Кухня-столовая после ремонта под ключ',
  },
] as const;

export const additionalServices = [
  'Юридическое сопровождение',
  'Строительные материалы',
  'Продажа квартир и парковочных мест',
] as const;

export const trustPoints = [
  {
    index: '01',
    title: 'Работаем с 2015 года',
    text: 'Компания на рынке строительства жилья в Кокшетау более десяти лет.',
  },
  {
    index: '02',
    title: 'Строительство жилых зданий',
    text: 'Основное направление — жилая недвижимость: многоквартирные дома, дуплексы, таунхаусы.',
  },
  {
    index: '03',
    title: 'Кокшетау',
    text: 'Локальный застройщик: объекты компании находятся в Кокшетау — их можно увидеть на месте.',
  },
  {
    index: '04',
    title: 'Прямой контакт',
    text: 'Телефон, WhatsApp и Instagram без посредников. Рейтинг 4,9 из 5 в 2ГИС.',
  },
] as const;

export const processSteps = [
  {
    index: '01',
    title: 'Проектируем',
    text: 'Разработка проекта жилого или коммерческого объекта — от идеи до рабочей документации.',
  },
  {
    index: '02',
    title: 'Строим',
    text: 'Строительно-монтажные работы под ключ. Один подрядчик отвечает за результат.',
  },
  {
    index: '03',
    title: 'Реализуем',
    text: 'Продажа квартир, помещений и парковочных мест, сопровождение сделки.',
  },
] as const;

/** Галерея: реальные кадры объектов компании, разные пропорции — для editorial-сетки. */
export const galleryImages = [
  {
    src: '/images/asar-premium-facade.jpg',
    alt: 'Девятиэтажный жилой дом ЖК ASAR PREMIUM в Кокшетау',
    span: 'lg',
  },
  {
    src: '/images/lobby-interior.jpg',
    alt: 'Дизайнерская входная группа ЖК ASAR PREMIUM: бирюзовая панель, мрамор, латунь',
    span: 'tall',
  },
  {
    src: '/images/crane-slab.jpg',
    alt: 'Башенный кран поднимает плиту перекрытия над кирпичными стенами',
    span: 'tall',
  },
  {
    src: '/images/duplex-brick-interior.jpg',
    alt: 'Кирпичные стены строящегося дуплекса и деревянная опалубка лестницы',
    span: 'tall',
  },
  {
    src: '/images/duplex-construction.jpg',
    alt: 'Рабочие и прораб с проектом на площадке дуплекса, кирпич на поддонах',
    span: 'tall',
  },
  {
    src: '/images/office-facade.jpg',
    alt: 'Кирпичный фасад с витражным остеклением и вывеской Asar holding',
    span: 'wide',
  },
  {
    src: '/images/interior-kitchen.jpg',
    alt: 'Кухня-столовая в квартире после ремонта под ключ',
    span: 'wide',
  },
  {
    src: '/images/golden-brick-ceremony.jpg',
    alt: 'Церемония закладки: золотые шары и крюк крана над кровлей дома',
    span: 'tall',
  },
  {
    src: '/images/office-opening.jpg',
    alt: 'Открытие офиса ASAR HOLDING в Кокшетау',
    span: 'tall',
  },
  {
    src: '/images/commercial-render.jpg',
    alt: 'Проект коммерческого здания с витражным остеклением и благоустройством',
    span: 'square',
  },
] as const;

export const stats = [
  { value: '2015', label: 'год начала работы' },
  { value: '9', label: 'этажей — высотность ЖК ASAR PREMIUM' },
  { value: '4,9', label: 'рейтинг в 2ГИС из 5' },
  { value: '3', label: 'адреса компании в 2ГИС' },
] as const;
