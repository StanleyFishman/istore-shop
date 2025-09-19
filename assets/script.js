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

    function animateValue(el, duration = 1500) {
        const target = el.dataset.value;
        const numbers = target.match(/\d+[.,]?\d*/g);
        if (!numbers) return;
        const parts = target.split(/\d+[.,]?\d*/g);
        const targets = numbers.map(n => parseFloat(n.replace(',', '.')));
        const decimals = numbers.map(n => (n.includes('.') || n.includes(',')) ? (n.split(/[.,]/)[1] || '').length : 0);
        const startTime = performance.now();

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            let text = '';
            for (let i = 0; i < targets.length; i++) {
                let val = targets[i] * progress;
                let str = decimals[i] ? val.toFixed(decimals[i]) : Math.round(val).toString();
                if (numbers[i].includes(',')) {
                    str = str.replace('.', ',');
                }
                text += parts[i] + str;
            }
            text += parts[parts.length - 1];
            el.textContent = text;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        el.textContent = parts[0] + '0' + parts.slice(1).join('');
        requestAnimationFrame(update);
    }

    const HERO_SIZES = '(min-width: 1440px) 1200px, 92vw';
    const createSrcSet = (base, widths, extension) => {
        const cleanExt = extension.startsWith('.') ? extension.slice(1) : extension;
        return widths
            .filter((value, index, array) => array.indexOf(value) === index)
            .sort((a, b) => a - b)
            .map(width => `${base}-${width}.${cleanExt} ${width}w`)
            .join(', ');
    };

    // Populate item page from ITEMS data if present
    if (document.body.classList.contains('item-page') && typeof ITEMS !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const itemId = params.get('id');
        if (itemId && ITEMS[itemId]) {
            const { title, image, hero, detailImage, characteristics } = ITEMS[itemId];
            const titleEl = document.querySelector('.item-title');
            const heroPicture = document.querySelector('#hero-picture');
            const heroImageEl = heroPicture ? heroPicture.querySelector('img') : null;
            const heroSourceWebp = heroPicture ? heroPicture.querySelector('source[type="image/webp"]') : null;
            if (titleEl) {
                titleEl.textContent = title;
                document.title = title;
                titleEl.classList.add(`${itemId}-title`);

            }
            if (heroImageEl) {
                heroImageEl.alt = title;
            }

            if (hero && heroImageEl) {
                const { base, type = 'png', widths = [], src, srcset, sources } = hero;
                const cleanExt = typeof type === 'string' && type.startsWith('.') ? type.slice(1) : type;
                const widthValues = Array.isArray(widths) ? widths : [];
                const hasBase = typeof base === 'string' && base.length > 0;
                const sortedWidths = hasBase
                    ? widthValues
                        .filter((value, index, array) => array.indexOf(value) === index)
                        .sort((a, b) => a - b)
                    : [];
                const hasGeneratedWidths = hasBase && sortedWidths.length > 0;

                if (heroSourceWebp) {
                    const webpConfig = sources && sources.webp;
                    if (typeof webpConfig === 'string' && webpConfig.trim()) {
                        heroSourceWebp.srcset = webpConfig;
                    } else if (webpConfig && typeof webpConfig === 'object') {
                        const { srcset: webpSrcset = '', sizes: webpSizes } = webpConfig;
                        if (webpSrcset.trim()) {
                            heroSourceWebp.srcset = webpSrcset;
                            if (webpSizes) {
                                heroSourceWebp.sizes = webpSizes;
                            }
                        } else {
                            heroSourceWebp.removeAttribute('srcset');
                            heroSourceWebp.removeAttribute('sizes');
                            heroSourceWebp.remove();
                        }
                    } else if (hasGeneratedWidths) {
                        heroSourceWebp.srcset = createSrcSet(base, sortedWidths, 'webp');
                    } else {
                        heroSourceWebp.removeAttribute('srcset');
                        heroSourceWebp.removeAttribute('sizes');
                        heroSourceWebp.remove();
                    }
                }

                let finalSrc = typeof src === 'string' && src.trim() ? src : '';
                let finalSrcset = typeof srcset === 'string' && srcset.trim() ? srcset : '';

                if (hasGeneratedWidths) {
                    const generatedSrcset = createSrcSet(base, sortedWidths, cleanExt);
                    if (!finalSrcset) {
                        finalSrcset = generatedSrcset;
                    }
                    if (!finalSrc) {
                        const preferredWidth = sortedWidths.find(width => width >= 1200) ?? sortedWidths[sortedWidths.length - 1];
                        finalSrc = `${base}-${preferredWidth}.${cleanExt}`;
                    }
                } else if (!finalSrc && hasBase) {
                    finalSrc = `${base}.${cleanExt}`;
                }

                if (!finalSrc && image) {
                    finalSrc = image;
                }

                if (finalSrc) {
                    heroImageEl.src = finalSrc;
                } else {
                    heroImageEl.removeAttribute('src');
                }

                if (finalSrcset) {
                    heroImageEl.srcset = finalSrcset;
                } else {
                    heroImageEl.removeAttribute('srcset');
                }

                const hasWidthDescriptor = typeof finalSrcset === 'string' && /\s\d+w/.test(finalSrcset);
                const webpSrcsetValue = heroSourceWebp ? heroSourceWebp.getAttribute('srcset') || '' : '';
                const webpHasWidthDescriptor = /\s\d+w/.test(webpSrcsetValue);
                if (hasWidthDescriptor) {
                    heroImageEl.sizes = HERO_SIZES;
                    if (heroSourceWebp && webpSrcsetValue) {
                        if (webpHasWidthDescriptor) {
                            heroSourceWebp.sizes = heroSourceWebp.getAttribute('sizes') || HERO_SIZES;
                        } else {
                            heroSourceWebp.removeAttribute('sizes');
                        }
                    }
                } else {
                    heroImageEl.removeAttribute('sizes');
                    if (heroSourceWebp) {
                        heroSourceWebp.removeAttribute('sizes');
                    }
                }
            } else if (heroImageEl && image) {
                heroImageEl.src = image;
                heroImageEl.srcset = image;
                heroImageEl.removeAttribute('sizes');
                if (heroSourceWebp) {
                    heroSourceWebp.removeAttribute('srcset');
                    heroSourceWebp.removeAttribute('sizes');
                    heroSourceWebp.remove();
                }
            }

            const charImgEl = document.querySelector('#characteristics img');
            if (charImgEl) {
                let secondaryImage = detailImage || '';

                if (!secondaryImage && typeof image === 'string') {
                    secondaryImage = image.replace(/_pic1(\.[a-z]+)$/i, '_pic2$1');
                    if (secondaryImage === image) {
                        secondaryImage = image.replace(/(\.[a-z]+)$/i, '_pic2$1');
                    }
                }

                if ((!secondaryImage || secondaryImage === image) && hero) {
                    const { base, type = 'png', widths = [], src, preview } = hero;
                    if (preview && typeof preview === 'string') {
                        secondaryImage = preview;
                    } else if (src && typeof src === 'string' && src.trim()) {
                        secondaryImage = src;
                    } else if (base && typeof base === 'string') {
                        const cleanExt = type.startsWith('.') ? type.slice(1) : type;
                        const widthValues = Array.isArray(widths) ? widths : [];
                        const sortedWidths = widthValues
                            .filter((value, index, array) => array.indexOf(value) === index)
                            .sort((a, b) => a - b);
                        const previewWidth = sortedWidths.find(width => width >= 800) ?? sortedWidths[0];
                        secondaryImage = previewWidth
                            ? `${base}-${previewWidth}.${cleanExt}`
                            : `${base}.${cleanExt}`;
                    }
                }

                if (!secondaryImage && heroImageEl) {
                    secondaryImage = heroImageEl.currentSrc || heroImageEl.src;
                }

                if (secondaryImage) {
                    charImgEl.src = secondaryImage;
                    charImgEl.alt = `${title} details`;
                }
            }

            const statsContainer = document.querySelector('.characteristics-stats');
            if (statsContainer && Array.isArray(characteristics)) {
                characteristics.forEach(({ value, description }) => {
                    const stat = document.createElement('div');
                    stat.className = 'stat-item';
                    stat.innerHTML = `\n                        <div class="stat-value" data-value="${value}"></div>\n                        <div class="stat-desc">${description}</div>\n                    `;
                    statsContainer.appendChild(stat);
                });

                const statValues = statsContainer.querySelectorAll('.stat-value');
                const statsObserver = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateValue(entry.target);
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                statValues.forEach(el => statsObserver.observe(el));
            }
        }
    }
});
