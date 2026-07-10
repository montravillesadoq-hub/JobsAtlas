# JobsAtlas

Plateforme Next.js pour recherche d'emploi internationale, génération de CV/lettres par IA, paiements par reçu bancaire et tableaux de bord utilisateur/admin.

## Démarrage

```bash
npm install
npm run dev
```

## Variables d'environnement

Créez un fichier `.env.local` en local et configurez les clés côté serveur uniquement quand elles sont sensibles.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

## Architecture IA

- `src/lib/ai/providers/gemini.ts` : appel Google Gemini pour l'analyse des offres, recommandations, comparaisons, traductions et assistant métier.
- `src/lib/ai/providers/openai.ts` : appel OpenAI Responses API pour CV, lettres et assistant carrière.
- `src/lib/ai/cache.ts` : cache en mémoire avec TTL pour réduire coûts et latence.
- `src/lib/ai/logger.ts` : journalisation des appels IA sans exposer les clés API.
- `src/lib/ai/job-intelligence.ts` : services métier emploi.
- `src/lib/ai/document-intelligence.ts` : services CV, lettres et coaching.

## Routes IA

- `POST /api/ai/jobs` avec `action`: `analyze`, `recommend`, `compare`, `translate`, `chat`.
- `POST /api/ai/cv` pour générer ou améliorer un CV importé.
- `POST /api/ai/letter` pour générer une lettre de motivation.
- `POST /api/ai/assistant` pour l'assistant carrière ou emploi.

Sans clés API, les routes renvoient des réponses de démonstration structurées afin de garder l'interface testable.

## Internationalisation

- Langues disponibles : `/fr`, `/en`, `/ar`.
- Le sélecteur de langue est global dans le header et le menu mobile.
- La langue est conservée dans `localStorage` et dans le cookie `jobsatlas-locale`.
- L'arabe active automatiquement `dir="rtl"` sur le document.
- Les dictionnaires sont dans `src/lib/i18n/dictionaries.ts`.
- Les modèles d'e-mails localisés sont dans `src/lib/i18n/email-templates.ts`.
- Les appels Gemini/OpenAI reçoivent la langue active afin de répondre et générer les documents dans la langue choisie.

## Sécurité

- Les clés Gemini et OpenAI restent côté serveur.
- Les fichiers CV/reçus doivent être stockés dans des buckets Supabase Storage privés en production.
- Les données personnelles transmises aux modèles doivent être limitées au strict nécessaire.
- Les erreurs IA sont journalisées avec messages courts et sans contenu sensible.

## Vérification

```bash
npm run lint
npm run typecheck
npm run build
npm run check
```

## Deploiement GitHub + Vercel

La configuration de deploiement est documentee dans `docs/DEPLOYMENT.md`.

- CI GitHub : `.github/workflows/ci.yml`
- Configuration Vercel : `vercel.json`
- Variables d'exemple : `.env.example`
- Branches recommandees : `main`, `develop`, `feature/*`, `hotfix/*`

Vercel declenche automatiquement un deploiement production a chaque push sur `main` une fois le depot GitHub connecte au projet Vercel.
