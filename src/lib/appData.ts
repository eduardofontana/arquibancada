import { cache } from "react";
import { matches, standings, teams } from "@/data/mockData";
import { Match, Standing, Team } from "@/types";
import { getLiveFootballData } from "./apiFootball";
import { getCartolaCrestMap } from "./cartola";

interface AppData {
  teams: Team[];
  matches: Match[];
  standings: Standing[];
}

let cachedData: AppData | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 1000 * 60 * 60;

function isCacheValid(): boolean {
  if (!cachedData) return false;
  return Date.now() - cacheTimestamp < CACHE_DURATION_MS;
}

function getCachedData(): AppData | null {
  if (isCacheValid()) {
    return cachedData;
  }
  return null;
}

export const getAppData = cache(async (): Promise<AppData> => {
  const cached = getCachedData();
  if (cached) {
    return cached;
  }

  const [crestMap, liveData] = await Promise.all([
    getCartolaCrestMap(),
    getLiveFootballData(),
  ]);

  const enrichedTeams = teams.map((team) => ({
    ...team,
    shieldUrl: crestMap[team.id] ?? team.shieldUrl,
  }));

  const teamById = new Map(enrichedTeams.map((team) => [team.id, team]));

  const enrichedMatches = matches.map((match) => ({
    ...match,
    homeTeam: teamById.get(match.homeTeam.id) ?? match.homeTeam,
    awayTeam: teamById.get(match.awayTeam.id) ?? match.awayTeam,
  }));

  const enrichedStandings = standings.map((standing) => ({
    ...standing,
    team: teamById.get(standing.team.id) ?? standing.team,
  }));

  const result: AppData = liveData
    ? {
        teams: liveData.teams.length > 0 ? liveData.teams : enrichedTeams,
        matches: liveData.matches.length > 0 ? liveData.matches : enrichedMatches,
        standings: liveData.standings.length > 0 ? liveData.standings : enrichedStandings,
      }
    : {
        teams: enrichedTeams,
        matches: enrichedMatches,
        standings: enrichedStandings,
      };

  cachedData = result;
  cacheTimestamp = Date.now();

  return result;
});

export const getAppDataFresh = cache(async (): Promise<AppData> => {
  cachedData = null;
  cacheTimestamp = 0;
  return getAppData();
});