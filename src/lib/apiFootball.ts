import { Match, MatchEvent, Standing, Team } from "@/types";

const API_FOOTBALL_BASE_URL = "https://v3.football.api-sports.io";
const DEFAULT_LEAGUE_IDS = ["71"];
const DEFAULT_FIXTURES_REVALIDATE_SECONDS = 60 * 15;
const DEFAULT_STANDINGS_REVALIDATE_SECONDS = 60 * 60 * 12;
const DEFAULT_PAST_DAYS = 2;
const DEFAULT_FUTURE_DAYS = 7;

interface ApiFootballFixtureResponse {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
      elapsed: number | null;
    };
    venue?: {
      name?: string | null;
    };
  };
  league: {
    id: number;
    name: string;
  };
  teams: {
    home: ApiFootballTeam;
    away: ApiFootballTeam;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  events?: ApiFootballEvent[];
}

interface ApiFootballStandingsResponse {
  league: {
    standings: ApiFootballStanding[][];
  };
}

interface ApiFootballTeam {
  id: number;
  name: string;
  logo?: string;
}

interface ApiFootballEvent {
  time: {
    elapsed: number | null;
    extra?: number | null;
  };
  team: ApiFootballTeam;
  player?: {
    name?: string | null;
  };
  type: string;
  detail: string;
  comments?: string | null;
}

interface ApiFootballStanding {
  rank: number;
  team: ApiFootballTeam;
  points: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
}

interface ApiFootballPayload<T> {
  response?: T[];
  errors?: unknown;
}

export interface LiveFootballData {
  matches: Match[];
  standings: Standing[];
  teams: Team[];
}

function getApiKey(): string | null {
  return process.env.API_FOOTBALL_KEY?.trim() || null;
}

function getLeagueIds(): string[] {
  return (process.env.API_FOOTBALL_LEAGUE_IDS || DEFAULT_LEAGUE_IDS.join(","))
    .split(",")
    .map((league) => league.trim())
    .filter(Boolean);
}

function getSeason(): string {
  return process.env.API_FOOTBALL_SEASON || String(new Date().getFullYear());
}

