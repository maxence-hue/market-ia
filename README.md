# Market-IA – Site vitrine Next.js 14

Site vitrine complet pour l'agence Market-IA. L'application utilise Next.js 14 (App Router), TypeScript, Tailwind CSS et du contenu Markdown/MDX pour le blog et les fiches services.

## 🚀 Prise en main

```bash
npm install
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

### Build & démarrage production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## 📁 Structure principale

- `app/` – Pages App Router, composants UI, API contact.
- `content/blog` – Articles du blog au format MDX.
- `content/services` – Fiches services au format Markdown.
- `public/` – Images, favicon, fichiers SEO (robots.txt, sitemap.xml).
- `lib/` – Fonctions de lecture des contenus (MDX & services) et configuration du site.

## ✍️ Contenu

### Ajouter ou modifier un article de blog

1. Créez un fichier `.mdx` dans `content/blog/` avec le frontmatter :
   ```mdx
   ---
   title: "Titre"
   description: "Résumé SEO"
   date: "2024-05-10"
   author: "Nom"
   tags:
     - tag1
     - tag2
   ---
   ```
2. Rédigez votre contenu en MDX (titres `##`, listes, blocs de code).
3. Ajoutez éventuellement des callouts ou du code : ils sont gérés automatiquement.
4. Le fichier est importé et rendu automatiquement dans le blog.

### Ajouter un service

1. Copiez un fichier existant dans `content/services/`.
2. Mettez à jour le frontmatter (`title`, `excerpt`, `hero`, `benefits`, `deliverables`, `process`, `faq`).
3. Complétez le contenu Markdown sous le frontmatter pour détailler l’offre.
4. Enregistrez sous le nom du slug souhaité (ex. `nouveau-service.md`).
5. Ajoutez l’entrée correspondante dans `lib/site.ts` (`navigation.services`) pour l’afficher dans le menu.

## ✉️ API de contact

- Endpoint : `POST /api/contact`
- Payload attendu :
  ```json
  {
    "name": "",
    "email": "",
    "company": "",
    "budget": "",
    "message": "",
    "consent": true
  }
  ```
- Validation côté serveur avec Zod.
- Réponse : `{ "ok": true }` si la requête est valide.
- TODO : connecter ce endpoint à un service d’envoi (Resend, SendGrid, webhook Make/Zapier, etc.).

## 🛠 Déploiement Vercel

Le projet est prêt pour un déploiement immédiat :

1. Poussez sur GitHub.
2. Connectez le dépôt à Vercel (Next.js détecté automatiquement).
3. Aucun fichier `vercel.json` n’est nécessaire.

### 📦 Astuce : pousser le projet sur GitHub sans erreur « fichiers binaires »

Le dépôt embarque uniquement des assets vectoriels (`.svg`) pour éviter le message *« Les fichiers binaires ne sont pas pris en charge »* rencontré sur certains outils d’extraction.

Si vous ajoutez ultérieurement des images bitmap (PNG, JPG, ICO…), pensez à les pousser directement via Git :

```bash
git init                  # si ce n'est pas déjà un repo
git add .                 # inclut vos nouvelles images
git commit -m "feat: initial Market-IA site"
git remote add origin https://github.com/<votre-utilisateur>/market-ia.git
git branch -M main
git push -u origin main
```

Git gère nativement ces fichiers : aucune configuration Git LFS n’est requise.

## ♿ Accessibilité & SEO

- Composants accessibles (menus, formulaire, focus visibles).
- Métadonnées par page + balises OpenGraph/Twitter.
- JSON-LD : Organization, WebSite, BreadcrumbList, BlogPosting.
- Sitemap et robots prêts à l’emploi.

Bon développement !
