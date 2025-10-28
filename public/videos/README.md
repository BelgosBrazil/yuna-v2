# Vídeos da Yuna

Os vídeos desta pasta não estão versionados no Git devido ao tamanho dos arquivos (GitHub tem limite de 100MB por arquivo).

## Vídeos necessários:

1. `valeria_jul25_reels.mp4` (118.67 MB)
2. `4_minha_historia_fev25_reels.mp4` (127.27 MB)
3. `5_minha_historia_fev25_reels.mp4` (58.09 MB)
4. `Case_Sr.Vânio_legendado.mp4` (177.08 MB)
5. `case Dra. Célia - rev.01.mp4` (100.70 MB)

## Como adicionar os vídeos:

Os vídeos devem ser adicionados manualmente nesta pasta após clonar o repositório.

**Alternativas para hospedar os vídeos:**

1. **Cloud Storage (Recomendado)**: Usar serviços como:
   - AWS S3
   - Google Cloud Storage
   - Vercel Blob Storage
   - Cloudinary (com CDN)

2. **Video Hosting Services**:
   - YouTube (embeddable)
   - Vimeo
   - Cloudflare Stream

3. **Git LFS**: Se realmente precisar versionar, usar Git Large File Storage:
   ```bash
   git lfs install
   git lfs track "*.mp4"
   git add .gitattributes
   ```

Para produção, recomenda-se usar um serviço de hospedagem de vídeos com CDN para melhor performance.

