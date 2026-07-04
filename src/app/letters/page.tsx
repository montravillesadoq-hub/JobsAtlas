export default function LettersPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-16 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Lettres de motivation</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Générez des lettres personnalisées en quelques secondes</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          L’IA s’appuie sur votre CV, l’offre cible, le pays et le poste pour créer un texte convaincant et exportable.
        </p>
        <div className="mt-8 rounded-2xl bg-cyan-50 p-6 text-slate-800">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Export</p>
          <p className="mt-2">PDF et Word disponibles à la génération.</p>
        </div>
      </div>
    </main>
  );
}
