export function localeToAiLanguage(locale?: string) {
  if (locale === "en") {
    return "English";
  }

  if (locale === "ar") {
    return "Arabic";
  }

  return "French";
}
