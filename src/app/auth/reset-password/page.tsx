"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase-client";
import { useI18n } from "@/lib/i18n/client";

export default function ResetPasswordPage() {
  const { locale, t } = useI18n();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      setMessage(t("auth.supabaseMissingReset"));
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/${locale}/auth/login`,
    });
    setLoading(false);

    setMessage(error ? error.message : t("auth.resetSuccess"));
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{t("auth.resetEyebrow")}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">{t("auth.resetTitle")}</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input className="w-full rounded-md border border-slate-200 px-4 py-3" placeholder={t("common.email")} type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <button disabled={loading} className="w-full rounded-md bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? t("auth.sending") : t("auth.resetButton")}
          </button>
        </form>
        {message ? <p className="mt-4 text-sm text-slate-600">{message}</p> : null}
        <p className="mt-6 text-sm text-slate-600">
          {t("auth.backLogin")} <Link href={`/${locale}/auth/login`} className="font-semibold text-cyan-600">{t("nav.login")}</Link>
        </p>
      </div>
    </main>
  );
}
