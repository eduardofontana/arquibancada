import { getCompetitionTone, getCompetitionToneStyle } from "@/lib/competitionTheme";

interface CompetitionChipProps {
  competition: string;
  compact?: boolean;
}

export function CompetitionChip({ competition, compact = false }: CompetitionChipProps) {
  const tone = getCompetitionTone(competition);

  return (
    <span className={`competition-chip ${compact ? "competition-chip-compact" : ""}`} style={getCompetitionToneStyle(competition)}>
      <span className="competition-chip-kicker">{tone.kicker}</span>
      <span className="competition-chip-name">{competition}</span>
    </span>
  );
}
