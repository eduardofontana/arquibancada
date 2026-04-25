export interface CartolaClub {
  id: number;
  slug: string;
  abreviacao: string;
  nome_fantasia: string;
  escudos: {
    '60x60': string;
    '45x45': string;
    '30x30': string;
  };
}

const CARTOLA_CLUBS_URL = 'https://api.cartola.globo.com/clubes';

const cartolaSlugByTeamId: Record<string, string> = {
  pal: 'palmeiras',
  fla: 'flamengo',
  flu: 'fluminense',
  spo: 'sao-paulo',
  bah: 'bahia',
  bot: 'botafogo',
  cor: 'coritiba',
  cam: 'atletico-mg',
  cru: 'cruzeiro',
  vas: 'vasco',
  rbb: 'bragantino',
  gre: 'gremio',
  int: 'internacional',
  corinthians: 'corinthians',
  san: 'santos',
  mir: 'mirassol',
  cap: 'atletico-pr',
  cha: 'chapecoense',
  rem: 'remo',
  vit: 'vitoria',
};

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCartolaCrestMap(): Promise<Record<string, string>> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(CARTOLA_CLUBS_URL, {
        next: { revalidate: 60 * 60 * 12 },
      });

      if (!response.ok) {
        if (attempt < MAX_RETRIES) {
          await sleep(RETRY_DELAY * Math.pow(2, attempt));
          continue;
        }
        return {};
      }

      const payload = (await response.json()) as Record<string, CartolaClub>;
      const clubsBySlug = new Map<string, CartolaClub>();

      for (const club of Object.values(payload)) {
        if (club?.slug) {
          clubsBySlug.set(club.slug, club);
        }
      }

      const crestMap: Record<string, string> = {};

      for (const [teamId, slug] of Object.entries(cartolaSlugByTeamId)) {
        const club = clubsBySlug.get(slug);
        if (club?.escudos?.['60x60']) {
          crestMap[teamId] = club.escudos['60x60'];
        }
      }

      return crestMap;
    } catch {
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY * Math.pow(2, attempt));
        continue;
      }
      return {};
    }
  }
  return {};
}