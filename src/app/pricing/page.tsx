import { pricingTiers } from "@/lib/content";

export default function PricingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Tarifs</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Choisissez un abonnement adapté à votre parcours.
        </h1>
        <p className="mt-6 text-lg text-slate-600">
          Des plans flexibles pour découvrir, postuler et accélérer vos candidatures à l’international.
        </p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {pricingTiers.map((tier) => (
          <div key={tier.name} className={`rounded-3xl border p-6 shadow-sm ${tier.featured ? "border-cyan-500 bg-cyan-50" : "border-slate-200 bg-white"}`}>
            <h2 className="text-xl font-semibold text-slate-900">{tier.name}</h2>
            <p className="mt-3 text-sm text-slate-600">{tier.description}</p>
            <p className="mt-6 text-4xl font-semibold text-slate-900">{tier.price}</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {tier.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
