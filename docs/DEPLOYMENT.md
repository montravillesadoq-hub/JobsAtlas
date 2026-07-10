# Deploiement JobsAtlas

Ce projet est pret pour un flux GitHub + Vercel.

## Branches

- `main` : production, deployee automatiquement par Vercel.
- `develop` : integration avant production.
- `feature/*` : nouvelles fonctionnalites.
- `hotfix/*` : correctifs urgents.

## Variables d'environnement

Copier `.env.example` vers `.env.local` en local. Sur Vercel, ajouter les memes variables dans Project Settings > Environment Variables.

Les cles secretes ne doivent jamais etre commitees :

- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `STRIPE_SECRET_KEY`
- `VERCEL_TOKEN`

## Verification avant deploiement

```bash
npm run check
```

Cette commande execute :

- ESLint
- TypeScript
- build Next.js

## GitHub Actions

Le workflow `.github/workflows/ci.yml` lance automatiquement les controles sur :

- chaque Pull Request vers `main` ou `develop`
- chaque push vers `main` ou `develop`

## Vercel

Vercel detecte Next.js automatiquement avec :

- Install command : `npm ci`
- Build command : `npm run build`
- Output : gere automatiquement par Next.js

Quand le depot GitHub est connecte a Vercel, chaque push vers `main` declenche un deploiement production.

## Domaine personnalise

Dans Vercel :

1. Ouvrir Project Settings > Domains.
2. Ajouter le domaine.
3. Copier les enregistrements DNS proposes par Vercel.
4. Activer la redirection HTTP vers HTTPS.

Vercel fournit automatiquement le certificat SSL.

## Securite

La configuration inclut :

- HTTPS via Vercel
- en-tetes HTTP de securite
- compression et optimisation images Next.js
- cache long pour assets statiques
- rate limiting sur routes API sensibles
- variables secretes hors du code source
