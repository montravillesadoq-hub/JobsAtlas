"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/client";

export function SiteFooter() {
  const { locale, t } = useI18n();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">JobsAtlas</p>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            {t("home.description")}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href={`/${locale}/jobs`} className="transition hover:text-white">{t("nav.jobs")}</Link>
          <Link href={`/${locale}/dossier-candidature`} className="transition hover:text-white">{t("nav.application")}</Link>
          <Link href={`/${locale}/pricing`} className="transition hover:text-white">{t("nav.pricing")}</Link>
          <Link href={`/${locale}/admin`} className="transition hover:text-white">{t("nav.admin")}</Link>
        </div>
      </div>
    </footer>
  );
}
