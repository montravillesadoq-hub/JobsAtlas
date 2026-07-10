"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { featuredJobs, jobFilters } from "@/lib/content";
import { useI18n } from "@/lib/i18n/client";

export default function JobsPage() {
  const { locale, t } = useI18n();
  const [draftQuery, setDraftQuery] = useState("");
  const [draftCountry, setDraftCountry] = useState("Tous");
  const [draftCity, setDraftCity] = useState("Toutes");
  const [draftSector, setDraftSector] = useState("Tous");
  const [draftExperience, setDraftExperience] = useState("Tous");
  const [search, setSearch] = useState({
    query: "",
    country: "Tous",
    city: "Toutes",
    sector: "Tous",
    experience: "Tous",
  });

  const filteredJobs = useMemo(() => {
    const normalizedQuery = search.query.trim().toLowerCase();

    return featuredJobs.filter((job) => {
      const matchesQuery = normalizedQuery
        ? [job.title, job.company, job.location, job.description, ...job.fullDescription, ...job.skills].join(" ").toLowerCase().includes(normalizedQuery)
        : true;

      return (
        matchesQuery &&
        (search.country === "Tous" || job.country === search.country) &&
        (search.city === "Toutes" || job.city === search.city) &&
        (search.sector === "Tous" || job.sector === search.sector) &&
        (search.experience === "Tous" || job.experience === search.experience)
      );
    });
  }, [search]);

  function launchSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch({
      query: draftQuery,
      country: draftCountry,
      city: draftCity,
      sector: draftSector,
      experience: draftExperience,
    });
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-12 lg:px-8">
      <section className="grid gap-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{t("jobs.eyebrow")}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {t("jobs.title")}
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            {t("jobs.description")}
          </p>
        </div>
        <form onSubmit={launchSearch} className="grid gap-4 rounded-lg bg-slate-950 p-5 text-slate-100">
          <label className="grid gap-2 text-sm">
            {t("jobs.searchLabel")}
            <input
              value={draftQuery}
              onChange={(event) => setDraftQuery(event.target.value)}
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none ring-cyan-400 focus:ring-2"
              placeholder={t("jobs.searchPlaceholder")}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <Filter label={t("jobs.filters.country")} value={draftCountry} onChange={setDraftCountry} options={jobFilters.countries} />
            <Filter label={t("jobs.filters.city")} value={draftCity} onChange={setDraftCity} options={jobFilters.cities} />
            <Filter label={t("jobs.filters.sector")} value={draftSector} onChange={setDraftSector} options={jobFilters.sectors} />
            <Filter label={t("jobs.filters.experience")} value={draftExperience} onChange={setDraftExperience} options={jobFilters.experience} />
          </div>
          <button type="submit" className="rounded-md bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200">
            {t("jobs.searchButton")}
          </button>
        </form>
      </section>

      <section>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{filteredJobs.length} {t("jobs.found")}</h2>
          <p className="mt-1 text-sm text-slate-600">{t("jobs.sources")}</p>
        </div>
      </section>

      <section className="grid gap-6">
        {filteredJobs.map((job) => (
          <article key={job.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-cyan-600">{job.company}</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">{job.title}</h3>
                <p className="mt-2 text-slate-600">{job.location} · {job.type} · {job.experience}</p>
              </div>
              <div className="text-left lg:text-right">
                <p className="text-sm text-slate-500">{t("jobs.postedOn")} {new Date(job.posted).toLocaleDateString(locale === "ar" ? "ar-MA" : locale === "en" ? "en-GB" : "fr-FR")}</p>
                <p className="mt-2 font-semibold text-slate-900">{job.salary}</p>
                <p className="mt-1 text-sm text-slate-500">{job.source}</p>
              </div>
            </div>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">{job.description}</p>
            <div className="mt-4 max-w-4xl rounded-md border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold text-slate-900">Description complète de l’offre</h4>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {job.fullDescription.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span key={skill} className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-5">
              <Link href={`/${locale}/dossier-candidature`} className="inline-flex rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
                {t("jobs.official")}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="grid gap-2 text-sm">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none ring-cyan-400 focus:ring-2"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
