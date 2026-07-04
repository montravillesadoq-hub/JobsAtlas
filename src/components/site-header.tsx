"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/jobs", label: "Emploi" },
  { href: "/cv", label: "CV" },
  { href: "/letters", label: "Lettres" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/dashboard", label: "Tableau de bord" },
];

export function SiteHeader() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("jobsatlas-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextValue = storedTheme ? storedTheme === "dark" : prefersDark;
    setIsDark(nextValue);
    document.documentElement.classList.toggle("dark", nextValue);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("jobsatlas-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur ${isDark ? "border-slate-800 bg-slate-950/90 text-slate-100" : "border-slate-200 bg-white/80 text-slate-900"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          JobsAtlas
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-cyan-600">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDark((value) => !value)}
            className={`rounded-full border px-3 py-2 text-sm font-medium transition ${isDark ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-200 bg-slate-100 text-slate-700"}`}
          >
            {isDark ? "☀️ Clair" : "🌙 Sombre"}
          </button>
          <Link href="/auth/signup" className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            Créer un compte
          </Link>
        </div>
      </div>
    </header>
  );
}
