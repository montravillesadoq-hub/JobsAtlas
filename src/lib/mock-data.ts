export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  plan: string;
  completion: number;
};

export const mockProfile: Profile = {
  name: "Said Benali",
  role: "Développeur Full Stack",
  location: "Casablanca, Maroc",
  email: "said@example.com",
  plan: "Premium",
  completion: 82,
};

export const mockCvSummary = {
  title: "CV IA optimisé",
  status: "Prêt à exporter",
  lastUpdated: "Aujourd’hui",
  atsScore: 94,
};

export const mockApplications = [
  { job: "Senior Product Manager", company: "Nexora Labs", status: "Entretien programmé", date: "2026-07-05" },
  { job: "Frontend Developer", company: "BluePeak", status: "CV envoyé", date: "2026-07-02" },
  { job: "Data Engineer", company: "Atlas Cloud", status: "Lettre générée", date: "2026-06-29" },
];

export const mockSavedJobs = [
  { job: "Data Engineer", company: "Atlas Cloud", location: "Lyon, France" },
  { job: "UX Researcher", company: "North Star", location: "Montréal, Canada" },
];

export const mockSubscription = {
  plan: "Premium",
  status: "Actif",
  renewal: "2026-08-04",
  documentsLeft: "Illimité",
};

export const mockNotifications = [
  "Votre reçu Premium a été validé.",
  "4 nouvelles offres correspondent à votre recherche France + Cloud.",
  "Votre CV principal a gagné 6 points ATS après optimisation.",
];
