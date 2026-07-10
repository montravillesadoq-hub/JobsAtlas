"use client";

import Link from "next/link";
import { benefits, faqs, platformStats, services, testimonials } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { useI18n } from "@/lib/i18n/client";

export default function Home() {
  const { locale, t, dictionary } = useI18n();

  return (
    <main className="flex flex-col">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{t("home.eyebrow")}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t("home.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600">
              {t("home.description")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${locale}/auth/signup`} className="rounded-md bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700">
                {t("nav.signup")}
              </Link>
              <Link href={`/${locale}/auth/login`} className="rounded-md border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-600">
                {t("nav.login")}
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-950 p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">{t("home.why")}</p>
            <ul className="mt-6 space-y-4 text-sm text-slate-200">
              {dictionary.home.whyItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {platformStats.map((stat) => (
                <div key={stat.label} className="rounded-md border border-slate-800 bg-slate-900 p-4">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <SectionHeading
            eyebrow={t("home.benefitsEyebrow")}
            title={t("home.benefitsTitle")}
            description={t("home.benefitsDescription")}
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <SectionHeading
          eyebrow={t("home.servicesEyebrow")}
          title={t("home.servicesTitle")}
          description={t("home.servicesDescription")}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("home.testimonialsEyebrow")}
            title={t("home.testimonialsTitle")}
            description={t("home.testimonialsDescription")}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-lg border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm leading-7 text-slate-300">“{testimonial.quote}”</p>
                <p className="mt-6 font-semibold">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow={t("home.faqEyebrow")}
          title={t("home.faqTitle")}
          description={t("home.faqDescription")}
          align="center"
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
              <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8">
        <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-8 text-center shadow-sm">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{t("home.ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {t("home.ctaDescription")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/auth/signup`} className="rounded-md bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700">
              {t("nav.signup")}
            </Link>
            <Link href={`/${locale}/dashboard`} className="rounded-md border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-600">
              {t("home.viewDashboard")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
