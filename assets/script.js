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
});
