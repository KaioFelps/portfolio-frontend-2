# Kaio Felps :: Front-end
Este repositório contém um port do front-end do meu site pessoal para Next.js. Veja [portfolio-backend] para
o código fonte da API RESTful consumida aqui.

[portfolio-backend]: https://github.com/kaiofelps/portfolio-backend

## Rodando Localmente

Após clonar esse repositório (`git clone https://github.com/kaiofelps/portfolio-backend`), siga
o passo-a-passo para rodar o site localmente:

### Dependências
Antes de começar, garanta que você tenha instalado:
- [Docker](https://docs.docker.com/engine/install/)
- [NodeJS >= 22.07](https://nodejs.org/en/download)

---

1. configure as variáveis de ambiente
```bash
# Copia o template das variáveis de ambiente
cp .env.sample .env

# Gera e seta as chaves públicas e privadas para os tokens JWT
./scripts/gen-assymetric-keys.ts
```

2. levante as dependências utilizando o Docker:

```bash
docker compose up -d
```

3. instale as dependências e inicie o servidor do front-end:
```bash
npm install
npm run dev
```
