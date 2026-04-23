// ===== LANDING PAGE PACIENTES - JAVASCRIPT =====

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

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fechar todos os itens
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Abrir o item clicado se não estava ativo
        if (!isActive) {
            item.classList.add('active');
        }
    });
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
const animateElements = document.querySelectorAll('.diferencial-card, .depoimento-card');
animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// ===== VIDEO MODAL =====
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoThumbnails = document.querySelectorAll('.video-thumbnail');
const modalClose = document.querySelector('.video-modal-close');
const modalOverlay = document.querySelector('.video-modal-overlay');

// Carregar primeira frame dos vídeos para usar como thumbnail
videoThumbnails.forEach(thumbnail => {
    const video = thumbnail.querySelector('video');
    if (video) {
        video.addEventListener('loadeddata', () => {
            video.currentTime = 1; // Pega um frame no segundo 1
        });
        video.addEventListener('seeked', () => {
            // Frame carregado
        });
    }
});

// Abrir modal ao clicar no vídeo
function openVideoModal(videoSrc) {
    if (modalVideo && videoModal) {
        const source = modalVideo.querySelector('source');
        if (source) {
            source.src = videoSrc;
        } else {
            modalVideo.src = videoSrc;
        }
        modalVideo.load();
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reproduzir o vídeo após carregar (apenas uma vez)
        const playVideoOnce = function() {
            modalVideo.play().catch(err => {
                console.log('Erro ao reproduzir vídeo no modal:', err);
            });
            modalVideo.removeEventListener('loadeddata', playVideoOnce);
        };
        modalVideo.addEventListener('loadeddata', playVideoOnce);
    }
}

// Abrir modal ao clicar no vídeo
videoThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const video = thumbnail.querySelector('video');
        if (!video) return;
        
        // Obter a URL do vídeo (pode ser do data-video ou do source)
        let videoSrc = thumbnail.getAttribute('data-video');
        if (!videoSrc || videoSrc.startsWith('public/')) {
            const source = video.querySelector('source');
            videoSrc = source ? source.src : video.src;
        }
        
        // Abrir modal com o vídeo
        openVideoModal(videoSrc);
    });
    
    // Abrir modal ao clicar diretamente no vídeo também
    const video = thumbnail.querySelector('video');
    if (video) {
        video.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            // Obter a URL do vídeo
            let videoSrc = thumbnail.getAttribute('data-video');
            if (!videoSrc || videoSrc.startsWith('public/')) {
                const source = video.querySelector('source');
                videoSrc = source ? source.src : video.src;
            }
            
            // Abrir modal com o vídeo
            openVideoModal(videoSrc);
        });
    }
});

// Fechar modal
function closeVideoModal() {
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        const source = modalVideo.querySelector('source');
        if (source) {
            source.src = '';
        } else {
            modalVideo.src = '';
        }
        modalVideo.load();
    }
    if (videoModal) {
        videoModal.classList.remove('active');
    }
    document.body.style.overflow = '';
}

if (modalClose) {
    modalClose.addEventListener('click', closeVideoModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeVideoModal);
}

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});

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

// ===== VALIDAÇÃO DE FORMULÁRIO =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Adicionar validação em tempo real aos campos de formulário
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validateEmail(input.value)) {
            input.classList.add('error');
            showError(input, 'Por favor, insira um email válido');
        } else {
            input.classList.remove('error');
            removeError(input);
        }
    });
});

const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validatePhone(input.value)) {
            input.classList.add('error');
            showError(input, 'Por favor, insira um telefone válido');
        } else {
            input.classList.remove('error');
            removeError(input);
        }
    });
});

function showError(input, message) {
    removeError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    input.parentElement.appendChild(errorDiv);
}

function removeError(input) {
    const errorMsg = input.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

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
    background: #FF8091;
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

// ===== CHATBOT E CALL FORM =====
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
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
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
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
}

