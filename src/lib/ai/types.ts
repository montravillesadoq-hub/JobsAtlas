export type AiProviderName = "gemini" | "openai";

export type AiCallOptions = {
  task: string;
  prompt: string;
  system?: string;
  responseFormat?: "text" | "json";
  cacheKey?: string;
};

export type AiCallResult<T = string> = {
  provider: AiProviderName | "fallback";
  model: string;
  cached: boolean;
  data: T;
};

export type JobOfferInput = {
  title?: string;
  company?: string;
  location?: string;
  description: string;
  skills?: string[];
  salary?: string;
  source?: string;
};

export type UserProfileInput = {
  role?: string;
  location?: string;
  skills?: string[];
  preferences?: string[];
  cvSummary?: string;
};

export type JobAnalysis = {
  summary: string;
  technicalSkills: string[];
  softSkills: string[];
  qualifications: string[];
  experience: string[];
  risks: string[];
  matchScore?: number;
};

export type JobRecommendation = {
  title: string;
  company: string;
  reason: string;
  matchScore: number;
};

export type DocumentGenerationInput = {
  profile?: UserProfileInput;
  job?: JobOfferInput;
  form?: Record<string, unknown>;
  tone?: string;
  country?: string;
  language?: string;
  template?: string;
};
