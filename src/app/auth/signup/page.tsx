export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Inscription</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Créer votre compte JobsAtlas</h1>
        <p className="mt-4 text-sm text-slate-600">Inscription par e-mail, connexion Google et vérification par e-mail seront intégrées via Supabase.</p>
        <form className="mt-8 space-y-4">
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" />
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Mot de passe" type="password" />
          <button className="w-full rounded-2xl bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700">Créer un compte</button>
        </form>
      </div>
    </main>
  );
}
