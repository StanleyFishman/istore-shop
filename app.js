// Hero parallax
const heroImg = document.querySelector('.hero-image');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.02; // 2%
    heroImg.style.transform = `translateY(${offset}px)`;
  });
}

// Catalog hover reallocation
const catalogRow = document.querySelector('.catalog-row');
if (catalogRow) {
  const cards = catalogRow.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      catalogRow.classList.add('row--hover');
      card.classList.add('is-hovered');
    });
    card.addEventListener('mouseleave', () => {
      catalogRow.classList.remove('row--hover');
      card.classList.remove('is-hovered');
    });
  });
}

// Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabIndicator = document.querySelector('.tab-indicator');
const tabPanels = document.querySelectorAll('.tab-panel');
function activateTab(btn){
  tabButtons.forEach(b=>b.classList.remove('is-active'));
  btn.classList.add('is-active');
  const id = btn.dataset.tab;
  tabPanels.forEach(p=>p.classList.toggle('is-active', p.id === id));
  if(tabIndicator){
    tabIndicator.style.width = `${btn.offsetWidth}px`;
    tabIndicator.style.transform = `translateX(${btn.offsetLeft}px)`;
  }
}
if(tabButtons.length){
  activateTab(tabButtons[0]);
  tabButtons.forEach(btn=>btn.addEventListener('click',()=>activateTab(btn)));
}
