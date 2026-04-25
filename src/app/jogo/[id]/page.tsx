import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { MatchTimeline } from "@/components/MatchTimeline";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { TeamBadge } from "@/components/TeamBadge";
import { getAppData } from "@/lib/appData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JogoPage({ params }: PageProps) {
  const { id } = await params;
  const { matches } = await getAppData();
  const match = matches.find((m) => m.id === id);

  if (!match) {
    notFound();
  }

  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  const isHalftime = match.status === "halftime";
  const statusLabel = isLive ? `${match.minute}'` : isHalftime ? "Intervalo" : isFinished ? "Finalizado" : "Agendado";

  return (
    <div className="page-shell">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="surface-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">{match.competition}</span>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase ${
                isLive
                  ? "bg-[var(--accent)] text-[var(--on-accent)] animate-pulse"
                  : isFinished
                    ? "bg-[rgba(193,18,31,0.12)] text-[var(--text)]"
                    : "bg-[rgba(21,128,61,0.16)] text-[var(--muted)]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isLive ? "bg-[var(--on-accent)]" : "bg-transparent"}`} />
              {statusLabel}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col items-center gap-3 flex-1">
              <TeamBadge team={match.homeTeam} size="lg" showName />
            </div>

            <div className="flex flex-col items-center gap-3">
              <ScoreDisplay homeScore={match.homeScore} awayScore={match.awayScore} size="lg" animated={isLive} />
            </div>

            <div className="flex flex-col items-center gap-3 flex-1">
              <TeamBadge team={match.awayTeam} size="lg" showName />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[rgba(193,18,31,0.18)] text-center">
            <p className="text-[var(--muted)]">{match.stadium} - {match.date}</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="section-title">
            <span className="section-title-dot" />
            <h2 className="text-2xl">Cronologia</h2>
          </div>
          <MatchTimeline events={match.events} homeTeam={match.homeTeam} awayTeam={match.awayTeam} />
        </div>

        <div className="mt-8 surface-card rounded-xl p-6">
          <h3 className="text-xl mb-4">Informacoes do Jogo</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[var(--muted)] block">Competicao</span>
              <span className="font-semibold">{match.competition}</span>
            </div>
            <div>
              <span className="text-[var(--muted)] block">Estadio</span>
              <span className="font-semibold">{match.stadium}</span>
            </div>
            <div>
              <span className="text-[var(--muted)] block">Data</span>
              <span className="font-semibold">{match.date}</span>
            </div>
            <div>
              <span className="text-[var(--muted)] block">Status</span>
              <span className={`font-semibold ${isLive ? "text-[var(--accent)]" : "text-[var(--text)]"}`}>
                {statusLabel}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
