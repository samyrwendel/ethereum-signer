# Ethereum Signer

Serviço para assinatura de mensagens Ethereum.

## Estrutura do Projeto

```
├── server.js           # Servidor Express que executa o serviço de assinatura
├── package.json        # Dependências do projeto
├── Dockerfile          # Configuração para build da imagem Docker
├── docker-compose.yml  # Configuração para orquestração de containers
└── .env                # Variáveis de ambiente (não comitar em repositórios públicos)
```

## Configuração

Crie um arquivo `.env` com as seguintes variáveis:

```
HL_PRIVATE_KEY=0xSEU_PRIVATE_KEY_DA_API_WALLET
PORT=3001
```

**Importante**: Nunca comite esse arquivo em repositório público.

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
node server.js
```

## Deploy com Docker

Antes de iniciar, crie a rede externa se ainda não existir:

```bash
docker network create network_public
```

Para construir e iniciar o serviço:

```bash
docker-compose up -d --build
```

Verificar logs:

```bash
docker-compose logs -f
```

## API Endpoints

### GET /

Verificar status do serviço.

**Resposta:**
```json
{
  "status": "Ethereum Signer está online"
}
```

### POST /sign

Assinar uma mensagem.

**Corpo da Requisição:**
```json
{
  "message": "{\"nonce\":12345}"
}
```

**Resposta:**
```json
{
  "address": "0x...",
  "signature": "0x...",
  "nonce": 12345
}
```

## Manutenção e Atualizações

Para atualizar o código:

```bash
# Após alterar os arquivos
docker-compose up -d --build
```

Para escalar o serviço:

```bash
docker-compose scale ethereum-signer=3
# ou
docker service update --replicas=3 <nome_do_service>
```