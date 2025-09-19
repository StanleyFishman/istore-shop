const products = [
  {
    id: "m1",
    name: "Чешуирователь 600",
    badge: "AISI 316L",
    img: "assets/images/item1.png",
    specs: [
      "Разгон 0–100 кг/ч",
      "Мощность: 7.5 кВт",
      "Производительность: 300 кг/ч",
      "Материал: AISI 316L"
    ],
    filters: { model: "base", material: "316L", power: "7.5", throughput: "300", automation: "basic" }
  },
  {
    id: "m2",
    name: "Чешуирователь 900 PRO",
    badge: "AISI 304L",
    img: "assets/images/item2.png",
    specs: [
      "Разгон 0–100 кг/ч",
      "Мощность: 5.5 кВт",
      "Производительность: 250 кг/ч",
      "Материал: AISI 304L"
    ],
    filters: { model: "pro", material: "304L", power: "5.5", throughput: "250", automation: "smart" }
  },
  {
    id: "m3",
    name: "Чешуирователь Ultra 1200",
    badge: "Ni-сплав",
    img: "assets/images/item3.png",
    specs: [
      "Разгон 0–100 кг/ч",
      "Мощность: 9.0 кВт",
      "Производительность: 400 кг/ч",
      "Материал: Ni-сплав"
    ],
    filters: { model: "ultra", material: "Ni", power: "9.0", throughput: "400", automation: "smart" }
  }
];

const FILTER_STORAGE_KEY = "configuratorFilters";
const COMPARE_STORAGE_KEY = "configuratorCompare";

const filtersState = {
  model: new Set(),
  material: new Set(),
  power: new Set(),
  throughput: new Set(),
  automation: new Set()
};

const compareState = new Set();

const cardsContainer = document.getElementById("cards");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");
const compareCountEl = document.getElementById("compare-count");
const compareIndicator = document.querySelector(".compare-indicator");

function loadState() {
  try {
    const storedFilters = JSON.parse(localStorage.getItem(FILTER_STORAGE_KEY));
    if (storedFilters && typeof storedFilters === "object") {
      Object.keys(filtersState).forEach((key) => {
        const values = storedFilters[key];
        if (Array.isArray(values)) {
          filtersState[key] = new Set(values);
        }
      });
    }
  } catch (error) {
    console.error("Не удалось загрузить фильтры", error);
  }

  try {
    const storedCompare = JSON.parse(localStorage.getItem(COMPARE_STORAGE_KEY));
    if (Array.isArray(storedCompare)) {
      storedCompare.forEach((id) => compareState.add(id));
    }
  } catch (error) {
    console.error("Не удалось загрузить список сравнения", error);
  }
}

function saveFilters() {
  const serialized = Object.fromEntries(
    Object.entries(filtersState).map(([key, value]) => [key, Array.from(value)])
  );
  localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(serialized));
}

function saveCompare() {
  localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(Array.from(compareState)));
}

function applyFiltersToInputs() {
  document
    .querySelectorAll(".filters input[type='checkbox']")
    .forEach((input) => {
      const group = input.name;
      const set = filtersState[group];
      if (set) {
        input.checked = set.has(input.value);
      }
    });

  updateAllCounts();
}

function updateAllCounts() {
  Object.keys(filtersState).forEach(updateCountBadge);
}

function updateCountBadge(group) {
  const count = filtersState[group]?.size ?? 0;
  document
    .querySelectorAll(`[data-count="${group}"]`)
    .forEach((badge) => {
      if (count > 0) {
        badge.textContent = String(count);
        badge.hidden = false;
        badge.classList.add("is-active");
      } else {
        badge.hidden = true;
        badge.classList.remove("is-active");
      }
    });
}

function getActiveFiltersSummary() {
  return Object.fromEntries(
    Object.entries(filtersState).map(([key, set]) => [key, Array.from(set)])
  );
}

function filterProducts() {
  const summary = getActiveFiltersSummary();
  return products.filter((product) =>
    Object.entries(summary).every(([key, values]) => {
      if (!values || values.length === 0) {
        return true;
      }
      const productValue = product.filters[key];
      if (Array.isArray(productValue)) {
        return productValue.some((value) => values.includes(value));
      }
      return values.includes(productValue);
    })
  );
}

