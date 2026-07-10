export const benefits = [
  {
    title: "Recherche multinationale",
    description: "Trouvez des postes dans plusieurs pays avec des filtres précis et des alertes adaptées.",
  },
  {
    title: "Documents IA",
    description: "Générez automatiquement un CV ATS et une lettre de motivation personnalisée depuis une offre.",
  },
  {
    title: "Suivi sécurisé",
    description: "Accédez à votre espace avec authentification robuste, rôles et sauvegardes automatiques.",
  },
];

export const platformStats = [
  { label: "Pays couverts", value: "24" },
  { label: "Sources suivies", value: "180+" },
  { label: "Documents générés", value: "12k" },
  { label: "Score ATS moyen", value: "91%" },
];

export const services = [
  {
    title: "Moteur d’emploi intelligent",
    description: "Centralisez les offres issues de sources officielles, publiques et privées.",
  },
  {
    title: "Création de CV IA",
    description: "Créez ou améliorez un CV professionnel, clair et adapté au poste cible.",
  },
  {
    title: "Gestion d’abonnement",
    description: "Bénéficiez d’un accès premium pour accélérer vos candidatures et votre visibilité.",
  },
];

export const testimonials = [
  {
    quote: "JobsAtlas m’a permis de postuler en 3 semaines dans 4 pays différents avec des documents prêts à l’emploi.",
    name: "Amina B.",
    role: "Product Designer",
  },
  {
    quote: "L’IA a transformé mon CV en un document parfaitement aligné avec les attentes des recruteurs.",
    name: "Karim L.",
    role: "Data Analyst",
  },
  {
    quote: "Le tableau de bord est clair, rapide et conçu pour suivre chaque candidature sans effort.",
    name: "Leila M.",
    role: "HR Manager",
  },
];

export const faqs = [
  {
    question: "Est-ce que JobsAtlas fonctionne pour plusieurs pays ?",
    answer: "Oui. La plateforme propose des offres et des critères locaux adaptés selon le pays, la ville et le secteur.",
  },
  {
    question: "Puis-je importer un CV existant ?",
    answer: "Oui. Vous pouvez téléverser un PDF ou un document Word et l’IA l’optimisera pour votre poste cible.",
  },
  {
    question: "Le paiement se fait-il en ligne ?",
    answer: "Non. Les abonnements sont activés après validation du virement bancaire et de votre justificatif.",
  },
];

export const featuredJobs = [
  {
    id: "job-001",
    title: "Senior Product Manager",
    company: "Nexora Labs",
    location: "Paris, France",
    country: "France",
    city: "Paris",
    sector: "Technologie",
    experience: "Senior",
    salary: "€72k – €90k",
    type: "CDI",
    posted: "2026-07-02",
    description: "Pilotage de la roadmap produit, discovery avec les clients enterprise et coordination des squads design, data et engineering.",
    fullDescription: [
      "Vous pilotez la roadmap produit de bout en bout, depuis la discovery utilisateur jusqu’au suivi des indicateurs après livraison.",
      "Vous travaillez avec les clients enterprise pour transformer leurs besoins en priorités produit claires, mesurables et partagées avec les équipes.",
      "Vous coordonnez les squads design, data et engineering afin de livrer des fonctionnalités fiables, utiles et alignées avec les objectifs business.",
      "Vous préparez les rituels produit, les arbitrages de priorité, les analyses de marché et les synthèses destinées aux parties prenantes.",
    ],
    skills: ["Roadmap", "Discovery", "SaaS", "Leadership"],
    source: "Portail entreprise",
    link: "https://example.com/jobs/senior-product-manager",
  },
  {
    id: "job-002",
    title: "Frontend Developer",
    company: "BluePeak",
    location: "Berlin, Allemagne",
    country: "Allemagne",
    city: "Berlin",
    sector: "Logiciel",
    experience: "Confirmé",
    salary: "€58k – €75k",
    type: "Temps plein",
    posted: "2026-06-30",
    description: "Développement d’interfaces React performantes, design system, accessibilité et collaboration avec l’équipe produit.",
    fullDescription: [
      "Vous développez des interfaces React et TypeScript performantes pour une plateforme SaaS utilisée par des équipes produit et recrutement.",
      "Vous contribuez au design system, à la qualité du code, aux tests et à l’accessibilité afin de garantir une expérience fluide sur desktop et mobile.",
      "Vous collaborez avec les designers, product managers et développeurs backend pour transformer les maquettes en parcours complets et maintenables.",
      "Vous participez aux revues de code, à l’optimisation des performances et à l’amélioration continue des composants partagés.",
    ],
    skills: ["React", "TypeScript", "Accessibilité", "Testing"],
    source: "Agence fédérale emploi",
    link: "https://example.com/jobs/frontend-developer",
  },
  {
    id: "job-003",
    title: "Data Engineer",
    company: "Atlas Cloud",
    location: "Lyon, France",
    country: "France",
    city: "Lyon",
    sector: "Cloud",
    experience: "Confirmé",
    salary: "€62k – €80k",
    type: "CDI",
    posted: "2026-07-04",
    description: "Construction de pipelines fiables, modèles analytiques et supervision des flux de données critiques.",
    fullDescription: [
      "Vous concevez et maintenez des pipelines de données robustes pour alimenter les tableaux de bord, modèles analytiques et outils internes.",
      "Vous travaillez sur l’ingestion, la transformation, la qualité et la supervision des données critiques de la plateforme cloud.",
      "Vous collaborez avec les équipes produit, data science et infrastructure pour livrer des datasets fiables et faciles à exploiter.",
      "Vous améliorez les performances des traitements, documentez les flux et mettez en place des alertes pour réduire les incidents de production.",
    ],
    skills: ["Python", "SQL", "ETL", "Cloud"],
    source: "Portail public",
    link: "https://example.com/jobs/data-engineer",
  },
  {
    id: "job-004",
    title: "Customer Success Manager",
    company: "CivicHire",
    location: "Toronto, Canada",
    country: "Canada",
    city: "Toronto",
    sector: "Services",
    experience: "Intermédiaire",
    salary: "CAD 78k – CAD 96k",
    type: "Hybride",
    posted: "2026-07-01",
    description: "Accompagnement de comptes publics, renouvellements, formation utilisateurs et mesure de la satisfaction.",
    fullDescription: [
      "Vous accompagnez un portefeuille de comptes publics et institutionnels afin de garantir l’adoption, la satisfaction et le renouvellement des contrats.",
      "Vous organisez les sessions d’onboarding, les formations utilisateurs et les points de suivi réguliers avec les décideurs et équipes opérationnelles.",
      "Vous analysez les usages, identifiez les risques de churn et proposez des plans d’action pour renforcer la valeur perçue du service.",
      "Vous travaillez avec les équipes sales, support et produit pour remonter les besoins clients et améliorer l’expérience globale.",
    ],
    skills: ["Relation client", "CRM", "Onboarding", "Reporting"],
    source: "Organisme public",
    link: "https://example.com/jobs/customer-success-manager",
  },
];

