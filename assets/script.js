// Placeholder script for interactive features
console.log('Store loaded');

document.addEventListener('DOMContentLoaded', () => {
    const requestBtn = document.querySelector('.request-btn');
    const modal = document.getElementById('request-modal');
    const closeModal = document.querySelector('.close-modal');

    if (requestBtn && modal && closeModal) {
        requestBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    const hamburger = document.querySelector('.hamburger');
    const header = document.querySelector('header');
    if (hamburger && header) {
        hamburger.addEventListener('click', () => {
            header.classList.toggle('open');
        });
    }

    const itemNavLinks = document.querySelectorAll('.item-nav-btn[href^="#"]');
    itemNavLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    if (window.Swiper) {
        new Swiper('.hero-swiper', {
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            initialSlide: 1,
            spaceBetween: 20,
            autoplay: { delay: 3500, disableOnInteraction: false },
            speed: 1500,
            pagination: {
                el: '.hero-swiper .swiper-pagination',
                clickable: true,
            },
        });

        new Swiper('.top-sales-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            navigation: {
                nextEl: '.top-sales-swiper .swiper-button-next',
                prevEl: '.top-sales-swiper .swiper-button-prev',
            },
            pagination: {
                el: '.top-sales-swiper .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                600: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }

    const catalogItems = document.querySelectorAll('.catalog-grid .catalog-item');
    const expand = 'calc(55% - 6px)';
    const shrink = 'calc(45% - 6px)';

    catalogItems.forEach((item, idx) => {
        item.addEventListener('mouseenter', () => {
            const pairIndex = idx % 2 === 0 ? idx + 1 : idx - 1;
            item.style.flexBasis = expand;
            if (catalogItems[pairIndex]) {
                catalogItems[pairIndex].style.flexBasis = shrink;
            }
        });

        item.addEventListener('mouseleave', () => {
            const pairIndex = idx % 2 === 0 ? idx + 1 : idx - 1;
            item.style.flexBasis = '';
            if (catalogItems[pairIndex]) {
                catalogItems[pairIndex].style.flexBasis = '';
            }
        });
    });

    // Populate item page from ITEMS data if present
    if (document.body.classList.contains('item-page') && typeof ITEMS !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const itemId = params.get('id');
        if (itemId && ITEMS[itemId]) {
            const { title, image, characteristics } = ITEMS[itemId];
            const titleEl = document.querySelector('.item-title');
            const imageEl = document.querySelector('#image-wrapper img');
            if (titleEl) {
                titleEl.textContent = title;
                document.title = title;
            }
            if (imageEl) {
                imageEl.src = image;
                imageEl.alt = itemId;
            }

            const charImgEl = document.querySelector('#characteristics img');
            if (charImgEl) {
                let secondaryImage = image.replace(/_pic1(\.[a-z]+)$/i, '_pic2$1');
                if (secondaryImage === image) {
                    secondaryImage = image.replace(/(\.[a-z]+)$/i, '_pic2$1');
                }
                charImgEl.src = secondaryImage;
                charImgEl.alt = itemId + ' details';
            }

            const statsContainer = document.querySelector('.characteristics-stats');
            if (statsContainer && Array.isArray(characteristics)) {
                characteristics.forEach(({ value, description }) => {
                    const stat = document.createElement('div');
                    stat.className = 'stat-item';
                    stat.innerHTML = `\n                        <div class="stat-value">${value}</div>\n                        <div class="stat-desc">${description}</div>\n                    `;
                    statsContainer.appendChild(stat);
                });
            }
        }
    }
});
