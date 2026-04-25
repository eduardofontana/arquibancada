import { EditorialSectionTitle } from "@/components/EditorialSectionTitle";
import { Header } from "@/components/Header";
import { LiveMatch } from "@/components/LiveMatch";
import { MatchCard } from "@/components/MatchCard";
import { Table } from "@/components/Table";
import { getAppData } from "@/lib/appData";
import Link from "next/link";

export default async function Home() {
  const { matches, standings } = await getAppData();
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(today);

  const liveMatches = matches.filter((m) => m.status === "live" || m.status === "halftime");
  const upcomingMatches = matches.filter((m) => m.status === "scheduled");
  const finishedMatches = matches.filter((m) => m.status === "finished");

  return (
    <div className="page-shell">
      <Header />

      <main className="container-shell">
        <section className="surface-card broadcast-shell cinematic-in p-5 sm:p-6 md:p-8 mb-10">
          <div className="border-b border-[rgba(0,0,0,0.12)] pb-5 mb-5 cinematic-in cinematic-delay-1">
            <div className="flex justify-center md:justify-end text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
              <span>{formattedDate}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.12)] bg-[rgba(193,18,31,0.06)] px-3 py-1 mt-3">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-2)] animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Especial da Rodada</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl mt-3 leading-[1.04] text-[var(--text)]">
              Rodada ao vivo com lances decisivos, tabela em movimento e clima de decisao
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-3xl">
              Acompanhe placares, viradas e impacto imediato na classificacao com leitura rapida, clara e atualizada minuto a minuto.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:items-end lg:justify-between cinematic-in cinematic-delay-2">
            <div>
              <p className="uppercase text-[0.7rem] tracking-[0.2em] text-[var(--muted)] mb-2">Caderno de Futebol</p>
              <h2 className="text-2xl md:text-3xl mb-2 text-[var(--text)]">Painel Tatico da Rodada</h2>
              <p className="text-[var(--muted)] max-w-xl">
                Cobertura continua com foco em placar, classificacao e mudancas de momento em cada clube.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
              <div className="rounded-md bg-[rgba(193,18,31,0.06)] border border-[rgba(0,0,0,0.1)] px-4 py-3 text-center">
                <p className="text-[0.68rem] uppercase tracking-[0.12em] text-[var(--muted)]">Ao vivo</p>
                <p className="text-2xl font-bold text-[var(--accent-2)]">{liveMatches.length}</p>
              </div>
              <div className="rounded-md bg-[rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.1)] px-4 py-3 text-center">
                <p className="text-[0.68rem] uppercase tracking-[0.12em] text-[var(--muted)]">Proximos</p>
                <p className="text-2xl font-bold">{upcomingMatches.length}</p>
              </div>
              <div className="rounded-md bg-[rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.1)] px-4 py-3 text-center">
                <p className="text-[0.68rem] uppercase tracking-[0.12em] text-[var(--muted)]">Finalizados</p>
                <p className="text-2xl font-bold">{finishedMatches.length}</p>
              </div>
            </div>
          </div>
        </section>

        {liveMatches.length > 0 && (
          <section className="surface-card cinematic-in cinematic-delay-2 mb-8 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent-2)] live-dot-radar" />
                <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[var(--muted)]">Plantao Ao Vivo</p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[var(--muted)] text-center sm:text-right">
                Atualizacao em tempo real
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {liveMatches.map((match) => (
                <Link
                  key={match.id}
                  href={`/jogo/${match.id}`}
                  className="rounded-md border border-[rgba(0,0,0,0.12)] bg-[rgba(21,128,61,0.06)] px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 hover:border-[rgba(21,128,61,0.36)] hover:shadow-[0_16px_34px_rgba(0,0,0,0.12)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
                      {match.homeTeam.shortName} x {match.awayTeam.shortName}
                    </span>
                    <span className="status-chip bg-[var(--accent-2)] text-[var(--on-accent)]">{match.minute ?? 0}&apos;</span>
                  </div>
                  <p className="mt-1 text-lg sm:text-xl font-black tracking-tight text-[var(--text)]">
                    {match.homeTeam.shortName} {match.homeScore} x {match.awayScore} {match.awayTeam.shortName}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {match.competition} - {match.stadium}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12 cinematic-in cinematic-delay-3">
          <EditorialSectionTitle title="Ao Vivo" editoria="Plantao da Rodada" live />

          {liveMatches.length > 0 ? (
            <div className="grid gap-5">
              {liveMatches.map((match) => (
                <LiveMatch key={match.id} match={match} featured />
              ))}
            </div>
          ) : (
            <div className="surface-card p-8 text-center">
              <span className="text-4xl mb-2 block">Ao vivo</span>
              <p className="text-[var(--text)] font-semibold">Nenhum jogo ao vivo agora</p>
              <p className="text-[var(--muted)] text-sm">Fique ligado nos proximos jogos.</p>
            </div>
          )}
        </section>

        <section className="mb-12 cinematic-in cinematic-delay-2">
          <EditorialSectionTitle title="Proximos Jogos" editoria="Agenda de Partidas" />
          <div className="grid gap-3">
            {upcomingMatches.slice(0, 4).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>

        <section className="mb-12 cinematic-in cinematic-delay-2">
          <EditorialSectionTitle title="Ultimos Resultados" editoria="Fechamento da Rodada" />
          <div className="grid gap-3">
            {finishedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>

        <section className="cinematic-in cinematic-delay-2">
          <EditorialSectionTitle title="Classificacao" editoria="Panorama do Campeonato" />
          <Table standings={standings.slice(0, 10)} />
        </section>
      </main>

      <footer className="border-t border-[rgba(0,0,0,0.12)] mt-14">
        <div className="max-w-7xl mx-auto px-4 py-7 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">BR</span>
            <span className="text-xl tracking-[0.12em] font-bold">ARQUIBANCADA</span>
          </div>
          <p className="text-[var(--muted)] text-xs md:text-sm">O Estadio no Seu Bolso - 2026</p>
        </div>
      </footer>
    </div>
  );
}
