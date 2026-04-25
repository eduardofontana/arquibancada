import { Match } from "@/types";
import Link from "next/link";
import { CompetitionChip } from "./CompetitionChip";
import { TeamBadge } from "./TeamBadge";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const isScheduled = match.status === "scheduled";
  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  const isHalftime = match.status === "halftime";

  return (
    <Link
      href={`/jogo/${match.id}`}
      className="surface-card flex items-center gap-4 p-4 transition-all hover:-translate-y-0.5"
    >
      <TeamBadge team={match.homeTeam} size="sm" />

      <div className="flex-1">
        <div className="flex items-center gap-3">
          {isScheduled ? (
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold text-[var(--muted)]">vs</span>
            </div>
          ) : (
            <div className="text-xl font-bold">
              {match.homeScore} x {match.awayScore}
            </div>
          )}
        </div>
      </div>

      <TeamBadge team={match.awayTeam} size="sm" />

      <div className="flex flex-col items-end gap-1.5">
        <div
          className={`status-chip ${
            isLive
              ? "bg-[var(--accent)] text-[var(--on-accent)]"
              : isScheduled
                ? "bg-[rgba(21,128,61,0.16)] text-[var(--muted)]"
                : "bg-[rgba(21,128,61,0.12)] text-[var(--text)]"
          }`}
        >
          {isLive ? `${match.minute}'` : isScheduled ? "Agendado" : isFinished ? "Final" : isHalftime ? "Intervalo" : ""}
        </div>
        <CompetitionChip competition={match.competition} compact />
      </div>
    </Link>
  );
}


