// ===== FIREBASE VIDEOS UTILITY =====
// Gerenciamento de vídeos no Firebase Storage

// Mapeamento dos vídeos locais para os caminhos no Firebase Storage
// Os vídeos ficam na pasta videos/ do bucket Firebase Storage
const videoMap = {
    'valeria_jul25_reels.mp4': 'videos/valeria_jul25_reels.mp4',
    '4_minha_historia_fev25_reels.mp4': 'videos/4_minha_historia_fev25_reels.mp4',
    '5_minha_historia_fev25_reels.mp4': 'videos/5_minha_historia_fev25_reels.mp4',
    'Case_Sr.Vânio_legendado.mp4': 'videos/Case_Sr.Vânio_legendado.mp4',
    'case Dra. Célia - rev.01.mp4': 'videos/case Dra. Célia - rev.01.mp4',
    'Srvanio.mp4': 'videos/Srvanio.mp4',
    'celia.mp4': 'videos/celia.mp4',
    'banneryuna.mp4': 'videos/banneryuna.mp4',
};

// Cache de URLs para evitar múltiplas requisições
const videoUrlCache = {};

/**
 * Obtém a URL de download de um vídeo do Firebase Storage
 * @param {string} videoName - Nome do arquivo de vídeo (ex: 'valeria_jul25_reels.mp4')
 * @returns {Promise<string>} - URL de download do vídeo
 */
async function getVideoUrl(videoName) {
    // Verificar cache primeiro
    if (videoUrlCache[videoName]) {
        return videoUrlCache[videoName];
    }

    try {
        // Verificar se Firebase Storage está disponível (pode estar no escopo global)
        const firebaseStorage = window.firebaseStorage || storage;
        
        if (!firebaseStorage) {
            console.warn('Firebase Storage não está disponível');
            return getLocalVideoUrl(videoName);
        }

        // Obter o caminho do Firebase Storage
        const storagePath = videoMap[videoName];
        
        if (!storagePath) {
            console.warn(`Vídeo não encontrado no mapeamento: ${videoName}`);
            return getLocalVideoUrl(videoName);
        }

        // Criar referência ao arquivo no Storage
        const videoRef = firebaseStorage.ref(storagePath);
        
        // Obter URL de download
        const downloadURL = await videoRef.getDownloadURL();
        
        // Armazenar no cache
        videoUrlCache[videoName] = downloadURL;
        
        console.log(`✅ URL obtida para ${videoName}`);
        return downloadURL;
    } catch (error) {
        console.error(`❌ Erro ao obter URL do vídeo ${videoName}:`, error);
        return getLocalVideoUrl(videoName);
    }
}

/**
 * Retorna URL absoluta do vídeo local (em produção, caminho desde a raiz do domínio)
 */
function getLocalVideoUrl(videoName) {
    const path = `/public/${videoName}`;
    return typeof window !== 'undefined' && window.location?.origin
        ? `${window.location.origin}${path}`
        : path;
}

/**
 * Obtém URLs de múltiplos vídeos de uma vez
 * @param {string[]} videoNames - Array com nomes dos vídeos
 * @returns {Promise<Object>} - Objeto com mapeamento nome -> URL
 */
async function getVideoUrls(videoNames) {
    const urls = {};
    
    await Promise.all(
        videoNames.map(async (videoName) => {
            try {
                urls[videoName] = await getVideoUrl(videoName);
            } catch (error) {
                console.error(`Erro ao obter URL do vídeo ${videoName}:`, error);
                urls[videoName] = getLocalVideoUrl(videoName); // Fallback
            }
        })
    );
    
    return urls;
}

/**
 * Protege um elemento de vídeo contra downloads
 * @param {HTMLElement} videoElement - Elemento de vídeo a ser protegido
 */