function getNumberEnv(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getDateWindow(): { from: string; to: string } {
  const pastDays = getNumberEnv("API_FOOTBALL_WINDOW_PAST_DAYS", DEFAULT_PAST_DAYS);
  const futureDays = getNumberEnv("API_FOOTBALL_WINDOW_FUTURE_DAYS", DEFAULT_FUTURE_DAYS);
  const from = new Date();
  const to = new Date();

  from.setDate(from.getDate() - pastDays);
  to.setDate(to.getDate() + futureDays);

  return {
    from: formatDate(from),
    to: formatDate(to),
  };
}

function buildUrl(path: string, params: Record<string, string>): string {
  const url = new URL(path, API_FOOTBALL_BASE_URL);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return url.toString();
}

async function fetchApiFootball<T>(url: string, revalidate: number): Promise<T[]> {
  const apiKey = getApiKey();

  if (!apiKey) {
    return [];
  }

  try {
    const response = await fetch(url, {
      headers: {
        "x-apisports-key": apiKey,
      },
      next: {
        revalidate,
        tags: ["api-football"],
      },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as ApiFootballPayload<T>;

    return Array.isArray(payload.response) ? payload.response : [];
  } catch {
    return [];
  }
}

function toTeam(team: ApiFootballTeam): Team {
  return {
    id: `api-${team.id}`,
    name: team.name,
    shortName: team.name,
    acronym: team.name.slice(0, 3).toUpperCase(),
    shieldUrl: team.logo,
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
  };
}

function toMatchStatus(status: string): Match["status"] {
  if (status === "HT") return "halftime";
  if (["1H", "2H", "ET", "BT", "P", "LIVE"].includes(status)) return "live";
  if (["FT", "AET", "PEN"].includes(status)) return "finished";
  return "scheduled";
}

function toEventType(event: ApiFootballEvent): MatchEvent["type"] {
  const type = event.type.toLowerCase();
  const detail = event.detail.toLowerCase();

  if (type.includes("goal") && detail.includes("own")) return "own_goal";
  if (type.includes("goal") && detail.includes("penalty")) return "penalty";
  if (type.includes("goal")) return "goal";
  if (type.includes("card") && detail.includes("red")) return "red_card";
  if (type.includes("card")) return "yellow_card";
  if (type.includes("subst")) return "substitution";
  return "goal";
}

function toMatchEvent(event: ApiFootballEvent, fixtureId: number, index: number): MatchEvent {
  const minute = event.time.elapsed ?? 0;
  const extra = event.time.extra ? `+${event.time.extra}` : "";
  const eventType = toEventType(event);

  return {
    id: `api-${fixtureId}-event-${index}`,
    type: eventType,
    minute,
    player: event.player?.name || "Jogador",
    teamId: `api-${event.team.id}`,
    description: `${event.detail}${extra ? ` (${minute}${extra}')` : ""}`,
  };
}

function toMatch(fixture: ApiFootballFixtureResponse): Match {
  return {
    id: `api-${fixture.fixture.id}`,
    homeTeam: toTeam(fixture.teams.home),
    awayTeam: toTeam(fixture.teams.away),
    homeScore: fixture.goals.home ?? 0,
    awayScore: fixture.goals.away ?? 0,
    status: toMatchStatus(fixture.fixture.status.short),
    minute: fixture.fixture.status.elapsed ?? undefined,
    competition: fixture.league.name,
    stadium: fixture.fixture.venue?.name || "Estadio a confirmar",
    date: fixture.fixture.date.slice(0, 10),
    events: (fixture.events || []).map((event, index) => toMatchEvent(event, fixture.fixture.id, index)),
  };
}

function toStanding(standing: ApiFootballStanding): Standing {
  return {
    position: standing.rank,
    team: toTeam(standing.team),
    played: standing.all.played,
    won: standing.all.win,
    drawn: standing.all.draw,
    lost: standing.all.lose,
    goalsFor: standing.all.goals.for,
    goalsAgainst: standing.all.goals.against,
    points: standing.points,
  };
}

function uniqueTeams(matches: Match[], standings: Standing[]): Team[] {
  const teams = new Map<string, Team>();

  for (const standing of standings) {
    teams.set(standing.team.id, standing.team);
  }

  for (const match of matches) {
    teams.set(match.homeTeam.id, match.homeTeam);
    teams.set(match.awayTeam.id, match.awayTeam);
  }

  return Array.from(teams.values()).sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

export async function getLiveFootballData(): Promise<LiveFootballData | null> {
  if (!getApiKey()) {
    return null;
  }

  const leagueIds = getLeagueIds();
  const season = getSeason();
  const { from, to } = getDateWindow();
  const fixturesRevalidate = getNumberEnv("API_FOOTBALL_FIXTURES_REVALIDATE_SECONDS", DEFAULT_FIXTURES_REVALIDATE_SECONDS);
  const standingsRevalidate = getNumberEnv("API_FOOTBALL_STANDINGS_REVALIDATE_SECONDS", DEFAULT_STANDINGS_REVALIDATE_SECONDS);

  const fixtureRequests = leagueIds.map((league) =>
    fetchApiFootball<ApiFootballFixtureResponse>(
      buildUrl("/fixtures", {
        league,
        season,
        from,
        to,
        timezone: "America/Sao_Paulo",
      }),
      fixturesRevalidate,
    ),
  );

  const standingsRequests = leagueIds.map((league) =>
    fetchApiFootball<ApiFootballStandingsResponse>(
      buildUrl("/standings", {
        league,
        season,
      }),
      standingsRevalidate,
    ),
  );

  const [fixturesByLeague, standingsByLeague] = await Promise.all([
    Promise.all(fixtureRequests),
    Promise.all(standingsRequests),
  ]);

  const matches = fixturesByLeague
    .flat()
    .map(toMatch)
    .sort((a, b) => {
      if (a.status === "live" && b.status !== "live") return -1;
      if (b.status === "live" && a.status !== "live") return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const standings = standingsByLeague.flatMap((leaguePayload) =>
    leaguePayload.flatMap((item) => item.league.standings.at(0)?.map(toStanding) ?? []),
  );

  if (matches.length === 0 && standings.length === 0) {
    return null;
  }

  return {
    matches,
    standings,
    teams: uniqueTeams(matches, standings),
  };
}
