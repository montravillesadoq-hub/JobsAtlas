import { dictionaries } from "@/lib/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

type EmailTemplateInput = {
  locale?: string;
  name?: string;
  actionUrl?: string;
};

export function getEmailTemplates(input: EmailTemplateInput = {}) {
  const locale: Locale = isLocale(input.locale) ? input.locale : defaultLocale;
  const name = input.name || "JobsAtlas";
  const actionUrl = input.actionUrl || "https://jobsatlas.example.com";

  if (locale === "en") {
    return {
      verifyEmail: {
        subject: "Verify your JobsAtlas email",
        body: `Hello ${name}, confirm your email to activate your JobsAtlas account: ${actionUrl}`,
      },
      passwordReset: {
        subject: "Reset your JobsAtlas password",
        body: `Hello ${name}, use this secure link to reset your password: ${actionUrl}`,
      },
      paymentValidated: {
        subject: "Your JobsAtlas subscription is active",
        body: `Hello ${name}, your payment has been approved and your subscription is now active.`,
      },
    };
  }

  if (locale === "ar") {
    return {
      verifyEmail: {
        subject: "تأكيد بريدك في JobsAtlas",
        body: `مرحباً ${name}، أكد بريدك الإلكتروني لتفعيل حسابك في JobsAtlas: ${actionUrl}`,
      },
      passwordReset: {
        subject: "إعادة تعيين كلمة مرور JobsAtlas",
        body: `مرحباً ${name}، استخدم هذا الرابط الآمن لإعادة تعيين كلمة المرور: ${actionUrl}`,
      },
      paymentValidated: {
        subject: "تم تفعيل اشتراكك في JobsAtlas",
        body: `مرحباً ${name}، تمت الموافقة على الدفع وأصبح اشتراكك نشطاً الآن.`,
      },
    };
  }

  return {
    verifyEmail: {
      subject: "Vérifiez votre e-mail JobsAtlas",
      body: `Bonjour ${name}, confirmez votre e-mail pour activer votre compte JobsAtlas : ${actionUrl}`,
    },
    passwordReset: {
      subject: "Réinitialisez votre mot de passe JobsAtlas",
      body: `Bonjour ${name}, utilisez ce lien sécurisé pour réinitialiser votre mot de passe : ${actionUrl}`,
    },
    paymentValidated: {
      subject: "Votre abonnement JobsAtlas est actif",
      body: `Bonjour ${name}, votre paiement a été validé et votre abonnement est maintenant actif.`,
    },
  };
}

export function getLocalizedEmailFooter(locale?: string) {
  const currentLocale = isLocale(locale) ? locale : defaultLocale;
  return dictionaries[currentLocale].common.appName;
}
