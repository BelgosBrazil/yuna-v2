// ===== LANDING PAGE MÉDICOS - JAVASCRIPT =====

// ===== MENU MOBILE =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
}

// ===== HEADER SCROLL =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        header.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
    }

    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL CTA =====
const scrollCta = document.querySelector('.scroll-cta');
if (scrollCta) {
    scrollCta.addEventListener('click', () => {
        const nextSection = document.querySelector('#sobre');
        if (nextSection) {
            const headerOffset = 80;
            const elementPosition = nextSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ===== ANIMAÇÃO ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Adicionar classe para animação em elementos específicos
const animateElements = document.querySelectorAll('.stat-card, .benefit-card');
animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// ===== VIDEO PLACEHOLDER =====
const videoPlaceholder = document.querySelector('.video-placeholder');

if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        console.log('Vídeo clicado - adicione aqui o código para reproduzir o vídeo');
    });
}

// ===== CARROSSEL MODERNO DE IMAGENS =====
const carouselTrack = document.querySelector('.carousel-track');
const carouselImages = document.querySelectorAll('.carousel-image');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

let currentSlide = 0;
let slidesToShow = 3; // Mostra 3 imagens por vez
let autoplayInterval;

// Detectar largura da tela para responsividade
function updateSlidesToShow() {
    if (window.innerWidth <= 768) {
        slidesToShow = 1;
    } else if (window.innerWidth <= 1024) {
        slidesToShow = 2;
    } else {
        slidesToShow = 3;
    }
}

// Calcular o número máximo de slides
function getMaxSlides() {
    return Math.max(0, carouselImages.length - slidesToShow);
}

// Atualizar posição do carrossel
function updateCarousel() {
    const slideWidth = carouselImages[0].offsetWidth;
    const gap = 24; // 1.5rem = 24px
    const offset = currentSlide * (slideWidth + gap);
    
    carouselTrack.style.transform = `translateX(-${offset}px)`;
    
    // Atualizar estado dos botões
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide >= getMaxSlides();
}

// Navegar para o próximo slide
function nextSlide() {
    if (currentSlide < getMaxSlides()) {
        currentSlide++;
        updateCarousel();
    }
}

// Navegar para o slide anterior
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}

// Event listeners para os botões
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Autoplay
function startCarouselAutoplay() {
    autoplayInterval = setInterval(() => {
        if (currentSlide >= getMaxSlides()) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        updateCarousel();
    }, 3000);
}

function stopCarouselAutoplay() {
    clearInterval(autoplayInterval);
}

// Iniciar autoplay quando a seção estiver visível
const estruturaSection = document.querySelector('.estrutura-section');
if (estruturaSection && carouselTrack) {
    updateSlidesToShow();
    updateCarousel();
    
    const estruturaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCarouselAutoplay();
            } else {
                stopCarouselAutoplay();
            }
        });
    }, { threshold: 0.3 });
    
    estruturaObserver.observe(estruturaSection);
}

// Atualizar ao redimensionar a janela
window.addEventListener('resize', debounce(() => {
    updateSlidesToShow();
    currentSlide = Math.min(currentSlide, getMaxSlides());
    updateCarousel();
}, 250));

// ===== BOTÃO VOLTAR AO TOPO =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #002855;
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// ===== DEBOUNCE PARA EVENTOS DE SCROLL E RESIZE =====
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce a eventos pesados
const debouncedScroll = debounce(() => {
    // Código de scroll otimizado
}, 10);

const debouncedResize = debounce(() => {
    // Código de resize otimizado
}, 250);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', debouncedResize);

// ===== ANALYTICS =====
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Rastrear cliques em CTAs
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const buttonText = btn.textContent.trim();
        trackEvent('CTA', 'click', buttonText);
    });
});

