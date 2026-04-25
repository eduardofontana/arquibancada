"use client";

import { memo } from "react";
import { Standing } from "@/types";
import { TeamBadge } from "./TeamBadge";

interface TableProps {
  standings: Standing[];
  competition?: string;
}

export const Table = memo(function Table({ standings, competition = "Brasileirão A" }: TableProps) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="bg-[rgba(193,18,31,0.06)] p-4 border-b border-[rgba(21,128,61,0.2)]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">{competition}</h2>
          <span className="text-sm text-[var(--muted)]">2026</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs font-semibold uppercase text-[var(--muted)] border-b border-[rgba(21,128,61,0.2)]">
              <th className="text-left p-3 pl-4">#</th>
              <th className="text-left p-3">Time</th>
              <th className="text-center p-3">J</th>
              <th className="text-center p-3">V</th>
              <th className="text-center p-3">E</th>
              <th className="text-center p-3">D</th>
              <th className="text-center p-3">GP</th>
              <th className="text-center p-3">GC</th>
              <th className="text-center p-3">SG</th>
              <th className="text-center p-3 pr-4">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing) => (
              <tr
                key={standing.team.id}
                className="border-b border-[rgba(21,128,61,0.14)] hover:bg-[rgba(193,18,31,0.06)] transition-colors"
              >
                <td className="p-3 pl-4">
                  <span
                    className={`text-lg font-bold ${
                      standing.position <= 4
                        ? "text-[var(--accent)]"
                        : standing.position >= 17
                          ? "text-[var(--danger)]"
                          : "text-[var(--text)]"
                    }`}
                  >
                    {standing.position}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <TeamBadge team={standing.team} size="sm" />
                    <span className="font-semibold">{standing.team.shortName}</span>
                  </div>
                </td>
                <td className="text-center p-3 text-[var(--muted)]">{standing.played}</td>
                <td className="text-center p-3 text-[var(--muted)]">{standing.won}</td>
                <td className="text-center p-3 text-[var(--muted)]">{standing.drawn}</td>
                <td className="text-center p-3 text-[var(--muted)]">{standing.lost}</td>
                <td className="text-center p-3 text-[var(--muted)]">{standing.goalsFor}</td>
                <td className="text-center p-3 text-[var(--muted)]">{standing.goalsAgainst}</td>
                <td className="text-center p-3 text-[var(--muted)]">
                  {standing.goalsFor - standing.goalsAgainst > 0 ? "+" : ""}
                  {standing.goalsFor - standing.goalsAgainst}
                </td>
                <td className="text-center p-3 pr-4">
                  <span className="text-lg font-bold text-[var(--text)]">{standing.points}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-5 p-3 bg-[rgba(193,18,31,0.06)] text-xs text-[var(--muted)]">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[var(--accent)]" />
          Libertadores
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#15803d]" />
          Pré-Libertadores
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[var(--warning)]" />
          Sul-Americana
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[var(--danger)]" />
          Rebaixados
        </span>
      </div>
    </div>
  );
});