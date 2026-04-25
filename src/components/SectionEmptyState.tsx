interface SectionEmptyStateProps {
  variant: "live" | "upcoming" | "finished" | "no-matches";
  hasUpcoming?: boolean;
  hasFinished?: boolean;
}

export function SectionEmptyState({ variant, hasUpcoming, hasFinished }: SectionEmptyStateProps) {
  if (variant === "no-matches") {
    return (
      <div className="surface-card p-8 sm:p-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(193,18,31,0.08)] mb-4">
          <svg className="w-7 h-7 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="inline-flex rounded-full border border-[rgba(0,0,0,0.12)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
          Sem jogos programados
        </span>
        <p className="mt-3 text-[var(--text)] text-lg font-black uppercase tracking-tight">Nenhum jogo estao momento</p>
        <p className="mx-auto mt-2 max-w-md text-[var(--muted)] text-sm">
          Acompanhe a agenda do Brasileirão e demais competições. Os dados são atualizados automaticamente quando os jogos são programados.
        </p>
      </div>
    );
  }

  if (variant === "live") {
    return (
      <div className="surface-card p-6 sm:p-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(21,128,61,0.08)] mb-4">
          <svg className="w-7 h-7 text-[var(--accent-2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,128,61,0.2)] bg-[rgba(21,128,61,0.06)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent-2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-2)]" />
          Aguardando
        </span>
        <p className="mt-3 text-[var(--text)] text-xl font-black uppercase tracking-tight">Sem jogos em andamento</p>
        <p className="mx-auto mt-2 max-w-xl text-[var(--muted)] text-sm">
          {hasUpcoming
            ? "Acompanhe a agenda abaixo para não perder os próximos jogos do Brasileirão."
            : hasFinished
              ? "Os jogos desta rodada foram encerrados. Confira os resultados abaixo."
              : "Acompanhe a agenda do Brasileirão. Quando a bola rolar, esta área mudará automaticamente."}
        </p>
      </div>
    );
  }

  if (variant === "upcoming") {
    return (
      <div className="surface-card p-6 text-center">
        <span className="inline-flex rounded-full border border-[rgba(0,0,0,0.12)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
          Sem jogos agendados
        </span>
        <p className="mt-3 text-[var(--text)] font-semibold">
          Nenhum jogo previsto para os próximos dias
        </p>
      </div>
    );
  }

  return (
    <div className="surface-card p-6 text-center">
      <span className="inline-flex rounded-full border border-[rgba(0,0,0,0.12)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
        Sem resultados
      </span>
      <p className="mt-3 text-[var(--text)] font-semibold">
        Nenhum jogo encerrado ainda
      </p>
    </div>
  );
}