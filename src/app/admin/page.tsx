import { adminStats } from "@/lib/content";

export default function AdminPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-16 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Administration</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Panneau d’administration JobsAtlas</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Gérez les utilisateurs, les abonnements, les paiements, les offres, les témoignages, les FAQ et les contenus de la plateforme.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {adminStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
