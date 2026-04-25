# Arquibancada

Aplicacao web mobile-first para acompanhar futebol brasileiro com linguagem visual de portal esportivo: jogos ao vivo, tabela, clubes, placares, eventos e paginas de detalhe.

## Stack

- Next.js 16 com App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9 com `eslint-config-next`

## Funcionalidades

- Home editorial com destaque de rodada, blocos ao vivo e atalhos para secoes principais.
- Listagem de jogos com filtros por status, competicao, busca e data.
- Tabela de classificacao com dados mockados para desenvolvimento.
- Pagina de times com brasoes reais quando disponiveis via Cartola.
- Pagina de detalhe de partida com placar, eventos e contexto do jogo.
- Chips de competicao com semantica visual por torneio.

## Estrutura

```text
src/
  app/                 Rotas do App Router
  components/          Componentes reutilizaveis de UI
  data/                Dados mockados do dominio
  lib/                 Enriquecimento de dados e temas auxiliares
  types/               Tipos compartilhados
```

## Dados

O projeto usa `src/data/mockData.ts` como fallback local e pode consumir dados reais da API-Football em `src/lib/apiFootball.ts`.

Quando `API_FOOTBALL_KEY` esta configurada, o app busca jogos e tabela da API-Football. Se a chamada falhar, ou se a chave nao existir, a aplicacao continua funcionando com os dados locais.

O modo economico padrao foi pensado para o plano gratuito:

- Jogos: cache de 15 minutos por liga.
- Tabela: cache de 12 horas por liga.
- Liga padrao: Brasileirao Serie A (`71`).
- Janela de jogos: 2 dias anteriores e 7 dias futuros.

Cada liga extra adicionada em `API_FOOTBALL_LEAGUE_IDS` aumenta o consumo de requests.

Crie um `.env.local` baseado em `.env.example`:

```bash
API_FOOTBALL_KEY=sua_chave
API_FOOTBALL_LEAGUE_IDS=71
API_FOOTBALL_SEASON=2026
API_FOOTBALL_FIXTURES_REVALIDATE_SECONDS=900
API_FOOTBALL_STANDINGS_REVALIDATE_SECONDS=43200
API_FOOTBALL_WINDOW_PAST_DAYS=2
API_FOOTBALL_WINDOW_FUTURE_DAYS=7
```

O projeto tambem tenta enriquecer os brasoes dos clubes mockados com dados do Cartola em `src/lib/cartola.ts`. Os dominios remotos dos escudos estao configurados em `next.config.ts`.

## Rotas

- `/` - pagina inicial
- `/jogos` - lista e filtros de jogos
- `/tabela` - classificacao
- `/times` - lista de clubes
- `/times/[id]` - detalhe do clube
- `/jogo/[id]` - detalhe da partida

## Como rodar

Instale as dependencias:

```bash
npm install
```

Rode em desenvolvimento:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts

```bash
npm run dev     # ambiente local
npm run lint    # analise estatica
npm run build   # build de producao
npm run start   # servidor de producao apos build
```

## Manutencao

- Mantenha dados de dominio em `src/data/mockData.ts`.
- Centralize regras visuais reutilizaveis em `src/app/globals.css`.
- Prefira componentes pequenos em `src/components/` para preservar leitura e reaproveitamento.
- Valide mudancas com `npm run lint` e `npm run build` antes de publicar.
