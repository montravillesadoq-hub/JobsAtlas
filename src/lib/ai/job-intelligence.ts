import { featuredJobs } from "@/lib/content";
import { localeToAiLanguage } from "@/lib/ai/language";
import { parseJsonResponse } from "@/lib/ai/json";
import { callGemini } from "@/lib/ai/providers/gemini";
import type { AiCallResult, JobAnalysis, JobOfferInput, JobRecommendation, UserProfileInput } from "@/lib/ai/types";

const JOB_SYSTEM = [
  "Tu es le moteur d’intelligence emploi de JobsAtlas.",
  "Analyse les offres avec précision, en français clair, sans inventer d’informations absentes.",
  "Réponds en JSON valide quand demandé.",
].join(" ");

const fallbackAnalysis: JobAnalysis = {
  summary: "Offre analysée en mode démonstration. Le poste demande une bonne compréhension du métier, des compétences adaptées au secteur et une candidature claire.",
  technicalSkills: ["Analyse métier", "Communication écrite", "Outils numériques"],
  softSkills: ["Autonomie", "Collaboration", "Rigueur"],
  qualifications: ["Diplôme ou expérience équivalente selon le poste"],
  experience: ["Expérience pertinente appréciée"],
  risks: ["Vérifier les critères de visa, langue et disponibilité avant de postuler"],
  matchScore: 78,
};

export async function analyzeJobOffer(job: JobOfferInput, locale?: string): Promise<AiCallResult<JobAnalysis>> {
  const language = localeToAiLanguage(locale);
  const prompt = `Analyse cette offre et retourne exactement ce JSON:
{
  "summary": "résumé court",
  "technicalSkills": ["..."],
  "softSkills": ["..."],
  "qualifications": ["..."],
  "experience": ["..."],
  "risks": ["..."],
  "matchScore": 0
}

Offre:
${JSON.stringify(job, null, 2)}

Langue obligatoire de réponse: ${language}`;

  const result = await safeGemini("job-analysis", prompt);
  const data = result.data ? parseJsonResponse<JobAnalysis>(result.data, fallbackAnalysis) : fallbackAnalysis;

  return { ...result, data };
}

export async function recommendJobs(profile: UserProfileInput, locale?: string): Promise<AiCallResult<JobRecommendation[]>> {
  const language = localeToAiLanguage(locale);
  const prompt = `Recommande les meilleures offres pour ce profil.
Réponds en JSON: {"recommendations":[{"title":"","company":"","reason":"","matchScore":0}]}

Profil:
${JSON.stringify(profile, null, 2)}

Offres:
${JSON.stringify(featuredJobs, null, 2)}

Langue obligatoire de réponse: ${language}`;

  const result = await safeGemini("job-recommendation", prompt);
  const fallback = {
    recommendations: featuredJobs.slice(0, 3).map((job, index) => ({
      title: job.title,
      company: job.company,
      reason: `Correspondance de démonstration avec vos préférences et compétences. Priorité ${index + 1}.`,
      matchScore: 88 - index * 6,
    })),
  };
  const data = result.data ? parseJsonResponse<typeof fallback>(result.data, fallback).recommendations : fallback.recommendations;

  return { ...result, data };
}

export async function compareJobs(jobs: JobOfferInput[], locale?: string): Promise<AiCallResult<{ comparison: Array<{ title: string; pros: string[]; cons: string[] }>; verdict: string }>> {
  const language = localeToAiLanguage(locale);
  const prompt = `Compare ces offres d’emploi et retourne un JSON:
{"comparison":[{"title":"","pros":[""],"cons":[""]}],"verdict":""}

Offres:
${JSON.stringify(jobs, null, 2)}

Langue obligatoire de réponse: ${language}`;

  const result = await safeGemini("job-comparison", prompt);
  const fallback = {
    comparison: jobs.map((job) => ({
      title: job.title || "Offre",
      pros: ["Bonne opportunité à étudier", "Compétences transférables utiles"],
      cons: ["Informations salariales ou exigences à confirmer"],
    })),
    verdict: "Choisissez l’offre avec le meilleur alignement entre compétences, localisation, salaire et perspectives.",
  };
  const data = result.data ? parseJsonResponse<typeof fallback>(result.data, fallback) : fallback;

  return { ...result, data };
}

export async function translateJob(job: JobOfferInput, language: string): Promise<AiCallResult<{ language: string; translated: string }>> {
  const prompt = `Traduis cette offre en ${language}. Préserve les titres, compétences, diplômes et conditions. Réponds en JSON: {"language":"","translated":""}

${JSON.stringify(job, null, 2)}`;

  const result = await safeGemini("job-translation", prompt);
  const fallback = {
    language,
    translated: `Traduction de démonstration en ${language}. Configurez GEMINI_API_KEY pour obtenir une traduction complète de l’offre.`,
  };
  const data = result.data ? parseJsonResponse<typeof fallback>(result.data, fallback) : fallback;

  return { ...result, data };
}

export async function askJobAssistant(question: string, context?: JobOfferInput, locale?: string): Promise<AiCallResult<{ answer: string; suggestions: string[] }>> {
  const language = localeToAiLanguage(locale);
  const prompt = `Réponds à la question de l’utilisateur sur une offre, un métier, un CV ou un entretien. Réponds en JSON: {"answer":"","suggestions":[""]}

Question: ${question}
Contexte:
${JSON.stringify(context || {}, null, 2)}

Langue obligatoire de réponse: ${language}`;

  const result = await safeGemini("job-assistant", prompt);
  const fallback = {
    answer: "Mode démonstration : clarifiez les exigences clés de l’offre, comparez-les à votre CV et préparez des exemples mesurables pour l’entretien.",
    suggestions: ["Analyser les compétences manquantes", "Préparer une réponse STAR", "Adapter le CV à cette offre"],
  };
  const data = result.data ? parseJsonResponse<typeof fallback>(result.data, fallback) : fallback;

  return { ...result, data };
}

async function safeGemini(task: string, prompt: string) {
  try {
    return await callGemini({
      task,
      prompt,
      system: JOB_SYSTEM,
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
