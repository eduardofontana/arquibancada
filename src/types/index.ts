export interface Team {
  id: string;
  name: string;
  shortName: string;
  acronym: string;
  shield?: string;
  shieldUrl?: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface MatchEvent {
  id: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'penalty' | 'own_goal';
  minute: number;
  player: string;
  teamId: string;
  description?: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: 'scheduled' | 'live' | 'halftime' | 'finished';
  minute?: number;
  competition: string;
  stadium: string;
  date: string;
  events: MatchEvent[];
}

export interface Standing {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}
