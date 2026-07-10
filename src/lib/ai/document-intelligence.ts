import { parseJsonResponse } from "@/lib/ai/json";
import { localeToAiLanguage } from "@/lib/ai/language";
import { callOpenAI } from "@/lib/ai/providers/openai";
import type { AiCallResult, DocumentGenerationInput } from "@/lib/ai/types";

const DOCUMENT_SYSTEM = [
  "Tu es l’assistant candidature de JobsAtlas.",
  "Tu génères des documents naturels, professionnels, optimisés ATS et adaptés au pays ciblé.",
  "Ne mentionne jamais de compétences non fournies comme des faits acquis.",
].join(" ");

export type GeneratedCv = {
  title: string;
  template: string;
  atsScore: number;
  sections: Array<{ title: string; content: string[] }>;
  improvements: string[];
  exportFormats: string[];
};

export type GeneratedLetter = {
  subject: string;
  tone: string;
  body: string;
  exportFormats: string[];
};

export async function generateCv(input: DocumentGenerationInput): Promise<AiCallResult<GeneratedCv>> {
  const language = input.language || localeToAiLanguage(String(input.form?.locale || ""));
  const prompt = `Génère un CV professionnel ATS. Réponds en JSON:
{"title":"","template":"","atsScore":0,"sections":[{"title":"","content":[""]}],"improvements":[""],"exportFormats":["PDF","Word"]}

Données:
${JSON.stringify(input, null, 2)}

Langue obligatoire du CV: ${language}`;

  const result = await safeOpenAI("cv-generation", prompt);
  const fallback = buildFallbackCv(input);
  const data = result.data ? parseJsonResponse<GeneratedCv>(result.data, fallback) : fallback;

  return { ...result, data };
}

export async function improveImportedCv(fileName: string, targetRole?: string, locale?: string): Promise<AiCallResult<GeneratedCv>> {
  const language = localeToAiLanguage(locale);
  const prompt = `Analyse et améliore un CV importé nommé ${fileName}. Poste cible: ${targetRole || "non précisé"}.
Réponds en JSON:
{"title":"","template":"","atsScore":0,"sections":[{"title":"","content":[""]}],"improvements":[""],"exportFormats":["PDF","Word"]}

Langue obligatoire du CV: ${language}`;

  const result = await safeOpenAI("cv-import-improvement", prompt);
  const fallback = buildFallbackCv({ form: { fileName, targetRole } });
  const data = result.data ? parseJsonResponse<GeneratedCv>(result.data, fallback) : fallback;

  return { ...result, data };
}

export async function generateLetter(input: DocumentGenerationInput): Promise<AiCallResult<GeneratedLetter>> {
  const language = input.language || localeToAiLanguage(String(input.form?.locale || ""));
  const prompt = `Génère une lettre de motivation personnalisée. Réponds en JSON:
{"subject":"","tone":"","body":"","exportFormats":["PDF","Word"]}

Données:
${JSON.stringify(input, null, 2)}

Langue obligatoire de la lettre: ${language}`;

  const result = await safeOpenAI("letter-generation", prompt);
  const fallback = {
    subject: `Candidature - ${input.job?.title || input.form?.role || "poste visé"}`,
    tone: input.tone || "Professionnel et naturel",
    body: `Madame, Monsieur,\n\nJe vous adresse ma candidature pour ${input.job?.title || input.form?.role || "ce poste"}. Mon parcours, mes compétences et ma motivation me permettent de répondre aux attentes du poste tout en m’adaptant au contexte de ${input.country || "votre marché"}.\n\nJe serais ravi d’échanger avec vous sur ma contribution possible.\n\nCordialement,`,
    exportFormats: ["PDF", "Word"],
  };
  const data = result.data ? parseJsonResponse<GeneratedLetter>(result.data, fallback) : fallback;

  return { ...result, data };
}

export async function askCareerAssistant(question: string, context?: DocumentGenerationInput, locale?: string): Promise<AiCallResult<{ answer: string; interviewQuestions: string[] }>> {
  const language = context?.language || localeToAiLanguage(locale);
  const prompt = `Réponds comme assistant de carrière JobsAtlas. Donne des conseils CV, entretien et recrutement. Réponds en JSON:
{"answer":"","interviewQuestions":[""]}

Question: ${question}
Contexte:
${JSON.stringify(context || {}, null, 2)}

Langue obligatoire de réponse: ${language}`;

  const result = await safeOpenAI("career-assistant", prompt);
  const fallback = {
    answer: "Mode démonstration : améliorez votre CV avec des résultats mesurables, adaptez le vocabulaire à l’offre et préparez 3 exemples concrets pour l’entretien.",
    interviewQuestions: [
      "Pouvez-vous présenter un projet où vous avez obtenu un résultat mesurable ?",
      "Pourquoi ce poste et cette entreprise vous intéressent-ils ?",
      "Comment gérez-vous une priorité urgente avec peu d’informations ?",
    ],
  };
  const data = result.data ? parseJsonResponse<typeof fallback>(result.data, fallback) : fallback;

  return { ...result, data };
}

async function safeOpenAI(task: string, prompt: string) {
  try {
    return await callOpenAI({
      task,
      prompt,
      system: DOCUMENT_SYSTEM,
      responseFormat: "json",
    });
  } catch {
    return {
      provider: "fallback" as const,
      model: "local-fallback",
      cached: false,
      data: "",
    };
  }
}

function buildFallbackCv(input: DocumentGenerationInput): GeneratedCv {
  const role = String(input.form?.targetRole || input.form?.role || input.job?.title || "poste ciblé");

  return {
    title: `CV optimisé - ${role}`,
    template: input.template || "Moderne ATS",
    atsScore: 86,
    sections: [
      {
        title: "Résumé professionnel",
        content: [`Profil orienté ${role}, avec une présentation claire des compétences, expériences et résultats.`],
      },
      {
        title: "Compétences",
        content: ["Compétences techniques alignées avec l’offre", "Communication professionnelle", "Résolution de problèmes"],
      },
      {
        title: "Expériences",
        content: ["Décrire chaque mission avec action, contexte et résultat mesurable."],
      },
    ],
    improvements: ["Ajouter des métriques", "Reprendre les mots-clés de l’offre", "Simplifier les intitulés pour l’ATS"],
    exportFormats: ["PDF", "Word"],
  };
}
