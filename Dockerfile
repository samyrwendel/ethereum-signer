# Dockerfile
FROM node:16-alpine

# 1) Cria a pasta /app e define como workdir
WORKDIR /app

# 2) Copia apenas o package.json (e package-lock se tiver) e instala dependências
COPY package*.json ./
RUN npm install --production

# 3) Copia o seu código (o server.js e qualquer outro arquivo .js)
COPY server.js ./

# 4) Expõe a porta que seu app escuta
EXPOSE 3001

# 5) Comando padrão ao iniciar o container
CMD ["node", "server.js"]
