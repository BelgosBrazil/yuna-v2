// ===== FIREBASE CONFIGURATION =====
// Este arquivo será carregado após o Firebase SDK via CDN

// App principal (yunalps) - Firestore, Analytics
const firebaseConfig = {
  apiKey: "AIzaSyBvDyOF_Ndu_PjomyPBxeWNjL31Wn7kuxY",
  authDomain: "yunalps-3486b.firebaseapp.com",
  projectId: "yunalps-3486b",
  storageBucket: "yunalps-3486b.firebasestorage.app",
  messagingSenderId: "951788268371",
  appId: "1:951788268371:web:a691e241c4396ce585cfa6",
  measurementId: "G-2KM6MCD0DX"
};

// App de vídeos (belgoscrm) - Storage com pasta Yuna
// Obtenha em: console.firebase.google.com > belgoscrm > Configurações do projeto (ícone engrenagem) > Seus apps
const firebaseVideoConfig = {
  apiKey: "COLOQUE_API_KEY_BELGOSCRM",
  authDomain: "belgoscrm.firebaseapp.com",
  projectId: "belgoscrm",
  storageBucket: "belgoscrm.firebasestorage.app",
  messagingSenderId: "COLOQUE_SENDER_ID",
  appId: "COLOQUE_APP_ID"
};

// Inicializar Firebase
let app, analytics, storage, firestore;

// Verificar se Firebase está disponível (carregado via CDN)
if (typeof firebase !== 'undefined') {
  app = firebase.initializeApp(firebaseConfig);
  analytics = firebase.analytics();
  firestore = firebase.firestore();

  // Storage de vídeos: usar belgoscrm (pasta Yuna) quando apiKey estiver configurado
  const videoConfigReady = firebaseVideoConfig.apiKey && !firebaseVideoConfig.apiKey.includes('COLOQUE');
  if (videoConfigReady) {
    try {
      const videoApp = firebase.initializeApp(firebaseVideoConfig, 'firebaseVideo');
      storage = videoApp.storage();
      window.firebaseVideoStorage = storage;
      console.log('✅ Firebase (vídeos belgoscrm) inicializado');
    } catch (e) {
      storage = firebase.app().storage();
      console.warn('Fallback para storage yunalps:', e.message);
    }
  } else {
    storage = firebase.app().storage();
  }

  window.firebaseStorage = storage;
  window.firebaseApp = app;
  window.firebaseAnalytics = analytics;
  window.firebaseFirestore = firestore;

  console.log('✅ Firebase inicializado com sucesso');
} else {
  console.error('❌ Firebase SDK não foi carregado. Verifique se o script está incluído no HTML.');
}
