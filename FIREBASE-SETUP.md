# Firebase Storage - Configuração de Vídeos

Este documento descreve como configurar o Firebase Storage para hospedar os vídeos do sistema Yuna.

## 📋 Pré-requisitos

1. Projeto Firebase criado com Storage habilitado
2. Vídeos locais na pasta `public/videos/`

## 🚀 Configuração

### 1. Configuração do Firebase

O Firebase já está configurado no arquivo `firebase-config.js` com as seguintes credenciais:

- **Project ID**: `yunalps-3486b`
- **Storage Bucket**: `yunalps-3486b.firebasestorage.app`

### 2. Upload dos Vídeos

Para fazer upload dos vídeos para o Firebase Storage, siga estes passos:

#### Via Console do Firebase:

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione o projeto `yunalps-3486b`
3. Vá em **Storage** no menu lateral
4. Clique em **Iniciar** se ainda não tiver configurado
5. Crie uma pasta chamada `videos` (se não existir)
6. Faça upload dos seguintes vídeos para a pasta `videos/`:

   - `valeria_jul25_reels.mp4`
   - `4_minha_historia_fev25_reels.mp4`
   - `5_minha_historia_fev25_reels.mp4`
   - `Case_Sr.Vânio_legendado.mp4`
   - `case Dra. Célia - rev.01.mp4`

#### Via Firebase CLI:

```bash
# Instalar Firebase CLI (se ainda não tiver)
npm install -g firebase-tools

# Login no Firebase
firebase login

# Inicializar Firebase no projeto (se ainda não tiver)
firebase init storage

# Fazer upload dos vídeos
firebase storage:upload public/videos/valeria_jul25_reels.mp4 videos/valeria_jul25_reels.mp4
firebase storage:upload public/videos/4_minha_historia_fev25_reels.mp4 videos/4_minha_historia_fev25_reels.mp4
firebase storage:upload public/videos/5_minha_historia_fev25_reels.mp4 videos/5_minha_historia_fev25_reels.mp4
firebase storage:upload "public/videos/Case_Sr.Vânio_legendado.mp4" "videos/Case_Sr.Vânio_legendado.mp4"
firebase storage:upload "public/videos/case Dra. Célia - rev.01.mp4" "videos/case Dra. Célia - rev.01.mp4"
```

### 3. Configurar Regras de Segurança

No Firebase Console, vá em **Storage** > **Rules** e configure as regras para permitir leitura pública:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Permitir leitura pública dos vídeos
    match /videos/{videoId} {
      allow read: if true;
      allow write: if false; // Apenas admins podem fazer upload
    }
  }
}
```

**⚠️ IMPORTANTE**: Para produção, considere restringir o acesso apenas a usuários autenticados ou adicionar validação de origem.

## 📁 Estrutura de Arquivos

```
firebase-config.js      # Configuração do Firebase
firebase-videos.js      # Utilitários para gerenciar vídeos
pacientes.html          # Página de pacientes (já configurada)
medicos.html            # Página de médicos (já configurada)
pacientes.js            # Script da página de pacientes (já configurado)
medicos.js              # Script da página de médicos (já configurado)
```

## 🔄 Como Funciona

1. Quando a página carrega, o Firebase é inicializado via CDN
2. O script `firebase-videos.js` busca as URLs dos vídeos no Firebase Storage
3. Os elementos `<video>` e atributos `data-video` são atualizados com as URLs do Firebase
4. Se houver erro ao carregar do Firebase, o sistema usa o fallback para os arquivos locais

## 🐛 Troubleshooting

### Vídeos não carregam

1. Verifique se os vídeos foram enviados para o Firebase Storage na pasta `videos/`
2. Verifique se as regras de segurança permitem leitura pública
3. Abra o console do navegador (F12) e verifique se há erros
4. Verifique se o Firebase está inicializado corretamente

### Fallback para arquivos locais

Se o Firebase Storage não estiver disponível, o sistema automaticamente usa os arquivos locais em `public/videos/`. Isso garante que o site continue funcionando mesmo sem o Firebase.

## 📝 Notas

- Os vídeos são carregados de forma assíncrona para não bloquear o carregamento da página
- As URLs são armazenadas em cache para evitar múltiplas requisições
- O sistema tem fallback automático para arquivos locais em caso de erro