function createCard(product) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = product.id;
  if (compareState.has(product.id)) {
    card.classList.add("is-compared");
  }

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = product.badge;
  card.appendChild(badge);

  const thumb = document.createElement("div");
  thumb.className = "thumb";
  const img = document.createElement("img");
  img.src = product.img;
  img.alt = product.name;
  thumb.appendChild(img);
  card.appendChild(thumb);

  const title = document.createElement("h3");
  title.textContent = product.name;
  card.appendChild(title);

  const specs = document.createElement("ul");
  specs.className = "specs";
  specs.setAttribute("role", "list");
  product.specs.forEach((spec) => {
    const item = document.createElement("li");
    item.textContent = spec;
    specs.appendChild(item);
  });
  card.appendChild(specs);

  const actions = document.createElement("div");
  actions.className = "actions";

  const selectBtn = document.createElement("button");
  selectBtn.className = "btn primary";
  selectBtn.type = "button";
  selectBtn.textContent = "Выбрать модель";
  selectBtn.addEventListener("click", () => {
    window.alert(`Вы выбрали ${product.name}`);
  });

  const compareBtn = document.createElement("button");
  compareBtn.className = "btn ghost";
  compareBtn.type = "button";
  compareBtn.textContent = "Сравнить";
  compareBtn.setAttribute("aria-pressed", compareState.has(product.id) ? "true" : "false");
  compareBtn.addEventListener("click", () => {
    toggleCompare(product.id);
  });

  actions.append(selectBtn, compareBtn);
  card.appendChild(actions);

  return card;
}

function renderCards() {
  const filtered = filterProducts();
  cardsContainer.innerHTML = "";

  if (filtered.length === 0) {
    resultsCount.textContent = "0";
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  resultsCount.textContent = String(filtered.length);

  const fragment = document.createDocumentFragment();
  filtered.forEach((product) => {
    fragment.appendChild(createCard(product));
  });

  cardsContainer.appendChild(fragment);
  updateCompareHighlights();
}

function toggleCompare(productId) {
  if (compareState.has(productId)) {
    compareState.delete(productId);
  } else {
    compareState.add(productId);
  }
  updateCompareHighlights();
  updateCompareIndicator();
  saveCompare();
}

function updateCompareHighlights() {
  document.querySelectorAll(".card").forEach((card) => {
    const id = card.dataset.id;
    const isActive = compareState.has(id);
    card.classList.toggle("is-compared", isActive);
    const compareBtn = card.querySelector(".btn.ghost");
    if (compareBtn) {
      compareBtn.setAttribute("aria-pressed", isActive ? "true" : "false");
      compareBtn.textContent = isActive ? "В сравнении" : "Сравнить";
    }
  });
}

function updateCompareIndicator() {
  const count = compareState.size;
  compareCountEl.textContent = String(count);
  if (compareIndicator) {
    compareIndicator.classList.toggle("is-active", count > 0);
  }
}

function clearFilters() {
  Object.keys(filtersState).forEach((key) => filtersState[key].clear());
  document
    .querySelectorAll(".filters input[type='checkbox']")
    .forEach((input) => {
      input.checked = false;
    });
  updateAllCounts();
  saveFilters();
  renderCards();
}

function handleFilterChange(event) {
  const { name: group, value, checked } = event.target;
  const set = filtersState[group];
  if (!set) return;
  if (checked) {
    set.add(value);
  } else {
    set.delete(value);
  }
  updateCountBadge(group);
  saveFilters();
  renderCards();
}

function setupAccordion() {
  document.querySelectorAll(".filter-group").forEach((group) => {
    const toggle = group.querySelector(".group-toggle");
    const body = group.querySelector(".group-body");
    const isOpen = group.classList.contains("is-open");
    group.classList.toggle("is-collapsed", !isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      group.classList.toggle("is-open");
      group.classList.toggle("is-collapsed");
      if (body) {
        body.hidden = !group.classList.contains("is-open");
      }
    });

    if (body && !isOpen) {
      body.hidden = true;
    }
  });
}

function init() {
  loadState();
  setupAccordion();
  applyFiltersToInputs();
  updateCompareIndicator();

  document
    .querySelectorAll(".filters input[type='checkbox']")
    .forEach((input) => input.addEventListener("change", handleFilterChange));

  const resetBtn = document.querySelector(".reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      clearFilters();
    });
  }

  renderCards();

  if (compareState.size > 0) {
    updateCompareHighlights();
  }
}

document.addEventListener("DOMContentLoaded", init);
