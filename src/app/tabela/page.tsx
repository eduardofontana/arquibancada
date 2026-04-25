import { EditorialSectionTitle } from "@/components/EditorialSectionTitle";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { getAppData } from "@/lib/appData";

export default async function TabelaPage() {
  const { standings } = await getAppData();

  return (
    <div className="page-shell">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <EditorialSectionTitle title="Classificação" editoria="Central da Tabela" as="h1" center />
        <Table standings={standings} competition="Brasileirão Série A" />
      </main>
    </div>
  );
}



