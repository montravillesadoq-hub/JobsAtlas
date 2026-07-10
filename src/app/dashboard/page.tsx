"use client";

import { dashboardModules } from "@/lib/content";
import { mockApplications, mockCvSummary, mockNotifications, mockProfile, mockSavedJobs, mockSubscription } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n/client";

export default function DashboardPage() {
  const { t } = useI18n();
  const profile = mockProfile;
  const cv = mockCvSummary;

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12 lg:px-8">
      <div className="rounded-lg border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{t("dashboard.eyebrow")}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{t("dashboard.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">{t("dashboard.description")}</p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{t("dashboard.profile")}</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{profile.name}</h2>
              <p className="mt-1 text-sm text-slate-600">{profile.role} · {profile.location}</p>
            </div>
            <div className="rounded-md bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">{profile.plan}</div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Metric label={t("common.email")} value={profile.email} />
            <Metric label={t("dashboard.completion")} value={`${profile.completion}%`} />
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{t("dashboard.mainCv")}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{cv.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{t("cv.status")} : {cv.status}</p>
          <p className="mt-2 text-sm text-slate-600">{t("cv.lastUpdated")} : {cv.lastUpdated}</p>
          <div className="mt-4 rounded-md bg-cyan-50 p-4">
            <p className="text-sm font-semibold text-cyan-700">{t("cv.atsScore")}</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">{cv.atsScore}%</p>
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{t("dashboard.savedJobs")}</h2>
          <ul className="mt-4 space-y-3">
            {mockSavedJobs.map((item) => (
              <li key={item.job} className="rounded-md bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{item.job}</p>
                <p className="mt-1 text-sm text-slate-600">{item.company} · {item.location}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{t("dashboard.applications")}</h2>
          <ul className="mt-4 space-y-3">
            {mockApplications.map((item) => (
              <li key={item.job} className="rounded-md bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{item.job}</p>
                <p className="mt-1 text-sm text-slate-600">{item.company}</p>
                <p className="mt-2 text-sm font-medium text-cyan-700">{item.status} · {item.date}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{t("dashboard.subscription")}</h2>
          <div className="mt-4 grid gap-3">
            <Metric label={t("pricing.plan")} value={mockSubscription.plan} />
            <Metric label={t("cv.status")} value={mockSubscription.status} />
            <Metric label={t("dashboard.renewal")} value={mockSubscription.renewal} />
            <Metric label={t("dashboard.remainingDocuments")} value={mockSubscription.documentsLeft} />
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{t("dashboard.notifications")}</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {mockNotifications.map((notification) => (
              <li key={notification} className="rounded-md border border-slate-200 p-3">{notification}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{t("dashboard.modules")}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {dashboardModules.map((module) => (
              <div key={module.title} className="rounded-md bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900">{module.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{module.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-900">{value}</p>
    </div>
  );
}
