import { Match } from "@/types";
import Link from "next/link";
import { CompetitionChip } from "./CompetitionChip";
import { ScoreDisplay } from "./ScoreDisplay";
import { TeamBadge } from "./TeamBadge";

interface LiveMatchProps {
  match: Match;
  featured?: boolean;
}

export function LiveMatch({ match, featured = false }: LiveMatchProps) {
  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  const isHalftime = match.status === "halftime";

  if (featured) {
    return (
      <Link
        href={`/jogo/${match.id}`}
        className="block surface-card broadcast-shell p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(193,18,31,0.16)]"
      >
        <div className="flex items-center justify-between mb-4 gap-3">
          <CompetitionChip competition={match.competition} />
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${
              isLive
                ? "bg-[var(--accent)] text-[var(--on-accent)] animate-pulse"
                : isFinished
                  ? "bg-[rgba(193,18,31,0.12)] text-[var(--text)]"
                  : "bg-[rgba(21,128,61,0.16)] text-[var(--muted)]"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLive ? "bg-[var(--on-accent)] live-dot-radar" : "bg-transparent"}`} />
            {isLive ? `${match.minute}'` : isHalftime ? "Intervalo" : isFinished ? "Final" : "Agendado"}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center gap-4">
            <TeamBadge team={match.homeTeam} size="lg" showName />
          </div>

          <div className="flex flex-col items-center gap-3">
            <ScoreDisplay homeScore={match.homeScore} awayScore={match.awayScore} size="lg" animated={isLive} />
            <span className="text-sm text-[var(--muted)]">{match.stadium}</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <TeamBadge team={match.awayTeam} size="lg" showName />
          </div>
        </div>

        {match.events.length > 0 && (
          <div className="mt-6 pt-4 border-t border-[rgba(193,18,31,0.18)]">
            <div className="flex flex-wrap justify-center gap-2">
              {match.events.slice(-3).map((event) => (
                <span
                  key={event.id}
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    event.type === "goal"
                      ? "bg-[rgba(193,18,31,0.14)] text-[var(--accent)]"
                      : event.type === "yellow_card"
                        ? "bg-[rgba(21,128,61,0.2)] text-[var(--text)]"
                        : event.type === "red_card"
                          ? "bg-[rgba(0,0,0,0.24)] text-[var(--text)]"
                          : "bg-[rgba(21,128,61,0.1)] text-[var(--muted)]"
                  }`}
                >
                  Gol {event.player} {event.minute}&apos;
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <span className="text-sm text-[var(--accent)] font-semibold hover:underline">Ver detalhes</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/jogo/${match.id}`}
      className="surface-card flex items-center gap-4 p-4 transition-all hover:-translate-y-0.5"
    >
      <div className="flex-1 flex items-center gap-4">
        <TeamBadge team={match.homeTeam} size="md" />
        <div className="flex flex-col items-center min-w-[60px]">
          <div className="text-2xl font-bold">
            {match.homeScore} x {match.awayScore}
          </div>
          <div className={`text-xs font-bold uppercase ${isLive ? "text-[var(--accent)] animate-pulse" : "text-[var(--muted)]"}`}>
            {isLive ? `${match.minute}'` : isHalftime ? "Intervalo" : isFinished ? "Final" : "--"}
          </div>
        </div>
        <TeamBadge team={match.awayTeam} size="md" />
      </div>

      <div className="flex flex-col items-end gap-1.5">
        <CompetitionChip competition={match.competition} compact />
        <span className="text-xs text-[var(--muted)]">{match.stadium}</span>
      </div>
    </Link>
  );
}




