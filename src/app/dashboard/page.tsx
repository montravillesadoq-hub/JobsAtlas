import { dashboardModules } from "@/lib/content";

export default function DashboardPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-16 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-600 to-blue-700 p-8 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Tableau de bord</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Bienvenue dans votre espace JobsAtlas</h1>
        <p className="mt-4 max-w-2xl text-lg text-cyan-50">
          Gérez votre profil, vos CV, vos lettres, vos offres enregistrées et suivez l’évolution de vos candidatures.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {dashboardModules.map((module) => (
          <div key={module.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{module.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{module.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
