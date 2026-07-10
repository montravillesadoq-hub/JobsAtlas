"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { defaultLocale, getDirection, isLocale, localeMeta, type Locale, withLocale } from "@/lib/i18n/config";
import { dictionaries, type Dictionary } from "@/lib/i18n/dictionaries";

type I18nContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const pathLocale = pathname.split("/").filter(Boolean)[0];
  const initialLocale = isLocale(pathLocale) ? pathLocale : defaultLocale;
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem("jobsatlas-locale");
    const nextLocale = isLocale(pathLocale) ? pathLocale : isLocale(stored || undefined) ? (stored as Locale) : defaultLocale;
    const frame = window.requestAnimationFrame(() => setLocaleState(nextLocale));

    return () => window.cancelAnimationFrame(frame);
  }, [pathLocale]);

  useEffect(() => {
    const dir = getDirection(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.body.dir = dir;
    document.body.classList.toggle("rtl", dir === "rtl");
    window.localStorage.setItem("jobsatlas-locale", locale);
    document.cookie = `jobsatlas-locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;

    void fetch("/api/profile/language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    }).catch(() => undefined);
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const dictionary = dictionaries[locale];

    return {
      locale,
      dir: localeMeta[locale].dir,
      dictionary,
      setLocale(nextLocale) {
        setLocaleState(nextLocale);
        router.push(withLocale(pathname, nextLocale));
      },
      t(key) {
        const value = key.split(".").reduce<unknown>((current, part) => {
          if (current && typeof current === "object" && part in current) {
            return (current as Record<string, unknown>)[part];
          }

          return undefined;
        }, dictionary);

        return typeof value === "string" ? value : key;
      },
    };
  }, [locale, pathname, router]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
