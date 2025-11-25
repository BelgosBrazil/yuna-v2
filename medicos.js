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

function logAnalyticsEvent(name, params) {
    try {
        if (window.firebaseAnalytics && typeof window.firebaseAnalytics.logEvent === 'function') {
            window.firebaseAnalytics.logEvent(name, params || {});
        }
    } catch (e) { }
    if (typeof gtag !== 'undefined') {
        gtag('event', name, params || {});
    }
}

function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    logAnalyticsEvent(action, { event_category: category, event_label: label });
}

// Rastrear cliques em CTAs
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const buttonText = btn.textContent.trim();
        trackEvent('CTA', 'click', buttonText);
    });
});

const openChatbotBtn = document.getElementById('open-chatbot');
if (openChatbotBtn) {
    openChatbotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const section = document.getElementById('chatbot-view');
        if (section) {
            section.style.display = 'block';
            const headerOffset = 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            logAnalyticsEvent('section_view', { section_id: 'chatbot-view' });
        }
    });
}

const openCallFormBtn = document.getElementById('open-call-form');
if (openCallFormBtn) {
    openCallFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const section = document.getElementById('call-form');
        if (section) {
            section.style.display = 'block';
            const headerOffset = 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            logAnalyticsEvent('section_view', { section_id: 'call-form' });
        }
    });
}

const callForm = document.getElementById('callRequestForm');
if (callForm) {
    callForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome')?.value?.trim() || '';
        const email = document.getElementById('email')?.value?.trim() || '';
        const telefone = document.getElementById('telefone')?.value?.trim() || '';
        const mensagem = document.getElementById('mensagem')?.value?.trim() || '';
        const statusEl = document.getElementById('callFormMessage');
        const submitBtn = callForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        }
        try {
            const db = window.firebaseFirestore;
            if (!db) {
                throw new Error('Firestore indisponível');
            }
            const ts = firebase.firestore.FieldValue.serverTimestamp();
            await db.collection('messages').add({ nome, email, telefone, mensagem, createdAt: ts });
            logAnalyticsEvent('call_form_submit', { message_length: mensagem.length, has_email: !!email, has_phone: !!telefone });
            const subject = `Novo contato - LP Médicos: ${nome}`;
            const htmlContent = `
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light">
    <title>${subject}</title>
  </head>
  <body style="margin:0; padding:0; background:#EDEBE8; font-family:Arial, sans-serif; color:#002855;">
    <div style="max-width:600px; margin:0 auto; padding:24px;">
      <div style="background:#002855; color:#ffffff; padding:20px; border-radius:12px 12px 0 0; text-align:center;">
        <h1 style="margin:0; font-size:20px; line-height:1.3;">YUNA — Novo contato</h1>
        <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">LP Médicos</p>
      </div>
      <div style="background:#ffffff; border:1px solid rgba(0,40,85,0.12); border-left:4px solid #FDD086; border-right:4px solid #FF8091; padding:24px; border-radius:0 0 12px 12px;">
        <p style="margin:0 0 16px; font-size:14px; color:#002855;">Recebemos um novo contato pela landing page de Médicos.</p>
        <table style="width:100%; border-collapse:collapse;">
          <tbody>
            <tr>
              <td style="padding:10px; width:140px; font-weight:bold; color:#002855; background:#f7f7f7; border:1px solid #eee;">Nome</td>
              <td style="padding:10px; color:#333; border:1px solid #eee;">${nome}</td>
            </tr>
            <tr>
              <td style="padding:10px; font-weight:bold; color:#002855; background:#f7f7f7; border:1px solid #eee;">Email</td>
              <td style="padding:10px; color:#333; border:1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding:10px; font-weight:bold; color:#002855; background:#f7f7f7; border:1px solid #eee;">Telefone</td>
              <td style="padding:10px; color:#333; border:1px solid #eee;">${telefone}</td>
            </tr>
            <tr>
              <td style="padding:10px; font-weight:bold; color:#002855; background:#f7f7f7; border:1px solid #eee;">Mensagem</td>
              <td style="padding:10px; color:#333; border:1px solid #eee;">${mensagem.replace(/\n/g, '<br>')}</td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top:20px; padding:12px; background:#fff8e6; border:1px solid #FDD086; border-radius:8px; color:#5b4a00;">
          <strong style="display:block; margin-bottom:6px;">Resumo</strong>
          <span style="font-size:13px;">${subject}</span>
        </div>
      </div>
      <div style="text-align:center; font-size:12px; color:#64748b; margin-top:16px;">
        <p style="margin:4px 0;">Yuna</p>
        <p style="margin:4px 0;">Este é um email automático</p>
      </div>
    </div>
  </body>
</html>`;
            const mailDoc = {
                to: ['relacionamento@yuna.com.br', 'manuel.cid@yuna.com.br'],
                message: {
                    html: htmlContent,
                    text: subject,
                    subject: subject
                }
            };
            console.log('📧 Criando documento de email na coleção "mail":', mailDoc);
            const docRef = await db.collection('mail').add(mailDoc);
            console.log('✅ Documento de email criado com ID:', docRef.id);
            console.log('📍 Path completo:', docRef.path);
            if (statusEl) {
                statusEl.style.display = 'block';
                statusEl.classList.remove('error');
                statusEl.classList.add('success');
                statusEl.textContent = 'Solicitação enviada com sucesso.';
            }
            callForm.reset();
        } catch (err) {
            logAnalyticsEvent('call_form_error', { code: 'submit_failed' });
            if (statusEl) {
                statusEl.style.display = 'block';
                statusEl.classList.remove('success');
                statusEl.classList.add('error');
                statusEl.textContent = 'Erro ao enviar. Tente novamente.';
            }
            console.error(err);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar';
            }
        }
    });
}

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
    historiasNextBtn.addEventListener('click', () => { nextHistoriasSlide(); logAnalyticsEvent('carousel_nav', { component: 'historias', direction: 'next' }); });
}

