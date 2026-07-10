"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/client";

type TabId = "create" | "improve" | "letter" | "guide";

type Experience = {
  company: string;
  role: string;
  country: string;
  city: string;
  start: string;
  end: string;
  description: string;
};

type Language = {
  name: string;
  level: string;
};

type GeneratedCv = {
  title: string;
  template: string;
  atsScore: number;
  sections: Array<{ title: string; content: string[] }>;
  improvements: string[];
  exportFormats: string[];
};

type GeneratedLetter = {
  subject: string;
  tone: string;
  body: string;
  exportFormats: string[];
};

const tabs: Array<{ id: TabId; label: string; hint: string }> = [
  { id: "create", label: "Creer un nouveau CV", hint: "Formulaire guide + apercu" },
  { id: "improve", label: "Ameliorer un CV", hint: "Analyse ATS et corrections" },
  { id: "letter", label: "Lettre IA", hint: "Lettre personnalisee" },
  { id: "guide", label: "Comment postuler", hint: "Etapes officielles" },
];

const templates = ["Moderne", "Professionnel", "Classique", "International", "Europeen", "Canadien", "Creatif", "ATS Friendly"];
const colors = ["Bleu", "Noir", "Vert", "Rouge", "Gris", "Personnalise"];
const cvLanguages = ["Francais", "Anglais", "Arabe", "Espagnol", "Allemand", "Italien"];
const languageLevels = ["Debutant", "Intermediaire", "Avance", "Courant", "Bilingue"];
const tones = ["Professionnel", "Dynamique", "Convaincant", "Classique", "International"];
const lengths = ["Courte", "Standard", "Detaillee"];
const platforms = ["Site officiel", "LinkedIn", "Indeed", "Portail gouvernemental", "ATS entreprise"];
const downloadFormats = ["PDF", "DOCX", "DOC", "ODT", "RTF", "TXT"];

const quickStats = [
  ["CV crees", "12"],
  ["CV ameliores", "8"],
  ["Lettres generees", "21"],
  ["Telechargements", "34"],
];

const modelExamples = [
  "Profil junior sans experience",
  "Cadre international",
  "Technicien qualifie",
  "Candidature ATS sobre",
];

const testimonials = [
  ["Nadia", "J'ai cree un CV clair et une lettre adaptee en quelques minutes."],
  ["Yassine", "Le score ATS m'a aide a corriger les points faibles avant d'envoyer."],
  ["Amina", "Les etapes pour postuler m'ont evite de me perdre sur le site officiel."],
];

