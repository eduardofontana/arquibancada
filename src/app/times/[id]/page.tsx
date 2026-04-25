import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { MatchCard } from "@/components/MatchCard";
import { TeamBadge } from "@/components/TeamBadge";
import { Match } from "@/types";
import { getAppData } from "@/lib/appData";

interface PageProps {
  params: Promise<{ id: string }>;
}

type FormResult = "V" | "E" | "D";

function getTeamForm(teamId: string, teamMatches: Match[]) {
  const recentPlayed = [...teamMatches]
    .filter((match) => match.status !== "scheduled")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return recentPlayed.map((match) => {
    const isHome = match.homeTeam.id === teamId;
    const teamScore = isHome ? match.homeScore : match.awayScore;
    const opponentScore = isHome ? match.awayScore : match.homeScore;

    let result: FormResult = "E";
    if (teamScore > opponentScore) result = "V";
    if (teamScore < opponentScore) result = "D";

    return {
      match,
      result,
      goalDiff: teamScore - opponentScore,
    };
  });
}

export default async function TimePage({ params }: PageProps) {
  const { id } = await params;
  const { teams, matches, standings } = await getAppData();

  const team = teams.find((t) => t.id === id);

  if (!team) {
    notFound();
  }

  const teamMatches = matches.filter((m) => m.homeTeam.id === team.id || m.awayTeam.id === team.id);
  const teamStanding = standings.find((s) => s.team.id === team.id);
  const teamForm = getTeamForm(team.id, teamMatches);

  return (
    <div className="page-shell">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="surface-card rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <TeamBadge team={team} size="lg" />
            <div className="text-center md:text-left">
              <h1 className="text-4xl">{team.name}</h1>
              <p className="text-[var(--muted)] mt-1">{team.shortName}</p>
              <div className="flex items-center gap-3 mt-4 justify-center md:justify-start flex-wrap">
                {teamStanding && (
                  <div className="rounded-lg px-4 py-2 bg-[rgba(193,18,31,0.06)] border border-[var(--border)]">
                    <span className="text-[var(--muted)] text-xs uppercase">Posição</span>
                    <p className="text-2xl font-bold text-[var(--accent)]">{teamStanding.position}º</p>
                  </div>
                )}
                <div className="rounded-lg px-4 py-2 bg-[rgba(193,18,31,0.06)] border border-[var(--border)]">
                  <span className="text-[var(--muted)] text-xs uppercase">Pontos</span>
                  <p className="text-2xl font-bold">{teamStanding?.points || 0}</p>
                </div>
                <div className="rounded-lg px-4 py-2 bg-[rgba(193,18,31,0.06)] border border-[var(--border)]">
                  <span className="text-[var(--muted)] text-xs uppercase">Jogos</span>
                  <p className="text-2xl font-bold">{teamStanding?.played || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="surface-card rounded-xl p-5 mb-8">
          <div className="section-title mb-4">
            <span className="section-title-dot" />
            <h2 className="text-xl">Forma Recente</h2>
          </div>

          {teamForm.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                {teamForm.map(({ match, result }) => (
                  <span
                    key={match.id}
                    className={`w-9 h-9 rounded-full grid place-items-center text-sm font-bold ${
                      result === "V"
                        ? "bg-[rgba(193,18,31,0.18)] text-[var(--accent)]"
                        : result === "E"
                          ? "bg-[rgba(0,0,0,0.14)] text-[var(--text)]"
                          : "bg-[rgba(193,18,31,0.2)] text-[var(--danger)]"
                    }`}
                  >
                    {result}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-2 h-16 items-end">
                {teamForm.map(({ match, goalDiff }) => (
                  <div key={`${match.id}-bar`} className="grid gap-1 justify-items-center">
                    <div
                      className={`w-full rounded-sm ${goalDiff >= 0 ? "bg-[var(--accent)]" : "bg-[var(--danger)]"}`}
                      style={{ height: `${Math.max(8, Math.min(56, Math.abs(goalDiff) * 18))}px` }}
                      title={`Saldo: ${goalDiff > 0 ? `+${goalDiff}` : goalDiff}`}
                    />
                    <span className="text-[10px] text-[var(--muted)]">{match.homeScore}x{match.awayScore}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-[var(--muted)] text-sm">Ainda não há jogos concluídos para calcular a forma recente.</p>
          )}
        </section>

        <div className="section-title mb-6">
          <span className="section-title-dot" />
          <h2 className="text-2xl">Jogos</h2>
        </div>

        <div className="space-y-3">
          {teamMatches.length > 0 ? (
            teamMatches.map((match) => <MatchCard key={match.id} match={match} />)
          ) : (
            <div className="surface-card text-center py-8 text-[var(--muted)]">
              <p>Nenhum jogo encontrado</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}




