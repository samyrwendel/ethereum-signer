# Usar imagem base do Node.js 16 Alpine (versão leve do Linux)
FROM node:16-alpine

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Instalar pacotes de sistema necessários para compilação (se precisar)
RUN apk add --no-cache tini

# Copiar arquivos de dependências
COPY package*.json ./

# Limpar cache e instalar dependências de forma reproduzível
RUN npm ci --only=production \
    && npm cache clean --force

# Copiar código fonte do servidor
COPY server.js ./

# Definir variáveis de ambiente com valores padrão
ENV PORT=3001 \
    NODE_ENV=production

# Expor porta configurada
EXPOSE ${PORT}

# Usar tini como init para tratamento de sinais do sistema
ENTRYPOINT ["/sbin/tini", "--"]

# Comando para iniciar o servidor
CMD ["node", "server.js"]

# Definir usuário não-root para segurança
USER node

# Adicionar healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD node -e "require('http').get('http://localhost:${PORT}', (r) => { if (r.statusCode !== 200) throw new Error('Healthcheck failed'); })" || exit 1