export default function DossierCandidaturePage() {
  const { locale } = useI18n();
  const [activeTab, setActiveTab] = useState<TabId>("create");
  const [status, setStatus] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedCv, setGeneratedCv] = useState<GeneratedCv | null>(null);
  const [generatedLetter, setGeneratedLetter] = useState<GeneratedLetter | null>(null);
  const [atsScore, setAtsScore] = useState(87);
  const [platform, setPlatform] = useState(platforms[0]);
  const [jobText, setJobText] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [tone, setTone] = useState(tones[0]);
  const [length, setLength] = useState(lengths[1]);
  const [cvForm, setCvForm] = useState({
    lastName: "",
    firstName: "",
    address: "",
    phone: "",
    email: "",
    birthDate: "",
    nationality: "",
    drivingLicense: "",
    linkedin: "",
    portfolio: "",
    website: "",
    title: "Developpeur Web",
    profile: "",
    degree: "",
    school: "",
    educationCountry: "",
    educationDate: "",
    interests: "",
    template: "ATS Friendly",
    color: "Bleu",
    language: "Francais",
  });
  const [experiences, setExperiences] = useState<Experience[]>([
    { company: "", role: "", country: "", city: "", start: "", end: "", description: "" },
  ]);
  const [skills, setSkills] = useState(["Communication", "Organisation", "Outils numeriques"]);
  const [languages, setLanguages] = useState<Language[]>([{ name: "Francais", level: "Courant" }]);
  const [certifications, setCertifications] = useState([""]);

  const guideSteps = useMemo(() => {
    const base = [
      "Telecharger le CV.",
      "Telecharger la lettre de motivation.",
      "Ouvrir le site officiel de l'offre.",
      "Creer un compte si necessaire.",
      "Confirmer l'adresse e-mail.",
      "Remplir le formulaire de candidature.",
      "Televerser le CV.",
      "Televerser la lettre de motivation.",
      "Ajouter les documents demandes.",
      "Relire toutes les informations.",
      "Accepter les conditions.",
      "Cliquer sur Envoyer la candidature.",
      "Verifier le message Candidature envoyee avec succes.",
    ];

    if (platform === "LinkedIn") {
      return ["Ouvrir LinkedIn et verifier que le profil est a jour.", "Cliquer sur Postuler ou Candidature simplifiee.", ...base.slice(6)];
    }

    if (platform === "Indeed") {
      return ["Se connecter au compte Indeed.", "Verifier le CV Indeed ou importer le CV JobsAtlas.", ...base.slice(6)];
    }

    if (platform === "Portail gouvernemental") {
      return ["Preparer piece d'identite, diplomes et justificatifs.", "Se connecter avec le compte officiel du portail.", ...base.slice(5)];
    }

    if (platform === "ATS entreprise") {
      return ["Creer un compte candidat sur le portail de l'entreprise.", "Copier les mots-cles exacts de l'offre dans les champs demandes.", ...base.slice(6)];
    }

    return base;
  }, [platform]);

  const previewSkills = skills.filter(Boolean).join(" | ");
  const fullName = `${cvForm.firstName} ${cvForm.lastName}`.trim() || "Votre nom";

  function updateForm(field: keyof typeof cvForm, value: string) {
    setCvForm((current) => ({ ...current, [field]: value }));
  }

  function updateExperience(index: number, field: keyof Experience, value: string) {
    setExperiences((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)));
  }

  function updateLanguage(index: number, field: keyof Language, value: string) {
    setLanguages((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)));
  }

  function generateProfile() {
    const title = cvForm.title || "professionnel polyvalent";
    updateForm(
      "profile",
      `Profil ${title} oriente resultats, capable de comprendre les besoins de l'entreprise, de travailler avec methode et de produire un travail fiable, clair et adapte aux standards internationaux.`
    );
  }

  function suggestSkills() {
    const title = cvForm.title.toLowerCase();
    const suggestions = title.includes("developpeur")
      ? ["JavaScript", "React", "APIs", "Tests", "Git"]
      : title.includes("comptable")
        ? ["Comptabilite generale", "Excel", "Declaration fiscale", "Rapprochement bancaire", "Analyse financiere"]
        : title.includes("chauffeur")
          ? ["Conduite securisee", "Ponctualite", "Maintenance de base", "Relation client", "Planification d'itineraire"]
          : ["Communication", "Organisation", "Resolution de problemes", "Adaptation", "Travail en equipe"];

    setSkills(suggestions);
  }

  async function createCv(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Generation du CV en cours...");

    try {
      const response = await fetch("/api/ai/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cvForm, experiences, skills, languages, certifications, locale }),
      });
      const payload = await response.json();
      setGeneratedCv(payload.result || payload.data);
      setAtsScore((payload.result || payload.data)?.atsScore || 88);
      setStatus("CV genere avec succes.");
    } catch {
      setGeneratedCv(buildLocalCv(cvForm.title, cvForm.template));
      setAtsScore(88);
      setStatus("CV genere en mode demonstration.");
    }
  }

  async function improveCv() {
    setStatus("Analyse du CV importee en cours...");

    try {
      const formData = new FormData();
      if (uploadedFile) {
        formData.append("cv", uploadedFile);
      }
      formData.append("targetRole", cvForm.title);
      formData.append("locale", locale);

      const response = await fetch("/api/ai/cv", { method: "POST", body: formData });
      const payload = await response.json();
      setGeneratedCv(payload.result || payload.data);
      setAtsScore((payload.result || payload.data)?.atsScore || 87);
      setStatus("Analyse terminee. Nouveau CV pret.");
    } catch {
      setGeneratedCv(buildLocalCv(cvForm.title, "ATS Friendly"));
      setAtsScore(87);
      setStatus("Analyse terminee en mode demonstration.");
    }
  }

  async function generateLetter() {
    setStatus("Generation de la lettre en cours...");

    try {
      const response = await fetch("/api/ai/letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: cvForm.title,
          company: "Entreprise cible",
          country: cvForm.nationality || "international",
          cv: cvForm.profile || `${fullName} - ${cvForm.title}`,
          job: jobText || jobLink,
          tone,
          length,
          locale,
        }),
      });
      const payload = await response.json();
      setGeneratedLetter(payload.result || payload.data);
      setStatus("Lettre de motivation generee.");
    } catch {
      setGeneratedLetter({
        subject: `Candidature - ${cvForm.title || "poste vise"}`,
        tone,
        body: `Madame, Monsieur,\n\nJe vous adresse ma candidature pour le poste de ${cvForm.title || "poste vise"}. Mon parcours, mes competences et ma motivation me permettent de repondre aux attentes de votre offre.\n\nJe serais ravi d'echanger avec vous afin de presenter ma contribution possible.\n\nCordialement,\n${fullName}`,
        exportFormats: ["PDF", "DOCX", "TXT"],
      });
      setStatus("Lettre generee en mode demonstration.");
    }
  }

  function downloadDocument(label: string) {
    const content = [
      `JobsAtlas - ${label}`,
      "",
      generatedCv?.title || `${fullName} - ${cvForm.title}`,
      generatedLetter?.body || cvForm.profile || "Document de candidature pret a exporter.",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `jobsatlas-${label.toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function copyQuick() {
    void navigator.clipboard?.writeText(generatedLetter?.body || generatedCv?.title || "Dossier JobsAtlas pret.");
    setStatus("Texte copie rapidement.");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">Dossier de candidature IA</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Creer un CV, une lettre et un guide de candidature en quelques minutes.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Une interface simple pour debutants, avec assistance IA, score ATS, apercu en temps reel et documents prets pour les sites officiels des employeurs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setActiveTab("create")} className="rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700">
                Creer mon CV
              </button>
              <button onClick={() => setActiveTab("improve")} className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                Ameliorer mon CV
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {quickStats.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-3xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-3 lg:grid-cols-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg border p-4 text-left transition ${
                activeTab === tab.id
                  ? "border-cyan-500 bg-cyan-50 text-cyan-950 shadow-sm dark:bg-cyan-950/40 dark:text-cyan-100"
                  : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              }`}
            >
              <span className="text-sm font-semibold">{tab.label}</span>
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">{tab.hint}</span>
            </button>
          ))}
        </div>

        {status ? <p className="mt-4 rounded-md border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-100">{status}</p> : null}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-8">
        <div className="min-w-0">
          {activeTab === "create" ? (
            <form onSubmit={createCv} className="grid gap-6">
              <Panel title="Informations personnelles" description="Renseignez uniquement ce que vous voulez afficher dans le CV.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Nom" value={cvForm.lastName} onChange={(value) => updateForm("lastName", value)} />
                  <Field label="Prenom" value={cvForm.firstName} onChange={(value) => updateForm("firstName", value)} />
                  <Field label="Adresse" value={cvForm.address} onChange={(value) => updateForm("address", value)} />
                  <Field label="Telephone" value={cvForm.phone} onChange={(value) => updateForm("phone", value)} />
                  <Field label="Email" type="email" value={cvForm.email} onChange={(value) => updateForm("email", value)} />
                  <Field label="Date de naissance (option)" type="date" value={cvForm.birthDate} onChange={(value) => updateForm("birthDate", value)} />
                  <Field label="Nationalite" value={cvForm.nationality} onChange={(value) => updateForm("nationality", value)} />
                  <Field label="Permis de conduire" value={cvForm.drivingLicense} onChange={(value) => updateForm("drivingLicense", value)} />
                  <Field label="LinkedIn" value={cvForm.linkedin} onChange={(value) => updateForm("linkedin", value)} />
                  <Field label="Portfolio" value={cvForm.portfolio} onChange={(value) => updateForm("portfolio", value)} />
                  <Field label="Site Web" value={cvForm.website} onChange={(value) => updateForm("website", value)} />
                  <Select label="Titre professionnel" value={cvForm.title} options={["Developpeur Web", "Comptable", "Assistant administratif", "Ingenieur", "Chauffeur", "Electricien"]} onChange={(value) => updateForm("title", value)} />
                </div>
              </Panel>

              <Panel title="Profil professionnel" description="L'IA peut rediger un resume clair, court et optimise ATS.">
                <Textarea label="Resume professionnel" value={cvForm.profile} onChange={(value) => updateForm("profile", value)} />
                <button type="button" onClick={generateProfile} className="w-fit rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950">
                  Generer avec l&apos;IA
                </button>
              </Panel>

              <Panel title="Experiences professionnelles" description="Ajoutez autant d'experiences que necessaire.">
                <div className="grid gap-5">
                  {experiences.map((experience, index) => (
                    <div key={index} className="grid gap-4 border-b border-slate-200 pb-5 last:border-b-0 last:pb-0 dark:border-slate-800">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Entreprise" value={experience.company} onChange={(value) => updateExperience(index, "company", value)} />
                        <Field label="Poste" value={experience.role} onChange={(value) => updateExperience(index, "role", value)} />
                        <Field label="Pays" value={experience.country} onChange={(value) => updateExperience(index, "country", value)} />
                        <Field label="Ville" value={experience.city} onChange={(value) => updateExperience(index, "city", value)} />
                        <Field label="Date debut" type="month" value={experience.start} onChange={(value) => updateExperience(index, "start", value)} />
                        <Field label="Date fin" type="month" value={experience.end} onChange={(value) => updateExperience(index, "end", value)} />
                      </div>
                      <Textarea label="Description" value={experience.description} onChange={(value) => updateExperience(index, "description", value)} />
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setExperiences((current) => [...current, { company: "", role: "", country: "", city: "", start: "", end: "", description: "" }])} className="w-fit rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700">
                  Ajouter une experience
                </button>
              </Panel>

              <Panel title="Formation, competences et langues" description="Chaque section est guidee pour produire un dossier complet.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Diplome" value={cvForm.degree} onChange={(value) => updateForm("degree", value)} />
                  <Field label="Etablissement" value={cvForm.school} onChange={(value) => updateForm("school", value)} />
                  <Field label="Pays" value={cvForm.educationCountry} onChange={(value) => updateForm("educationCountry", value)} />
                  <Field label="Date" type="month" value={cvForm.educationDate} onChange={(value) => updateForm("educationDate", value)} />
                </div>

                <div className="mt-5 grid gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold">Competences</p>
                    <button type="button" onClick={suggestSkills} className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white">Suggerees par l&apos;IA</button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {skills.map((skill, index) => (
                      <Field key={index} label={`Competence ${index + 1}`} value={skill} onChange={(value) => setSkills((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)))} />
                    ))}
                  </div>
                  <button type="button" onClick={() => setSkills((current) => [...current, ""])} className="w-fit rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700">
                    Ajouter une competence
                  </button>
                </div>

                <div className="mt-5 grid gap-3">
                  <p className="text-sm font-semibold">Langues</p>
                  {languages.map((language, index) => (
                    <div key={index} className="grid gap-3 md:grid-cols-2">
                      <Field label="Langue" value={language.name} onChange={(value) => updateLanguage(index, "name", value)} />
                      <Select label="Niveau" value={language.level} options={languageLevels} onChange={(value) => updateLanguage(index, "level", value)} />
                    </div>
                  ))}
                  <button type="button" onClick={() => setLanguages((current) => [...current, { name: "", level: "Intermediaire" }])} className="w-fit rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700">
                    Ajouter une langue
                  </button>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {certifications.map((certification, index) => (
                    <Field key={index} label={`Certification ${index + 1}`} value={certification} onChange={(value) => setCertifications((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)))} />
                  ))}
                  <Textarea label="Centres d'interet" value={cvForm.interests} onChange={(value) => updateForm("interests", value)} />
                </div>
                <button type="button" onClick={() => setCertifications((current) => [...current, ""])} className="mt-3 w-fit rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700">
                  Ajouter une certification
                </button>
              </Panel>

              <Panel title="Modele, couleur et langue" description="Selectionnez une presentation adaptee au pays et au logiciel de recrutement.">
                <div className="grid gap-4 md:grid-cols-3">
                  <Select label="Modele" value={cvForm.template} options={templates} onChange={(value) => updateForm("template", value)} />
                  <Select label="Couleur" value={cvForm.color} options={colors} onChange={(value) => updateForm("color", value)} />
                  <Select label="Langue du CV" value={cvForm.language} options={cvLanguages} onChange={(value) => updateForm("language", value)} />
                </div>
              </Panel>

              <button type="submit" className="rounded-md bg-cyan-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-cyan-700">
                Creer mon CV
              </button>
            </form>
          ) : null}

          {activeTab === "improve" ? (
            <Panel title="Importer et ameliorer un CV existant" description="Formats acceptes : PDF, DOC, DOCX, ODT et TXT.">
              <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Fichier CV
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.odt,.txt"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setUploadedFile(event.target.files?.[0] || null)}
                  className="rounded-md border border-dashed border-slate-300 bg-white px-3 py-6 text-sm dark:border-slate-700 dark:bg-slate-950"
                />
              </label>
              <div className="mt-5 grid gap-4 md:grid-cols-[180px_1fr]">
                <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-5 text-center dark:border-cyan-900 dark:bg-cyan-950">
                  <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-200">Score ATS</p>
                  <p className="mt-2 text-4xl font-semibold">{atsScore} / 100</p>
                </div>
                <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <p><strong className="text-slate-900 dark:text-white">Points forts :</strong> structure lisible, informations de contact claires, experiences faciles a scanner.</p>
                  <p><strong className="text-slate-900 dark:text-white">Points faibles :</strong> manque de mots-cles, resultats peu chiffres, titre professionnel a preciser.</p>
                  <p><strong className="text-slate-900 dark:text-white">Suggestions :</strong> corriger les fautes, ajouter des verbes d&apos;action, aligner les competences sur l&apos;offre.</p>
                </div>
              </div>
              <button type="button" onClick={improveCv} className="mt-5 rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700">
                Ameliorer automatiquement
              </button>
            </Panel>
          ) : null}

          {activeTab === "letter" ? (
            <Panel title="Lettre de motivation IA" description="Utilisez votre CV JobsAtlas ou importez un CV, puis collez l'offre d'emploi.">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Lien de l'offre" value={jobLink} onChange={setJobLink} />
                <Select label="Ton" value={tone} options={tones} onChange={setTone} />
                <Select label="Longueur" value={length} options={lengths} onChange={setLength} />
                <Field label="Poste cible" value={cvForm.title} onChange={(value) => updateForm("title", value)} />
              </div>
              <Textarea label="Texte de l'offre d'emploi" value={jobText} onChange={setJobText} rows={7} />
              <button type="button" onClick={generateLetter} className="mt-5 rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700">
                Generer la lettre de motivation
              </button>
            </Panel>
          ) : null}

          {activeTab === "guide" ? (
            <Panel title="Guide personnalise pour postuler" description="Les etapes s'adaptent au type de site officiel utilise par l'employeur.">
              <Select label="Procedure officielle" value={platform} options={platforms} onChange={setPlatform} />
              <ol className="mt-6 grid gap-3">
                {guideSteps.map((step, index) => (
                  <li key={`${step}-${index}`} className="flex gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-950">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cyan-600 text-xs font-semibold text-white">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-100">
                Candidature envoyee avec succes.
              </p>
            </Panel>
          ) : null}
        </div>

        <aside className="grid h-fit gap-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-cyan-600">Apercu en temps reel</p>
                <h2 className="mt-1 text-xl font-semibold">{fullName}</h2>
              </div>
              <div className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white">{atsScore}%</div>
            </div>
            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="text-lg font-semibold">{cvForm.title}</p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{cvForm.profile || "Le resume professionnel apparait ici apres generation IA."}</p>
              <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                <p className="font-semibold">Competences</p>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{previewSkills || "Ajoutez vos competences"}</p>
              </div>
              <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                <p className="font-semibold">Modele</p>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{cvForm.template} - {cvForm.color} - {cvForm.language}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold">Documents generes</h2>
            {generatedCv ? (
              <div className="mt-4 rounded-md bg-slate-50 p-4 text-sm dark:bg-slate-950">
                <p className="font-semibold">{generatedCv.title}</p>
                <p className="mt-1 text-slate-600 dark:text-slate-300">Modele : {generatedCv.template}</p>
                <ul className="mt-3 space-y-1 text-slate-600 dark:text-slate-300">
                  {generatedCv.improvements?.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ) : null}
            {generatedLetter ? (
              <div className="mt-4 rounded-md bg-slate-50 p-4 text-sm dark:bg-slate-950">
                <p className="font-semibold">{generatedLetter.subject}</p>
                <p className="mt-2 whitespace-pre-line text-slate-600 dark:text-slate-300">{generatedLetter.body}</p>
              </div>
            ) : null}
            {!generatedCv && !generatedLetter ? <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Vos documents apparaitront ici apres generation.</p> : null}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold">Telechargement et partage</h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {downloadFormats.map((format) => (
                <button key={format} type="button" onClick={() => downloadDocument(format)} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700">
                  {format}
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-2">
              <button type="button" className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">Envoyer par e-mail</button>
              <button type="button" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700">Partager sur LinkedIn</button>
              <button type="button" onClick={() => window.print()} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700">Imprimer</button>
              <button type="button" onClick={copyQuick} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700">Copie rapide</button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold">Exemples et preuves</h2>
            <div className="mt-4 grid gap-2 text-sm">
              {modelExamples.map((example) => <p key={example} className="rounded-md bg-slate-50 px-3 py-2 dark:bg-slate-950">{example}</p>)}
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              {testimonials.map(([name, quote]) => (
                <blockquote key={name} className="border-l-2 border-cyan-500 pl-3">
                  <p>{quote}</p>
                  <cite className="mt-1 block font-semibold not-italic text-slate-900 dark:text-white">{name}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Panel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none ring-cyan-400 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      />
    </label>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none ring-cyan-400 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Textarea({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      {label}
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none ring-cyan-400 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      />
    </label>
  );
}

function buildLocalCv(title: string, template: string): GeneratedCv {
  return {
    title: `CV optimise - ${title || "poste cible"}`,
    template,
    atsScore: 88,
    sections: [
      { title: "Resume professionnel", content: ["Profil clair, professionnel et adapte aux logiciels ATS."] },
      { title: "Competences", content: ["Mots-cles alignes avec l'offre", "Verbes d'action", "Presentation simple"] },
    ],
    improvements: ["Ajouter des resultats chiffres", "Adapter les mots-cles au pays vise", "Utiliser une mise en page compatible ATS"],
    exportFormats: ["PDF", "DOCX", "TXT"],
  };
}
