"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n/client";

const links = [
  { href: "/", labelKey: "nav.home" },
  { href: "/jobs", labelKey: "nav.jobs" },
  { href: "/dossier-candidature", labelKey: "nav.application" },
  { href: "/pricing", labelKey: "nav.pricing" },
  { href: "/dashboard", labelKey: "nav.dashboard" },
];

export function SiteHeader() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, t } = useI18n();

  const localizedHref = (href: string) => (href === "/" ? `/${locale}` : `/${locale}${href}`);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("jobsatlas-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextValue = storedTheme ? storedTheme === "dark" : prefersDark;
    const frame = window.requestAnimationFrame(() => {
      setIsDark(nextValue);
      document.documentElement.classList.toggle("dark", nextValue);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("jobsatlas-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur ${isDark ? "border-slate-800 bg-slate-950/90 text-slate-100" : "border-slate-200 bg-white/90 text-slate-900"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="text-xl font-semibold tracking-tight">
          JobsAtlas
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <Link key={link.href} href={localizedHref(link.href)} className="transition hover:text-cyan-600">
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            onClick={() => setIsDark((value) => !value)}
            className={`rounded-md border px-3 py-2 text-sm font-medium transition ${isDark ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-200 bg-slate-100 text-slate-700"}`}
          >
            {isDark ? t("common.themeLight") : t("common.themeDark")}
          </button>
          <Link href={`/${locale}/auth/login`} className="hidden text-sm font-semibold transition hover:text-cyan-600 sm:inline">
            {t("nav.login")}
          </Link>
          <Link href={`/${locale}/auth/signup`} className="hidden rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 sm:inline-flex">
            {t("nav.signup")}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className={`rounded-md border px-3 py-2 text-sm font-semibold md:hidden ${isDark ? "border-slate-700" : "border-slate-200"}`}
            aria-expanded={menuOpen}
            aria-label={t("common.menu")}
          >
            {t("common.menu")}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav className={`border-t px-4 py-4 md:hidden ${isDark ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"}`}>
          <div className="mx-auto grid max-w-7xl gap-3 text-sm">
            <LanguageSwitcher compact />
            {links.map((link) => (
              <Link key={link.href} href={localizedHref(link.href)} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 transition hover:bg-cyan-50 hover:text-cyan-700">
                {t(link.labelKey)}
              </Link>
            ))}
            <Link href={`/${locale}/auth/login`} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 font-semibold transition hover:bg-cyan-50 hover:text-cyan-700">
              {t("nav.login")}
            </Link>
            <Link href={`/${locale}/auth/signup`} onClick={() => setMenuOpen(false)} className="rounded-md bg-cyan-600 px-3 py-2 font-semibold text-white">
              {t("nav.signup")}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
