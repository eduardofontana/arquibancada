import { EditorialSectionTitle } from "@/components/EditorialSectionTitle";
import { Header } from "@/components/Header";
import { TeamBadge } from "@/components/TeamBadge";
import { getAppData } from "@/lib/appData";
import Link from "next/link";

export default async function TimesPage() {
  const { teams } = await getAppData();
  const sortedTeams = [...teams].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="page-shell">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <EditorialSectionTitle title="Times" editoria="Guia dos Clubes" as="h1" center />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedTeams.map((team) => (
            <Link
              key={team.id}
              href={`/times/${team.id}`}
              className="surface-card rounded-xl p-6 transition-all hover:-translate-y-0.5"
            >
              <div className="flex flex-col items-center gap-3">
                <TeamBadge team={team} size="lg" />
                <div className="text-center">
                  <h3 className="font-bold uppercase tracking-wide">{team.shortName}</h3>
                  <p className="text-xs text-[var(--muted)] mt-1">{team.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}



