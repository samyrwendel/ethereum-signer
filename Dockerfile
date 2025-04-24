FROM node:16-alpine

# Adiciona label de metadados
LABEL maintainer="Ethereum Signer API"
LABEL version="1.0.0"
LABEL description="Serviço para assinatura de mensagens Ethereum"

# Cria usuário específico para a aplicação (boa prática de segurança)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Define o diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install --production && \
    npm cache clean --force

RUN npm install express ethers

# Copia código fonte
COPY server.js ./

# Define permissões
RUN chown -R appuser:appgroup /app

# Muda para o usuário não-root
USER appuser

# Expõe a porta da aplicação
EXPOSE 3001

# Verifica integridade da aplicação
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/ || exit 1

# Inicializa a aplicação
CMD ["node", "server.js"]
