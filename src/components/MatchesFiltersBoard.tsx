"use client";

import { useMemo, useState } from "react";
import { Match } from "@/types";
import { MatchCard } from "./MatchCard";

type StatusFilter = "all" | "live" | "scheduled" | "finished";

interface MatchesFiltersBoardProps {
  matches: Match[];
}

function sortMatches(a: Match, b: Match): number {
  if (a.status === "live" && b.status !== "live") return -1;
  if (b.status === "live" && a.status !== "live") return 1;
  if (a.status === "halftime" && b.status === "scheduled") return -1;
  if (b.status === "halftime" && a.status === "scheduled") return 1;
  if (a.status === "scheduled" && b.status === "finished") return -1;
  if (b.status === "scheduled" && a.status === "finished") return 1;
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

export function MatchesFiltersBoard({ matches }: MatchesFiltersBoardProps) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [competition, setCompetition] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");

  const competitionOptions = useMemo(() => {
    return ["all", ...Array.from(new Set(matches.map((match) => match.competition)))];
  }, [matches]);

  const filteredMatches = useMemo(() => {
    return matches
      .filter((match) => {
        if (status === "live") {
          if (match.status !== "live" && match.status !== "halftime") return false;
        } else if (status !== "all" && match.status !== status) {
          return false;
        }

        if (competition !== "all" && match.competition !== competition) {
          return false;
        }

        if (dateFrom && match.date < dateFrom) {
          return false;
        }

        if (search.trim()) {
          const query = search.toLowerCase();
          const haystack = `${match.homeTeam.name} ${match.awayTeam.name} ${match.stadium}`.toLowerCase();
          if (!haystack.includes(query)) {
            return false;
          }
        }

        return true;
      })
      .sort(sortMatches);
  }, [matches, status, competition, search, dateFrom]);

  return (
    <>
      <section className="surface-card p-4 md:p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-[0.11em] text-[var(--muted)]">Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusFilter)}
              className="rounded-lg border border-[var(--border)] bg-[rgba(193,18,31,0.08)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            >
              <option value="all">Todos</option>
              <option value="live">Ao vivo</option>
              <option value="scheduled">Agendados</option>
              <option value="finished">Finalizados</option>
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-[0.11em] text-[var(--muted)]">Competição</span>
            <select
              value={competition}
              onChange={(event) => setCompetition(event.target.value)}
              className="rounded-lg border border-[var(--border)] bg-[rgba(193,18,31,0.08)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            >
              {competitionOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "Todas" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-[0.11em] text-[var(--muted)]">Buscar time/estádio</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ex.: Flamengo, Maracanã"
              className="rounded-lg border border-[var(--border)] bg-[rgba(193,18,31,0.08)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-[0.11em] text-[var(--muted)]">A partir de</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              className="rounded-lg border border-[var(--border)] bg-[rgba(193,18,31,0.08)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </label>
        </div>
      </section>

      <div className="mb-4 text-sm text-[var(--muted)]">
        {filteredMatches.length} jogo{filteredMatches.length === 1 ? "" : "s"} encontrado{filteredMatches.length === 1 ? "" : "s"}
      </div>

      <div className="space-y-3">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => <MatchCard key={match.id} match={match} />)
        ) : (
          <div className="surface-card text-center py-8 text-[var(--muted)]">
            Nenhum jogo corresponde aos filtros selecionados.
          </div>
        )}
      </div>
    </>
  );
}