// ===== CARROSSEL DE HISTÓRIAS =====
const historiasCarouselTrack = document.querySelector('.historias-carousel-track');
const historiasSlides = document.querySelectorAll('.historias-slide');
const historiasPrevBtn = document.querySelector('.historias-carousel-prev');
const historiasNextBtn = document.querySelector('.historias-carousel-next');
const historiasVideoModal = document.getElementById('historiasVideoModal');
const historiasModalVideo = document.getElementById('historiasModalVideo');
const historiasModalClose = document.querySelector('.historias-video-modal-close');

let historiasCurrentSlide = 0;

// Atualizar posição do carrossel
function updateHistoriasCarousel() {
    if (historiasSlides.length === 0) return;
    
    const slideWidth = historiasSlides[0].offsetWidth;
    const offset = -historiasCurrentSlide * slideWidth;
    historiasCarouselTrack.style.transform = `translateX(${offset}px)`;
    
    // Atualizar estado dos botões
    if (historiasPrevBtn) {
        historiasPrevBtn.disabled = historiasCurrentSlide === 0;
        historiasPrevBtn.style.opacity = historiasCurrentSlide === 0 ? '0.5' : '1';
    }
    
    if (historiasNextBtn) {
        historiasNextBtn.disabled = historiasCurrentSlide >= historiasSlides.length - 1;
        historiasNextBtn.style.opacity = historiasCurrentSlide >= historiasSlides.length - 1 ? '0.5' : '1';
    }
    
    // Pausar todos os vídeos e resetar
    historiasSlides.forEach((slide, index) => {
        const video = slide.querySelector('video');
        const thumbnail = slide.querySelector('.historias-video-thumbnail');
        const overlay = slide.querySelector('.historias-video-overlay');
        
        if (video) {
            if (index !== historiasCurrentSlide) {
                video.pause();
                video.currentTime = 0;
                
                // Resetar overlay
                if (overlay) {
                    overlay.style.opacity = '1';
                }
                if (thumbnail) {
                    thumbnail.classList.remove('playing');
                }
            }
        }
    });
}

// Navegar para o próximo slide
function nextHistoriasSlide() {
    if (historiasCurrentSlide < historiasSlides.length - 1) {
        historiasCurrentSlide++;
        updateHistoriasCarousel();
    }
}

// Navegar para o slide anterior
function prevHistoriasSlide() {
    if (historiasCurrentSlide > 0) {
        historiasCurrentSlide--;
        updateHistoriasCarousel();
    }
}

// Event listeners para os botões do carrossel
if (historiasNextBtn) {
    historiasNextBtn.addEventListener('click', nextHistoriasSlide);
}

if (historiasPrevBtn) {
    historiasPrevBtn.addEventListener('click', prevHistoriasSlide);
}

// Abrir modal ao clicar no vídeo
function openHistoriasVideoModal(videoSrc) {
    if (historiasModalVideo && historiasVideoModal) {
        const source = historiasModalVideo.querySelector('source');
        if (source) {
            source.src = videoSrc;
        } else {
            historiasModalVideo.src = videoSrc;
        }
        historiasModalVideo.load();
        historiasVideoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reproduzir o vídeo após carregar (apenas uma vez)
        const playVideoOnce = function() {
            historiasModalVideo.play().catch(err => {
                console.log('Erro ao reproduzir vídeo no modal:', err);
            });
            historiasModalVideo.removeEventListener('loadeddata', playVideoOnce);
        };
        historiasModalVideo.addEventListener('loadeddata', playVideoOnce);
    }
}

