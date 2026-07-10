"use client";

import { localeMeta, locales, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <span className={compact ? "sr-only" : "hidden lg:inline"}>{t("common.language")}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-900 outline-none ring-cyan-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        aria-label={t("common.language")}
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {localeMeta[item].flag} {localeMeta[item].nativeName}
          </option>
        ))}
      </select>
    </label>
  );
}
