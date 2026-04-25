import { z } from "zod";

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  acronym: z.string().length(3),
  shield: z.string().optional(),
  shieldUrl: z.string().url().optional(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
});

export const MatchEventSchema = z.object({
  id: z.string(),
  type: z.enum(["goal", "yellow_card", "red_card", "substitution", "penalty", "own_goal"]),
  minute: z.number().int().min(0).max(120),
  player: z.string(),
  teamId: z.string(),
  description: z.string().optional(),
});

export const MatchSchema = z.object({
  id: z.string(),
  homeTeam: TeamSchema,
  awayTeam: TeamSchema,
  homeScore: z.number().int().min(0),
  awayScore: z.number().int().min(0),
  status: z.enum(["scheduled", "live", "halftime", "finished"]),
  minute: z.number().int().min(0).max(120).optional(),
  competition: z.string(),
  stadium: z.string(),
  date: z.string(),
  events: z.array(MatchEventSchema),
});

export const StandingSchema = z.object({
  position: z.number().int().min(1),
  team: TeamSchema,
  played: z.number().int().min(0),
  won: z.number().int().min(0),
  drawn: z.number().int().min(0),
  lost: z.number().int().min(0),
  goalsFor: z.number().int().min(0),
  goalsAgainst: z.number().int().min(0),
  points: z.number().int().min(0),
});

export type ValidatedTeam = z.infer<typeof TeamSchema>;
export type ValidatedMatch = z.infer<typeof MatchSchema>;
export type ValidatedStanding = z.infer<typeof StandingSchema>;

export function validateMatch(data: unknown): ValidatedMatch | null {
  try {
    return MatchSchema.parse(data);
  } catch {
    return null;
  }
}

export function validateStanding(data: unknown): ValidatedStanding | null {
  try {
    return StandingSchema.parse(data);
  } catch {
    return null;
  }
}

export function validateTeam(data: unknown): ValidatedTeam | null {
  try {
    return TeamSchema.parse(data);
  } catch {
    return null;
  }
}