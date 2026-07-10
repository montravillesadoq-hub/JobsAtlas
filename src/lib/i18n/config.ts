export const locales = ["fr", "en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeMeta: Record<Locale, { name: string; nativeName: string; flag: string; dir: "ltr" | "rtl" }> = {
  fr: { name: "French", nativeName: "Français", flag: "🇫🇷", dir: "ltr" },
  en: { name: "English", nativeName: "English", flag: "🇬🇧", dir: "ltr" },
  ar: { name: "Arabic", nativeName: "العربية", flag: "🇲🇦", dir: "rtl" },
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function getDirection(locale: Locale) {
  return localeMeta[locale].dir;
}

export function stripLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (isLocale(first)) {
    return `/${segments.slice(1).join("/")}` || "/";
  }

  return pathname || "/";
}

export function withLocale(pathname: string, locale: Locale) {
  const stripped = stripLocale(pathname);
  return stripped === "/" ? `/${locale}` : `/${locale}${stripped}`;
}
