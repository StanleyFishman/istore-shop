// Placeholder script for interactive features
console.log('Store loaded');

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider .slide');
    const prevBtn = document.querySelector('.slider .prev');
    const nextBtn = document.querySelector('.slider .next');
    const radios = document.querySelectorAll('.radio-buttons input');
    let current = 0;

    function showSlide(index) {
        slides[current].classList.remove('active');
        radios[current].checked = false;
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        radios[current].checked = true;
    }

    prevBtn.addEventListener('click', () => showSlide(current - 1));
    nextBtn.addEventListener('click', () => showSlide(current + 1));
    radios.forEach((radio, idx) => {
        radio.addEventListener('click', () => showSlide(idx));
    });

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

      document.querySelectorAll('.catalog-row').forEach(row => {
          const items = row.querySelectorAll('.catalog-item');
          items.forEach((item, index) => {
              item.addEventListener('mouseenter', () => {
                  item.classList.add('expanded');
                  const sibling = items[index === 0 ? 1 : 0];
                  sibling.classList.add('shrink');
              });
              item.addEventListener('mouseleave', () => {
                  item.classList.remove('expanded');
                  items.forEach(el => el.classList.remove('shrink'));
              });
          });
      });
  });
