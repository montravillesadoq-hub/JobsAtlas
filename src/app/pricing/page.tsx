"use client";

import { FormEvent, useState } from "react";
import { pricingTiers } from "@/lib/content";
import { useI18n } from "@/lib/i18n/client";

export default function PricingPage() {
  const { t } = useI18n();
  const [plan, setPlan] = useState("Standard");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/payments", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    const data = await response.json();
    setLoading(false);
    setMessage(data.message || data.error || "Reçu envoyé.");
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{t("pricing.eyebrow")}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {t("pricing.title")}
        </h1>
        <p className="mt-6 text-lg text-slate-600">
          {t("pricing.description")}
        </p>
      </div>

      <section className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {pricingTiers.map((tier) => (
          <button
            type="button"
            onClick={() => setPlan(tier.name)}
            key={tier.name}
            className={`rounded-lg border p-6 text-left shadow-sm transition ${plan === tier.name ? "border-cyan-500 bg-cyan-50" : "border-slate-200 bg-white hover:border-cyan-300"}`}
          >
            <h2 className="text-xl font-semibold text-slate-900">{tier.name}</h2>
            <p className="mt-3 text-sm text-slate-600">{tier.description}</p>
            <p className="mt-6 text-4xl font-semibold text-slate-900">{tier.price}</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </button>
        ))}
      </section>

      <section className="mt-10 grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{t("pricing.bankTransfer")}</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{t("pricing.uploadReceipt")}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {t("pricing.receiptDescription")}
          </p>
          <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm text-slate-700">
            IBAN : MA64 0000 0000 0000 0000 0000 0000<br />
            {t("pricing.beneficiary")}
          </div>
        </div>
        <form onSubmit={handlePayment} className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            {t("pricing.plan")}
            <select name="plan" value={plan} onChange={(event) => setPlan(event.target.value)} className="rounded-md border border-slate-300 px-3 py-2">
              {pricingTiers.map((tier) => (
                <option key={tier.name}>{tier.name}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            {t("pricing.accountEmail")}
            <input name="email" type="email" required className="rounded-md border border-slate-300 px-3 py-2" placeholder="vous@example.com" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            {t("pricing.receipt")}
            <input name="receipt" type="file" accept="image/*,.pdf" required className="rounded-md border border-dashed border-slate-300 p-4 text-sm" />
          </label>
          <button disabled={loading} className="rounded-md bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-60">
            {loading ? t("pricing.sending") : t("pricing.sendReceipt")}
          </button>
          {message ? <p className="rounded-md bg-cyan-50 p-4 text-sm text-cyan-900">{message}</p> : null}
        </form>
      </section>
    </main>
  );
}
