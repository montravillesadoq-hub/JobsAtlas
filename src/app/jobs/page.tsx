import Link from "next/link";
import { featuredJobs } from "@/lib/content";

export default function JobsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8">
      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Recherche d’emploi</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Trouvez l’opportunité idéale dans plusieurs pays.
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Filtrez par pays, ville, métier, secteur, contrat, expérience et salaire pour découvrir les offres officielles et les postes privés.
          </p>
        </div>
        <div className="rounded-2xl bg-slate-950 p-6 text-slate-100">
          <h2 className="text-xl font-semibold">Filtres disponibles</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Pays</li>
            <li>• Ville</li>
            <li>• Métier</li>
            <li>• Secteur</li>
            <li>• Type de contrat</li>
            <li>• Niveau d’expérience</li>
            <li>• Salaire</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6">
        {featuredJobs.map((job) => (
          <article key={job.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-cyan-600">{job.company}</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">{job.title}</h3>
                <p className="mt-2 text-slate-600">{job.location} • {job.type}</p>
              </div>
              <div className="text-left lg:text-right">
                <p className="text-sm text-slate-500">{job.posted}</p>
                <p className="mt-2 font-semibold text-slate-900">{job.salary}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={job.link} className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
                Voir l’annonce officielle
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