// Configurar reprodução de vídeo inline
function setupVideoHover() {
    // Reconfigurar event listeners
    const historiasSlides = document.querySelectorAll('.historias-slide');
    historiasSlides.forEach(slide => {
        const videoThumbnail = slide.querySelector('.historias-video-thumbnail');
        if (videoThumbnail) {
            const video = videoThumbnail.querySelector('video');
            const overlay = videoThumbnail.querySelector('.historias-video-overlay');
            
            if (video) {
                // Reproduzir vídeo inline ao clicar no thumbnail/overlay
                videoThumbnail.addEventListener('click', (e) => {
                    // Se clicar nos controles do vídeo, não fazer nada
                    if (e.target.tagName === 'VIDEO' || e.target.closest('video')) {
                        return;
                    }
                    
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Reproduzir ou pausar o vídeo
                    if (video.paused) {
                        // Pausar todos os outros vídeos
                        document.querySelectorAll('.historias-video-thumbnail video').forEach(v => {
                            if (v !== video && !v.paused) {
                                v.pause();
                            }
                        });
                        
                        video.play();
                        if (overlay) {
                            overlay.style.opacity = '0';
                            videoThumbnail.classList.add('playing');
                        }
                    } else {
                        video.pause();
                        if (overlay) {
                            overlay.style.opacity = '1';
                            videoThumbnail.classList.remove('playing');
                        }
                    }
                });
                
                // Mostrar overlay quando o vídeo pausar
                video.addEventListener('pause', () => {
                    if (overlay && video.currentTime > 0) {
                        overlay.style.opacity = '1';
                        videoThumbnail.classList.remove('playing');
                    }
                });
                
                // Esconder overlay quando o vídeo iniciar
                video.addEventListener('play', () => {
                    if (overlay) {
                        overlay.style.opacity = '0';
                        videoThumbnail.classList.add('playing');
                    }
                });
                
                // Mostrar overlay quando o vídeo terminar
                video.addEventListener('ended', () => {
                    if (overlay) {
                        overlay.style.opacity = '1';
                        videoThumbnail.classList.remove('playing');
                    }
                    video.currentTime = 0;
                });
            }
        }
    });
}

// Inicializar carrossel
if (historiasCarouselTrack && historiasSlides.length > 0) {
    updateHistoriasCarousel();
    // Aguardar um pouco para garantir que os vídeos foram atualizados pelo Firebase
    setTimeout(() => {
        setupVideoHover();
    }, 1500);
}

// Fechar modal
function closeHistoriasVideoModal() {
    if (historiasModalVideo) {
        historiasModalVideo.pause();
        historiasModalVideo.currentTime = 0;
        const source = historiasModalVideo.querySelector('source');
        if (source) {
            source.src = '';
        } else {
            historiasModalVideo.src = '';
        }
        historiasModalVideo.load();
    }
    if (historiasVideoModal) {
        historiasVideoModal.classList.remove('active');
    }
    document.body.style.overflow = '';
}

if (historiasModalClose) {
    historiasModalClose.addEventListener('click', closeHistoriasVideoModal);
}

// Fechar modal ao clicar no overlay
if (historiasVideoModal) {
    const modalOverlay = historiasVideoModal.querySelector('.historias-video-modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeHistoriasVideoModal);
    }
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && historiasVideoModal.classList.contains('active')) {
            closeHistoriasVideoModal();
        }
    });
}

// Atualizar carrossel ao redimensionar
window.addEventListener('resize', debounce(() => {
    if (historiasCarouselTrack) {
        updateHistoriasCarousel();
    }
}, 250));

// ===== INICIALIZAR VÍDEOS DO FIREBASE STORAGE =====
// Aguardar o carregamento do DOM e do Firebase
document.addEventListener('DOMContentLoaded', async () => {
    // Aguardar um pouco para garantir que o Firebase está carregado
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Inicializar vídeos do Firebase Storage
    if (window.firebaseVideos && window.firebaseVideos.initializeVideos) {
        try {
            await window.firebaseVideos.initializeVideos();
            // Reconfigurar event listeners após os vídeos serem atualizados
            setTimeout(() => {
                if (typeof setupVideoHover === 'function') {
                    setupVideoHover();
                }
            }, 500);
        } catch (error) {
            console.error('Erro ao inicializar vídeos do Firebase:', error);
        }
    } else {
        console.warn('Firebase Videos utility não está disponível');
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c🏥 Yuna - Landing Page para Médicos', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️', 'color: #10b981; font-size: 14px;');