function formatWhatsAppNumber(value) {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function toFirestoreValue(value) {
    if (value === null || value === undefined) return { nullValue: null };
    if (value instanceof Date) return { timestampValue: value.toISOString() };
    if (Array.isArray(value)) {
        return { arrayValue: { values: value.map((item) => toFirestoreValue(item)) } };
    }
    if (typeof value === 'object') {
        const fields = {};
        Object.entries(value).forEach(([key, val]) => {
            fields[key] = toFirestoreValue(val);
        });
        return { mapValue: { fields } };
    }
    if (typeof value === 'boolean') return { booleanValue: value };
    if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
    return { stringValue: String(value) };
}

async function addDocWithFallback(db, collectionName, payload) {
    try {
        return await db.collection(collectionName).add(payload);
    } catch (err) {
        const message = String(err?.message || '');
        const isClientBlocked = message.includes('ERR_BLOCKED_BY_CLIENT');
        if (!isClientBlocked) throw err;

        const appOptions = window.firebaseApp?.options || {};
        const projectId = appOptions.projectId || (typeof firebaseConfig !== 'undefined' ? firebaseConfig.projectId : '');
        const apiKey = appOptions.apiKey || (typeof firebaseConfig !== 'undefined' ? firebaseConfig.apiKey : '');
        if (!projectId || !apiKey) throw err;

        const restPayload = {
            fields: {}
        };
        Object.entries(payload).forEach(([key, value]) => {
            if (key === 'createdAt') {
                restPayload.fields[key] = { timestampValue: new Date().toISOString() };
            } else {
                restPayload.fields[key] = toFirestoreValue(value);
            }
        });

        const endpoint = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}?key=${apiKey}`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(restPayload)
        });
        if (!response.ok) {
            const body = await response.text();
            throw new Error(`REST fallback failed (${response.status}): ${body}`);
        }
        return response.json();
    }
}

const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.setAttribute('inputmode', 'numeric');
    telefoneInput.setAttribute('maxlength', '15');
    telefoneInput.setAttribute('placeholder', '(11) 99999-9999');
    telefoneInput.addEventListener('input', () => {
        telefoneInput.value = formatWhatsAppNumber(telefoneInput.value);
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
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Enviando...'; }
        try {
            const db = window.firebaseFirestore;
            if (!db) throw new Error('Firestore indisponível');
            const ts = firebase.firestore.FieldValue.serverTimestamp();
            await addDocWithFallback(db, 'messages', { nome, email, telefone, mensagem, createdAt: ts });
            if (statusEl) {
                statusEl.style.display = 'block';
                statusEl.classList.remove('error');
                statusEl.classList.add('success');
                statusEl.textContent = 'Solicitação enviada com sucesso.';
            }
            callForm.reset();
        } catch (err) {
            if (statusEl) {
                statusEl.style.display = 'block';
                statusEl.classList.remove('success');
                statusEl.classList.add('error');
                const errorMessage = String(err?.message || '');
                statusEl.textContent = errorMessage.includes('api_key') || errorMessage.includes('PERMISSION_DENIED')
                    ? 'Serviço temporariamente indisponível. Tente novamente em instantes.'
                    : 'Erro ao enviar. Tente novamente.';
            }
        } finally {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Enviar'; }
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

function updateHistoriasCarousel() {
    if (!historiasCarouselTrack || historiasSlides.length === 0) return;
    const slideWidth = historiasSlides[0].offsetWidth;
    historiasCarouselTrack.style.transform = `translateX(-${historiasCurrentSlide * slideWidth}px)`;
    if (historiasPrevBtn) {
        historiasPrevBtn.disabled = historiasCurrentSlide === 0;
        historiasPrevBtn.style.opacity = historiasCurrentSlide === 0 ? '0.5' : '1';
    }
    if (historiasNextBtn) {
        historiasNextBtn.disabled = historiasCurrentSlide >= historiasSlides.length - 1;
        historiasNextBtn.style.opacity = historiasCurrentSlide >= historiasSlides.length - 1 ? '0.5' : '1';
    }
    historiasSlides.forEach((slide, index) => {
        const video = slide.querySelector('video');
        const overlay = slide.querySelector('.historias-video-overlay');
        const thumbnail = slide.querySelector('.historias-video-thumbnail');
        if (video && index !== historiasCurrentSlide) {
            video.pause();
            video.currentTime = 0;
            if (overlay) overlay.style.opacity = '1';
            if (thumbnail) thumbnail.classList.remove('playing');
        }
    });
}

function nextHistoriasSlide() {
    if (historiasCurrentSlide < historiasSlides.length - 1) {
        historiasCurrentSlide++;
        updateHistoriasCarousel();
    }
}

function prevHistoriasSlide() {
    if (historiasCurrentSlide > 0) {
        historiasCurrentSlide--;
        updateHistoriasCarousel();
    }
}

if (historiasNextBtn) historiasNextBtn.addEventListener('click', nextHistoriasSlide);
if (historiasPrevBtn) historiasPrevBtn.addEventListener('click', prevHistoriasSlide);

function openHistoriasVideoModal(videoSrc) {
    if (historiasModalVideo && historiasVideoModal) {
        const source = historiasModalVideo.querySelector('source');
        if (source) source.src = videoSrc;
        else historiasModalVideo.src = videoSrc;
        historiasModalVideo.load();
        historiasVideoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const playOnce = () => {
            historiasModalVideo.play().catch(() => {});
            historiasModalVideo.removeEventListener('loadeddata', playOnce);
        };
        historiasModalVideo.addEventListener('loadeddata', playOnce);
    }
}

function closeHistoriasVideoModal() {
    if (historiasModalVideo) {
        historiasModalVideo.pause();
        historiasModalVideo.currentTime = 0;
        const src = historiasModalVideo.querySelector('source');
        if (src) src.src = '';
        historiasModalVideo.load();
    }
    if (historiasVideoModal) historiasVideoModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (historiasModalClose) historiasModalClose.addEventListener('click', closeHistoriasVideoModal);
if (document.querySelector('.historias-video-modal-overlay')) {
    document.querySelector('.historias-video-modal-overlay').addEventListener('click', closeHistoriasVideoModal);
}

document.querySelectorAll('.historias-slide .historias-video-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', (e) => {
        if (e.target.tagName === 'VIDEO' || e.target.closest('video')) return;
        e.preventDefault();
        const dataVideo = thumb.getAttribute('data-video');
        const src = thumb.querySelector('video source');
        const videoSrc = dataVideo || (src ? src.src : '');
        if (videoSrc) openHistoriasVideoModal(videoSrc);
    });
});

if (historiasCarouselTrack && historiasSlides.length > 0) {
    updateHistoriasCarousel();
}

// ===== INICIALIZAR VÍDEOS DO FIREBASE STORAGE =====
// Aguardar o carregamento do DOM e do Firebase
document.addEventListener('DOMContentLoaded', async () => {
    // Aguardar um pouco para garantir que o Firebase está carregado
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Inicializar vídeos do Firebase Storage
    if (window.firebaseVideos && window.firebaseVideos.initializeVideos) {
        try {
            await window.firebaseVideos.initializeVideos();
        } catch (error) {
            console.error('Erro ao inicializar vídeos do Firebase:', error);
        }
    } else {
        console.warn('Firebase Videos utility não está disponível');
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c❤️ Yuna - Landing Page para Pacientes', 'color: #ec4899; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️', 'color: #8b5cf6; font-size: 14px;');

