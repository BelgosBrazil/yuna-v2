// ===== FIREBASE CONFIGURATION =====
// Este arquivo será carregado após o Firebase SDK via CDN

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBvDyOF_Ndu_PjomyPBxeWNjL31Wn7kuxY",
  authDomain: "yunalps-3486b.firebaseapp.com",
  projectId: "yunalps-3486b",
  storageBucket: "yunalps-3486b.firebasestorage.app",
  messagingSenderId: "951788268371",
  appId: "1:951788268371:web:a691e241c4396ce585cfa6",
  measurementId: "G-2KM6MCD0DX"
};

// Inicializar Firebase
let app, analytics, storage;

// Verificar se Firebase está disponível (carregado via CDN)
if (typeof firebase !== 'undefined') {
  app = firebase.initializeApp(firebaseConfig);
  analytics = firebase.analytics();
  storage = firebase.storage();
  
  // Tornar storage acessível globalmente
  window.firebaseStorage = storage;
  window.firebaseApp = app;
  window.firebaseAnalytics = analytics;
  
  console.log('✅ Firebase inicializado com sucesso');
} else {
  console.error('❌ Firebase SDK não foi carregado. Verifique se o script está incluído no HTML.');
}