if (historiasPrevBtn) {
    historiasPrevBtn.addEventListener('click', () => { prevHistoriasSlide(); logAnalyticsEvent('carousel_nav', { component: 'historias', direction: 'prev' }); });
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
        const playVideoOnce = function () {
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
                    logAnalyticsEvent('video_pause', { video_src: video.currentSrc || videoThumbnail.getAttribute('data-video') || '' });
                });

                // Esconder overlay quando o vídeo iniciar
                video.addEventListener('play', () => {
                    if (overlay) {
                        overlay.style.opacity = '0';
                        videoThumbnail.classList.add('playing');
                    }
                    logAnalyticsEvent('video_play', { video_src: video.currentSrc || videoThumbnail.getAttribute('data-video') || '' });
                });

                // Mostrar overlay quando o vídeo terminar
                video.addEventListener('ended', () => {
                    if (overlay) {
                        overlay.style.opacity = '1';
                        videoThumbnail.classList.remove('playing');
                    }
                    video.currentTime = 0;
                    logAnalyticsEvent('video_complete', { video_src: video.currentSrc || videoThumbnail.getAttribute('data-video') || '' });
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
    (function () {
        var totalVisibleMs = 0;
        var lastVisibleStart = document.hidden ? null : Date.now();
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                if (lastVisibleStart) {
                    totalVisibleMs += Date.now() - lastVisibleStart;
                    lastVisibleStart = null;
                }
            } else {
                lastVisibleStart = Date.now();
            }
        });
        setInterval(function () {
            var visibleNowMs = lastVisibleStart ? (Date.now() - lastVisibleStart) : 0;
            var engagement = totalVisibleMs + visibleNowMs;
            logAnalyticsEvent('engagement_heartbeat', { engagement_time_msec: engagement });
        }, 15000);
        window.addEventListener('pagehide', function () {
            var finalMs = totalVisibleMs + (lastVisibleStart ? (Date.now() - lastVisibleStart) : 0);
            logAnalyticsEvent('engagement_time', { engagement_time_msec: finalMs });
        });
    })();
});

// ===== CONSOLE MESSAGE =====
console.log('%c🏥 Yuna - Landing Page para Médicos', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️', 'color: #10b981; font-size: 14px;');

