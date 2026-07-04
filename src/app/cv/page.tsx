export default function CVPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-16 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Création de CV</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Créez ou améliorez votre CV grâce à l’IA</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Créez un nouveau CV, importez un PDF ou Word, puis faites corriger, améliorer et exporter votre document en PDF ou Word.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-950 p-6 text-slate-100">
            <h2 className="text-xl font-semibold">Nouveau CV</h2>
            <p className="mt-3 text-sm text-slate-300">Un formulaire complet permet de générer un CV moderne et compatible ATS.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Importer un CV</h2>
            <p className="mt-3 text-sm text-slate-600">Téléversez un document PDF ou Word pour le corriger et l’optimiser.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
