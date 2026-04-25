import type { Metadata } from "next";
import { Bitter, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bitter = Bitter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ARQUIBANCADA | O Estádio no Seu Bolso",
  description: "O sistema operacional do futebol brasileiro. Jogos ao vivo, estatísticas, tabela e muito mais.",
  keywords: ["futebol", "brasileirão", "ao vivo", "resultados", "tabela"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${sourceSans.variable} ${bitter.variable}`}>
      <body className="min-h-screen text-[var(--text)] antialiased">{children}</body>
    </html>
  );
}
