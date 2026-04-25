"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/jogos", label: "Jogos" },
  { href: "/tabela", label: "Tabela" },
  { href: "/times", label: "Times" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,0,0,0.12)] bg-[rgba(255,255,255,0.94)] backdrop-blur-xl">
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--accent) 0%, var(--accent) 50%, var(--accent-2) 50%, var(--accent-2) 100%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-16 gap-2">
          <div className="hidden md:block">
            <span className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">edicao nacional</span>
          </div>

          <Link href="/" className="justify-self-center text-center">
            <span className="text-2xl font-bold tracking-[0.08em] text-[var(--text)]">Arquibancada</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 justify-self-end">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-[0.78rem] font-bold uppercase tracking-[0.12em] rounded-md transition-all ${
                  pathname === link.href
                    ? "bg-[var(--accent)] text-[var(--on-accent)]"
                    : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[rgba(21,128,61,0.08)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--text)]"
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {open && (
          <nav className="md:hidden pb-4 grid gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-semibold uppercase tracking-wide ${
                  pathname === link.href
                    ? "bg-[var(--accent)] text-[var(--on-accent)]"
                    : "bg-[rgba(21,128,61,0.08)] text-[var(--muted)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
