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
        const heroSwiper = new Swiper('.hero-swiper', {
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            spaceBetween: 20,
            autoplay: { delay: 3500, disableOnInteraction: false },
            speed: 1500,
            pagination: {
                el: '.hero-swiper .swiper-pagination',
                clickable: true,
            },
            on: {
                init: setActiveSlide,
                slideChangeTransitionStart: setActiveSlide,
            }
        });

        function setActiveSlide(swiper) {
            swiper.slides.forEach(slide => slide.classList.remove('is-active'));
            const active = swiper.slides[swiper.activeIndex];
            if (active) active.classList.add('is-active');
        }

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
});
