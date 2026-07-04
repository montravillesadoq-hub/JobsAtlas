import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">JobsAtlas</p>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            Plateforme moderne pour trouver des opportunités à l’international et générer des documents de candidature intelligents.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/jobs" className="transition hover:text-white">Offres</Link>
          <Link href="/pricing" className="transition hover:text-white">Tarifs</Link>
          <Link href="/admin" className="transition hover:text-white">Administration</Link>
        </div>
      </div>
    </footer>
  );
}
