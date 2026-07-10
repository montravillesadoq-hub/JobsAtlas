"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase-client";
import { useI18n } from "@/lib/i18n/client";

export default function SignupPage() {
  const { locale, t } = useI18n();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      setMessage(t("auth.supabaseMissingSignup"));
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/${locale}/dashboard`,
      },
    });
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(t("auth.signupSuccess"));
  }

  async function handleGoogleSignup() {
    if (!isSupabaseConfigured() || !supabase) {
      setMessage(t("auth.googleMissing"));
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/${locale}/dashboard`,
      },
    });

    if (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{t("auth.signupEyebrow")}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">{t("auth.signupTitle")}</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input className="w-full rounded-md border border-slate-200 px-4 py-3" placeholder={t("common.fullName")} value={fullName} onChange={(event) => setFullName(event.target.value)} required />
          <input className="w-full rounded-md border border-slate-200 px-4 py-3" placeholder={t("common.email")} type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <input className="w-full rounded-md border border-slate-200 px-4 py-3" placeholder={t("common.password")} type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} />
          <button disabled={loading} className="w-full rounded-md bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70">{loading ? t("auth.creating") : t("auth.signupButton")}</button>
        </form>
        <button onClick={handleGoogleSignup} className="mt-3 w-full rounded-md border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-700">
          {t("auth.google")}
        </button>
        {message ? <p className="mt-4 text-sm text-slate-600">{message}</p> : null}
        <p className="mt-6 text-sm text-slate-600">
          {t("auth.hasAccount")} <Link href={`/${locale}/auth/login`} className="font-semibold text-cyan-600">{t("nav.login")}</Link>
        </p>
      </div>
    </main>
  );
}