export const pricingTiers = [
  {
    name: "Gratuit",
    price: "0€",
    description: "Idéal pour découvrir la plateforme.",
    features: ["3 recherches par semaine", "1 CV IA", "1 lettre de motivation", "Support standard"],
    featured: false,
  },
  {
    name: "Standard",
    price: "29€",
    description: "Pour des candidatures plus ambitieuses.",
    features: ["Recherches illimitées", "5 CV IA", "15 lettres IA", "Suivi des candidatures"],
    featured: true,
  },
  {
    name: "Premium",
    price: "79€",
    description: "Pour les profils actifs et internationaux.",
    features: ["Documents illimités", "Alertes intelligentes", "Comparaison de postes", "Support prioritaire"],
    featured: false,
  },
  {
    name: "Professionnel",
    price: "149€",
    description: "Pour les équipes et les consultants.",
    features: ["Multi-comptes", "Rapports avancés", "Gestion admin", "Accompagnement équipe"],
    featured: false,
  },
];

export const dashboardModules = [
  { title: "Profil utilisateur", description: "Mettez à jour vos informations et préférences." },
  { title: "Gestion du CV", description: "Créez, modifiez et exportez votre parcours professionnel." },
  { title: "Lettres de motivation", description: "Générez des versions personnalisées depuis vos offres." },
  { title: "Offres enregistrées", description: "Conservez vos opportunités favorites." },
  { title: "Historique des candidatures", description: "Suivez le statut de chaque démarche." },
  { title: "Abonnement", description: "Consultez votre niveau et vos accès." },
];

export const adminStats = [
  { label: "Utilisateurs", value: "3,248" },
  { label: "Nouvelles inscriptions", value: "124" },
  { label: "Abonnements actifs", value: "1,092" },
  { label: "Paiements validés", value: "88" },
  { label: "Revenus", value: "18,420€" },
  { label: "CV générés", value: "2,341" },
  { label: "Lettres créées", value: "1,865" },
  { label: "Candidatures", value: "7,904" },
  { label: "Pays top", value: "France" },
];

export const adminModules = [
  "Utilisateurs",
  "Abonnements",
  "Validation des paiements",
  "Offres d’emploi",
  "Témoignages",
  "FAQ",
  "Pays",
  "Catégories professionnelles",
  "Contenus",
  "Notifications",
  "Support client",
];

export const securityControls = [
  "Authentification Supabase avec session sécurisée",
  "Rôles Administrateur, Modérateur et Utilisateur",
  "Requêtes préparées via Supabase pour limiter les injections SQL",
  "Validation serveur des formulaires et échappement React contre XSS",
  "Stockage privé Supabase Storage pour CV et reçus",
  "Sauvegardes automatiques à configurer côté Supabase",
];

export const jobFilters = {
  countries: ["Tous", "France", "Allemagne", "Canada"],
  cities: ["Toutes", "Paris", "Berlin", "Lyon", "Toronto"],
  sectors: ["Tous", "Technologie", "Logiciel", "Cloud", "Services"],
  contracts: ["Tous", "CDI", "Temps plein", "Hybride"],
  experience: ["Tous", "Intermédiaire", "Confirmé", "Senior"],
};
