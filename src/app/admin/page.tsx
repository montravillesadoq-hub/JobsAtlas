"use client";

import { adminModules, adminStats } from "@/lib/content";
import { useI18n } from "@/lib/i18n/client";

export default function AdminPage() {
  const { t } = useI18n();

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12 lg:px-8">
      <section className="rounded-lg border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">{t("admin.eyebrow")}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{t("admin.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          {t("admin.description")}
        </p>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {adminStats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">{t("admin.operations")}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {adminModules.map((module) => (
              <button key={module} className="rounded-md border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700">
                {module}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">{t("admin.charts")}</h2>
          <div className="mt-6 grid gap-4">
            {[
              ["Inscriptions", "72%"],
              ["Paiements validés", "58%"],
              ["CV créés", "84%"],
              ["Pays les plus recherchés", "67%"],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{label}</span>
                  <span className="text-slate-500">{value}</span>
                </div>
                <div className="mt-2 h-2 rounded-md bg-slate-100">
                  <div className="h-2 rounded-md bg-cyan-600" style={{ width: value }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
