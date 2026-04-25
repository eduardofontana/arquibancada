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

export async function getCartolaCrestMap(): Promise<Record<string, string>> {
  try {
    const response = await fetch(CARTOLA_CLUBS_URL, {
      next: { revalidate: 60 * 60 * 12 },
    });

    if (!response.ok) {
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
    return {};
  }
}