function protectVideoFromDownload(videoElement) {
    if (!videoElement) return;
    
    // Desabilitar menu de contexto (botão direito)
    videoElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Desabilitar arrastar e soltar
    videoElement.setAttribute('draggable', 'false');
    videoElement.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Desabilitar seleção de texto sobre o vídeo
    videoElement.style.userSelect = 'none';
    videoElement.style.webkitUserSelect = 'none';
    videoElement.style.mozUserSelect = 'none';
    videoElement.style.msUserSelect = 'none';
    
    // Prevenir download via teclado (Ctrl+S, etc)
    videoElement.addEventListener('keydown', (e) => {
        // Bloquear Ctrl+S (salvar)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            return false;
        }
        // Bloquear Ctrl+Shift+I (DevTools - pode ser usado para inspecionar)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
    });
    
    // Prevenir que a URL seja exposta facilmente
    videoElement.addEventListener('loadstart', () => {
        // Remover atributos que podem expor a URL
        if (videoElement.src) {
            // A URL será definida mas não será facilmente acessível
            Object.defineProperty(videoElement, 'src', {
                get: function() {
                    return this.getAttribute('src') || '';
                },
                set: function(value) {
                    this.setAttribute('src', value);
                }
            });
        }
    });
    
    // Prevenir copiar URL via eventos
    videoElement.addEventListener('copy', (e) => {
        e.preventDefault();
        return false;
    });
}

/**
 * Atualiza todos os elementos de vídeo na página com URLs do Firebase Storage
 * @param {string} videoName - Nome do arquivo de vídeo
 * @param {string} dataVideoAttribute - Valor do atributo data-video (caminho local original)
 */
async function updateVideoSources(videoName, dataVideoAttribute) {
    try {
        const firebaseUrl = await getVideoUrl(videoName);
        
        // Atualizar todos os elementos com o atributo data-video correspondente
        const videoElements = document.querySelectorAll(`[data-video="${dataVideoAttribute}"]`);
        
        console.log(`🔄 Atualizando ${videoElements.length} elemento(s) para o vídeo ${videoName}`);
        
        if (videoElements.length === 0) {
            console.warn(`⚠️ Nenhum elemento encontrado com data-video="${dataVideoAttribute}"`);
            return firebaseUrl;
        }
        
        videoElements.forEach((element, index) => {
            // Atualizar o atributo data-video
            element.setAttribute('data-video', firebaseUrl);
            
            // Atualizar o elemento <video> dentro do elemento
            const videoTag = element.querySelector('video');
            if (videoTag) {
                // Aplicar proteções contra download
                protectVideoFromDownload(videoTag);
                protectVideoFromDownload(element);
                
                // Remover atributos que permitem download
                videoTag.removeAttribute('download');
                videoTag.setAttribute('controlsList', 'nodownload');
                
                const sourceTag = videoTag.querySelector('source');
                if (sourceTag) {
                    sourceTag.src = firebaseUrl;
                    videoTag.load(); // Recarregar o vídeo
                    console.log(`  ✅ Elemento ${index + 1}: <source> atualizado`);
                } else {
                    // Se não houver <source>, atualizar diretamente o <video>
                    videoTag.src = firebaseUrl;
                    videoTag.load();
                    console.log(`  ✅ Elemento ${index + 1}: <video> src atualizado`);
                }
            } else {
                console.warn(`  ⚠️ Elemento ${index + 1}: Nenhum <video> encontrado dentro`);
            }
        });
        
        return firebaseUrl;
    } catch (error) {
        console.error(`❌ Erro ao atualizar fonte do vídeo ${videoName}:`, error);
        return dataVideoAttribute; // Retornar o caminho original em caso de erro
    }
}

/**
 * Inicializa todos os vídeos da página carregando do Firebase Storage
 */
