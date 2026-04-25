import { EditorialSectionTitle } from "@/components/EditorialSectionTitle";
import { Header } from "@/components/Header";
import { MatchesFiltersBoard } from "@/components/MatchesFiltersBoard";
import { getAppData } from "@/lib/appData";

export default async function JogosPage() {
  const { matches } = await getAppData();

  return (
    <div className="page-shell">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <EditorialSectionTitle title="Jogos" editoria="Agenda GE" as="h1" center />
        <MatchesFiltersBoard matches={matches} />
      </main>
    </div>
  );
}



