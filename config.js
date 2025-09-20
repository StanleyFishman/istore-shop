const REMOTE_IMAGE_BASE =
  "https://images-porsche.imgix.net/-/media/5D0BB7E042BD4C9DBEF84B5E70482520_73AA748306934B0C9CE20E32231DFCE2_CZ25W01IX0011911-carrera-front";

const HERO_WIDTHS = [800, 1200, 1600];
const OVERVIEW_WIDTH = 1200;
const OPTION_WIDTH = 900;
const MEDIA_WIDTH = 1600;

function buildImageUrl(width, format = "jpg") {
  return `${REMOTE_IMAGE_BASE}?w=${width}&q=85&auto=format&fm=${format}`;
}

function createResponsivePicture(widths) {
  return {
    jpg: widths.reduce((acc, width) => {
      acc[width] = buildImageUrl(width, "jpg");
      return acc;
    }, {}),
    webp: widths.reduce((acc, width) => {
      acc[width] = buildImageUrl(width, "webp");
      return acc;
    }, {}),
  };
}

function createFixedPicture(width) {
  return {
    jpg: buildImageUrl(width, "jpg"),
    webp: buildImageUrl(width, "webp"),
  };
}

function createLocalImage(path) {
  return {
    jpg: path,
  };
}

const MODELS = {
  coupe: {
    name: "GIR ROS 600",
    mark: "600",
    price: "от 19 600 000 ₽",
    segmentLabel: "Купе",
    hero: {
      alt: "Купе GIR ROS 600 в движении",
      sizes: "(min-width: 1200px) 60vw, (min-width: 768px) 80vw, 100vw",
      ...createLocalImage("assets/images/item1_pic1.png")
    },
    kpi: [
      { n: "4,1", u: "с до 100 км/ч" },
      { n: "290", u: "кВт / 394 л.с." },
      { n: "294", u: "км/ч" }
    ],
    overview: {
      title: "Премиальный силуэт",
      text: "Аэродинамический профиль GIR ROS 600 выстроен для точного баланса между скоростью, устойчивостью и эстетикой. Каждая линия работает на производительность.",
      price: "от 19 600 000 ₽",
      image: {
        alt: "Фронтальный вид купе GIR ROS 600",
        sizes: "(min-width: 1200px) 28vw, (min-width: 768px) 50vw, 80vw",
        ...createLocalImage("assets/images/item1_pic2.png")
      },
      stats: [
        { label: "Вес", value: "1 480 кг" },
        { label: "База", value: "2 450 мм" },
        { label: "Расход", value: "9,6 л/100 км" }
      ]
    },
    options: [
      {
        title: "Динамический пакет R",
        description: "Активный передний спойлер, заднее антикрыло и адаптивные стабилизаторы для максимальной устойчивости на высоких скоростях.",
        price: "+ 890 000 ₽",
        image: {
          alt: "Аэродинамический пакет купе",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      },
      {
        title: "Интерьер Atelier",
        description: "Индивидуальная кожа Nappa двух тонов, акценты из композитного волокна и подсветка контура с 32 сценариями.",
        price: "+ 640 000 ₽",
        image: {
          alt: "Салон Atelier",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      },
      {
        title: "Трековый модуль",
        description: "Керамические тормоза, телеметрия трассы и активный контроль перегрева для будней на автодроме.",
        price: "+ 1 120 000 ₽",
        image: {
          alt: "Трековый модуль",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      }
    ],
    media: {
      title: "Динамика в каждом кадре",
      text: "Фирменная платформа GIR ROS раскрывает всю мощь линейки 600 на треке и в городе.",
      image: {
        alt: "Купе GIR ROS на треке",
        sizes: "(min-width: 1200px) 70vw, 100vw",
        ...createLocalImage("assets/images/item1_pic3.png")
      }
    }
  },
  cabrio: {
    name: "GIR ROS 620 Cabrio",
    mark: "620",
    price: "от 21 300 000 ₽",
    segmentLabel: "Кабриолет",
    hero: {
      alt: "Кабриолет GIR ROS 620",
      sizes: "(min-width: 1200px) 60vw, (min-width: 768px) 80vw, 100vw",
      ...createResponsivePicture(HERO_WIDTHS)
    },
    kpi: [
      { n: "3,8", u: "с до 100 км/ч" },
      { n: "312", u: "кВт / 424 л.с." },
      { n: "299", u: "км/ч" }
    ],
    overview: {
      title: "Свобода без компромиссов",
      text: "Электрический привод крыши работает на скорости до 60 км/ч, сохраняя безупречную геометрию кузова и акустический комфорт.",
      price: "от 21 300 000 ₽",
      image: {
        alt: "Кабриолет GIR ROS с открытой крышей",
        sizes: "(min-width: 1200px) 28vw, (min-width: 768px) 50vw, 80vw",
        ...createFixedPicture(OVERVIEW_WIDTH)
      },
      stats: [
        { label: "Вес", value: "1 560 кг" },
        { label: "База", value: "2 450 мм" },
        { label: "Расход", value: "9,9 л/100 км" }
      ]
    },
    options: [
      {
        title: "Акустический тент",
        description: "Многоуровневая изоляция и композитные дуги повышают комфорт путешествий на высоких скоростях.",
        price: "+ 340 000 ₽",
        image: {
          alt: "Акустическая крыша",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      },
      {
        title: "Аудиосистема Stage X",
        description: "18 динамиков, согласованный сабвуфер и алгоритмы шумоподавления для открытого салона.",
        price: "+ 290 000 ₽",
        image: {
          alt: "Аудиосистема Stage X",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      },
      {
        title: "Пакет путешествий",
        description: "Активный адаптивный круиз, ассистент смены полосы и расширенный багажный модуль.",
        price: "+ 480 000 ₽",
        image: {
          alt: "Пакет путешествий",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      }
    ],
    media: {
      title: "Звук ветра как музыка",
      text: "Сбалансированное распределение массы и усиленный монокок обеспечивают точность управления без крыши.",
      image: {
        alt: "Кабриолет GIR ROS на побережье",
        sizes: "(min-width: 1200px) 70vw, 100vw",
        ...createFixedPicture(MEDIA_WIDTH)
      }
    }
  },
  targa: {
    name: "GIR ROS 640 Targa",
    mark: "640",
    price: "от 22 100 000 ₽",
    segmentLabel: "Targa",
    hero: {
      alt: "GIR ROS 640 Targa",
      sizes: "(min-width: 1200px) 60vw, (min-width: 768px) 80vw, 100vw",
      ...createResponsivePicture(HERO_WIDTHS)
    },
    kpi: [
      { n: "3,6", u: "с до 100 км/ч" },
      { n: "331", u: "кВт / 450 л.с." },
      { n: "305", u: "км/ч" }
    ],
    overview: {
      title: "Подпись Targa",
      text: "Иконическая дуга безопасности с подсветкой и панорамная крыша создают узнаваемый силуэт в любое время суток.",
      price: "от 22 100 000 ₽",
      image: {
        alt: "GIR ROS Targa с панорамой",
        sizes: "(min-width: 1200px) 28vw, (min-width: 768px) 50vw, 80vw",
        ...createFixedPicture(OVERVIEW_WIDTH)
      },
      stats: [
        { label: "Вес", value: "1 590 кг" },
        { label: "База", value: "2 450 мм" },
        { label: "Расход", value: "10,2 л/100 км" }
      ]
    },
    options: [
      {
        title: "Световой пакет Halo",
        description: "LED-дуга с адаптивной подписью и приветственным сценарием для ночных путешествий.",
        price: "+ 360 000 ₽",
        image: {
          alt: "Световая дуга Halo",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      },
      {
        title: "Купол Vision",
        description: "Полупрозрачная панель с умным затемнением и тепловым фильтром на 98% инфракрасного спектра.",
        price: "+ 580 000 ₽",
        image: {
          alt: "Купол Vision",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      },
      {
        title: "Серия Heritage",
        description: "Контрастные вставки Heritage, номера из полированного алюминия и эксклюзивные диски 21".",
        price: "+ 910 000 ₽",
        image: {
          alt: "Серия Heritage",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      }
    ],
    media: {
      title: "История в новом свете",
      text: "Технологии GIR ROS сочетают классику Targa и последнюю электронику управления шасси.",
      image: {
        alt: "GIR ROS Targa на горном серпантине",
        sizes: "(min-width: 1200px) 70vw, 100vw",
        ...createFixedPicture(MEDIA_WIDTH)
      }
    }
  },
  gt: {
    name: "GIR ROS 680 GT",
    mark: "680",
    price: "от 24 900 000 ₽",
    segmentLabel: "GT",
    hero: {
      alt: "GIR ROS 680 GT",
      sizes: "(min-width: 1200px) 60vw, (min-width: 768px) 80vw, 100vw",
      ...createResponsivePicture(HERO_WIDTHS)
    },
    kpi: [
      { n: "3,2", u: "с до 100 км/ч" },
      { n: "368", u: "кВт / 500 л.с." },
      { n: "318", u: "км/ч" }
    ],
    overview: {
      title: "GT без компромиссов",
      text: "Активная аэродинамика второго поколения и легкая платформа из композитов задают новый стандарт для трека.",
      price: "от 24 900 000 ₽",
      image: {
        alt: "Фронтальная проекция GT",
        sizes: "(min-width: 1200px) 28vw, (min-width: 768px) 50vw, 80vw",
        ...createFixedPicture(OVERVIEW_WIDTH)
      },
      stats: [
        { label: "Вес", value: "1 430 кг" },
        { label: "База", value: "2 460 мм" },
        { label: "Расход", value: "11,4 л/100 км" }
      ]
    },
    options: [
      {
        title: "Carbon Track",
        description: "Монокок-кресла, облегченный выхлоп и фиксированное антикрыло с регулировкой угла атаки.",
        price: "+ 1 540 000 ₽",
        image: {
          alt: "Carbon Track",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      },
      {
        title: "Telemetry Pro",
        description: "Многоканальная телеметрия, камеры 360° и анализ траектории в реальном времени через приложение.",
        price: "+ 760 000 ₽",
        image: {
          alt: "Telemetry Pro",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      },
      {
        title: "Пакет Pit Lane",
        description: "Механизм быстрой смены колес, гидравлический домкрат и расширенный набор аэродинамических щитков.",
        price: "+ 1 260 000 ₽",
        image: {
          alt: "Пакет Pit Lane",
          sizes: "(min-width: 1024px) 20vw, 60vw",
          ...createFixedPicture(OPTION_WIDTH)
        }
      }
    ],
    media: {
      title: "Трековый хищник",
      text: "Калибровка подвески и электроники создавалась совместно с командой GT-мастеров GIR ROS Racing.",
      image: {
        alt: "GIR ROS 680 GT на треке",
        sizes: "(min-width: 1200px) 70vw, 100vw",
        ...createFixedPicture(MEDIA_WIDTH)
      }
    }
  }
};

const heroPicture = document.getElementById("heroPicture");
const overviewPicture = document.getElementById("overviewPicture");
const mediaPicture = document.getElementById("mediaPicture");
const titleEl = document.getElementById("title");
const markEl = document.getElementById("mark");
const priceEl = document.getElementById("price");
const overviewPriceEl = document.getElementById("overviewPrice");
const overviewTitleEl = document.getElementById("overviewTitle");
const overviewTextEl = document.getElementById("overviewText");
const overviewStatsEl = document.getElementById("overviewStats");
const kpisEl = document.getElementById("kpis");
const segmentsEl = document.getElementById("segments");
const optionsEl = document.getElementById("options");
const mediaTitleEl = document.getElementById("mediaTitle");
const mediaTextEl = document.getElementById("mediaText");

let currentModelKey = "coupe";

function createSrcset(map) {
  if (!map) return "";
  return Object.entries(map)
    .map(([size, url]) => `${url} ${size}w`)
    .join(", ");
}

function updatePicture(picture, data) {
  if (!picture || !data) return;
  picture.innerHTML = "";

  if (data.webp) {
    const sourceWebp = document.createElement("source");
    sourceWebp.type = "image/webp";
    if (typeof data.webp === "string") {
      sourceWebp.srcset = data.webp;
    } else {
      sourceWebp.srcset = createSrcset(data.webp);
    }
    if (data.sizes) sourceWebp.sizes = data.sizes;
    picture.appendChild(sourceWebp);
  }

  const img = document.createElement("img");
  if (typeof data.jpg === "string") {
    img.src = data.jpg;
  } else {
    const entries = Object.entries(data.jpg || {});
    const largest = entries.reduce(
      (acc, [size, url]) => (Number(size) > acc.size ? { size: Number(size), url } : acc),
      { size: 0, url: "" }
    );
    img.src = largest.url;
    img.srcset = createSrcset(data.jpg);
  }
  img.alt = data.alt || "";
  img.loading = "lazy";
  img.decoding = "async";
  if (data.sizes) {
    img.sizes = data.sizes;
  }
  picture.appendChild(img);
}

function renderKpis(kpis) {
  kpisEl.innerHTML = "";
  kpis.forEach(({ n, u }) => {
    const li = document.createElement("li");
    const num = document.createElement("span");
    num.className = "num";
    num.textContent = n;
    const unit = document.createElement("span");
    unit.className = "unit";
    unit.textContent = u;
    li.append(num);
    li.append(unit);
    kpisEl.append(li);
  });
}

function renderOverview(overview) {
  overviewTitleEl.textContent = overview.title;
  overviewTextEl.textContent = overview.text;
  overviewPriceEl.textContent = overview.price;
  overviewStatsEl.innerHTML = "";
  overview.stats.forEach((stat) => {
    const statEl = document.createElement("dl");
    statEl.className = "overview__stat";
    const dt = document.createElement("dt");
    dt.textContent = stat.label;
    const dd = document.createElement("dd");
    dd.textContent = stat.value;
    statEl.append(dt, dd);
    overviewStatsEl.append(statEl);
  });
  updatePicture(overviewPicture, overview.image);
}

function renderOptions(options) {
  optionsEl.innerHTML = "";
  options.forEach((option, index) => {
    const article = document.createElement("article");
    article.className = "card";
    const picture = document.createElement("picture");
    picture.className = "card__media";
    updatePicture(picture, option.image);
    const title = document.createElement("h3");
    title.textContent = option.title;
    const description = document.createElement("p");
    description.textContent = option.description;
    const meta = document.createElement("div");
    meta.className = "card__meta";
    const price = document.createElement("span");
    price.className = "card__price";
    price.textContent = option.price;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Выбрать";
    button.setAttribute("aria-label", `${option.title} – выбрать опцию`);
    meta.append(price, button);
    article.append(picture, title, description, meta);
    article.setAttribute("tabindex", "0");
    article.setAttribute("aria-describedby", `option-${index}`);
    description.id = `option-${index}`;
    optionsEl.append(article);
  });
}

function renderMedia(media) {
  mediaTitleEl.textContent = media.title;
  mediaTextEl.textContent = media.text;
  updatePicture(mediaPicture, media.image);
}

function renderModel(modelKey) {
  const model = MODELS[modelKey];
  if (!model) return;
  currentModelKey = modelKey;
  titleEl.textContent = model.name;
  markEl.textContent = model.mark;
  priceEl.textContent = model.price;
  renderKpis(model.kpi);
  renderOverview(model.overview);
  renderOptions(model.options);
  renderMedia(model.media);
  updatePicture(heroPicture, model.hero);
  segmentsEl.querySelectorAll(".segment-btn").forEach((btn) => {
    const isActive = btn.dataset.model === modelKey;
    btn.setAttribute("aria-selected", String(isActive));
    btn.tabIndex = isActive ? 0 : -1;
  });
}

function createSegments() {
  Object.keys(MODELS).forEach((key, idx) => {
    const button = document.createElement("button");
    button.className = "segment-btn";
    button.setAttribute("role", "tab");
    button.dataset.model = key;
    button.textContent = MODELS[key].segmentLabel || MODELS[key].mark;
    button.setAttribute("aria-selected", String(key === currentModelKey));
    button.tabIndex = key === currentModelKey ? 0 : -1;
    button.addEventListener("click", () => renderModel(key));
    button.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const buttons = Array.from(segmentsEl.querySelectorAll(".segment-btn"));
        const currentIndex = buttons.indexOf(event.currentTarget);
        const direction = event.key === "ArrowRight" ? 1 : -1;
        let nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
        buttons[nextIndex].focus();
        buttons[nextIndex].click();
      }
    });
    segmentsEl.append(button);
  });
}

function setupReveal() {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          io.unobserve(entry.target);
        }
      }),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = 0.001;
    section.style.transform = "translateY(12px)";
    io.observe(section);
  });
}

createSegments();
renderModel(currentModelKey);
setupReveal();