async function initializeVideos() {
    console.log('🔄 Iniciando inicialização dos vídeos do Firebase Storage...');
    
    // Aguardar um pouco para garantir que o Firebase está carregado
    let firebaseStorage = window.firebaseStorage || storage;
    
    if (!firebaseStorage) {
        console.warn('⏳ Aguardando Firebase Storage...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        firebaseStorage = window.firebaseStorage || storage;
        
        if (!firebaseStorage) {
            console.error('❌ Firebase Storage não está disponível após espera');
            console.warn('⚠️ Os vídeos continuarão usando os arquivos locais como fallback');
            return;
        }
    }
    
    console.log('✅ Firebase Storage disponível');

    // Mapeamentos para medicos.html e ortopedica.html (public/xxx.mp4)
    // e pacientes.html (public/videos/xxx.mp4)
    const videoMappings = [
        { name: 'valeria_jul25_reels.mp4', dataVideo: 'public/valeria_jul25_reels.mp4' },
        { name: '4_minha_historia_fev25_reels.mp4', dataVideo: 'public/4_minha_historia_fev25_reels.mp4' },
        { name: '5_minha_historia_fev25_reels.mp4', dataVideo: 'public/5_minha_historia_fev25_reels.mp4' },
        { name: 'Case_Sr.Vânio_legendado.mp4', dataVideo: 'public/Case_Sr.Vânio_legendado.mp4' },
        { name: 'case Dra. Célia - rev.01.mp4', dataVideo: 'public/case Dra. Célia - rev.01.mp4' },
        { name: 'valeria_jul25_reels.mp4', dataVideo: 'public/videos/valeria_jul25_reels.mp4' },
        { name: '4_minha_historia_fev25_reels.mp4', dataVideo: 'public/videos/4_minha_historia_fev25_reels.mp4' },
        { name: '5_minha_historia_fev25_reels.mp4', dataVideo: 'public/videos/5_minha_historia_fev25_reels.mp4' },
        { name: 'Srvanio.mp4', dataVideo: 'public/videos/Srvanio.mp4' },
        { name: 'celia.mp4', dataVideo: 'public/videos/celia.mp4' },
        { name: 'banneryuna.mp4', dataVideo: 'public/videos/banneryuna.mp4' },
    ];
    
    console.log(`📹 Encontrados ${videoMappings.length} vídeos para atualizar`);
    console.log('🔄 Carregando URLs do Firebase Storage...');
    
    // Carregar todos os vídeos em paralelo
    const results = await Promise.allSettled(
        videoMappings.map(mapping => 
            updateVideoSources(mapping.name, mapping.dataVideo)
        )
    );
    
    // Carregar vídeo institucional (sem data-video)
    await loadInstitutionalVideo();
    
    // Verificar resultados
    const successCount = results.filter(r => r.status === 'fulfilled').length;
    const errorCount = results.filter(r => r.status === 'rejected').length;
    
    if (successCount > 0) {
        console.log(`✅ ${successCount} vídeo(s) atualizado(s) com sucesso`);
    }
    
    if (errorCount > 0) {
        console.warn(`⚠️ ${errorCount} vídeo(s) falharam ao atualizar (usando fallback local)`);
    }
    
    console.log('✅ Inicialização dos vídeos concluída');
    
    // Proteger todos os vídeos após inicialização
    protectAllVideos();
}

/**
 * Carrega o vídeo institucional diretamente do Firebase Storage
 */
async function loadInstitutionalVideo() {
    try {
        console.log('🎥 Carregando vídeo institucional...');
        
        const videoElement = document.querySelector('#video-institucional video');
        
        if (!videoElement) {
            console.warn('⚠️ Elemento de vídeo institucional não encontrado');
            return;
        }
        
        // Obter URL do Firebase
        const firebaseUrl = await getVideoUrl('banneryuna.mp4');
        
        // Atualizar source
        const sourceTag = videoElement.querySelector('source');
        if (sourceTag) {
            sourceTag.src = firebaseUrl;
        } else {
            videoElement.src = firebaseUrl;
        }
        
        // Aplicar proteções
        protectVideoFromDownload(videoElement);
        videoElement.removeAttribute('download');
        videoElement.setAttribute('controlsList', 'nodownload');
        
        // Recarregar vídeo
        videoElement.load();
        
        console.log('✅ Vídeo institucional carregado do Firebase');
    } catch (error) {
        console.error('❌ Erro ao carregar vídeo institucional:', error);
    }
}

/**
 * Protege todos os vídeos na página contra downloads
 */
function protectAllVideos() {
    // Proteger todos os elementos <video>
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        protectVideoFromDownload(video);
        // Remover atributos que permitem download
        video.removeAttribute('download');
        video.setAttribute('controlsList', 'nodownload');
    });
    
    // Proteger todos os elementos com data-video
    const videoContainers = document.querySelectorAll('[data-video]');
    videoContainers.forEach(container => {
        protectVideoFromDownload(container);
    });
    
    console.log(`🛡️ Proteção aplicada em ${allVideos.length} vídeo(s)`);
}

// Proteger vídeos assim que o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(protectAllVideos, 1000);
    });
} else {
    setTimeout(protectAllVideos, 1000);
}

// Exportar funções para uso global
window.firebaseVideos = {
    getVideoUrl,
    getVideoUrls,
    updateVideoSources,
    initializeVideos,
    loadInstitutionalVideo,
    protectVideoFromDownload,
    protectAllVideos
};
