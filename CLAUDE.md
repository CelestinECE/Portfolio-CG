# CLAUDE.md — Portfolio de Celestin

Ce fichier définit les règles et conventions du projet. Claude Code doit le lire
et le respecter intégralement à chaque session de travail.

---

## 🗂️ Stack technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript (strict mode activé)
- **Styles** : Tailwind CSS
- **3D** : Three.js via `@react-three/fiber` + `@react-three/drei`
- **Animations** : Framer Motion
- **Déploiement** : Vercel (connecté au repo GitHub `main`)
- **Gestionnaire de paquets** : npm

---

## 📁 Structure des dossiers

```
/
├── app/                    # App Router Next.js (pages, layouts, API routes)
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/                # Routes API server-side uniquement
├── components/             # Composants React réutilisables
│   ├── ui/                 # Composants génériques (boutons, cards, etc.)
│   ├── sections/           # Sections de la page (Hero, About, Projects...)
│   └── three/              # Composants Three.js / R3F isolés
├── lib/                    # Fonctions utilitaires, helpers, constantes
├── public/                 # Assets statiques (images, fonts, modèles 3D)
│   └── fonts/              # Polices typeface.json pour Text3D
├── styles/                 # Styles globaux si nécessaire
├── .env.local              # Variables d'environnement locales (jamais committé)
├── .env.example            # Modèle des variables d'env (committé, sans valeurs)
├── .gitignore
└── CLAUDE.md               # Ce fichier
```

---

## 🎨 Design system

### Palette de couleurs — Crimson Noir
```css
--color-bg:        #0a0a0f   /* Fond principal — noir quasi-pur, légère teinte violacée */
--color-surface:   #12121a   /* Cartes, surfaces secondaires */
--color-surface-2: #1e1020   /* Surfaces profondes, derrière les mesh gradients */
--color-accent:    #ff2d55   /* Rouge électrique — couleur principale d'accentuation */
--color-accent-2:  #c0002a   /* Rouge profond — secondaire, hover, bordures actives */
--color-text:      #f0e8ec   /* Texte principal — blanc légèrement rosé */
--color-muted:     #7a5a62   /* Texte secondaire, labels */
```

> Inspiration : Bloomberg Terminal. Le rouge est réservé aux éléments à forte valeur
> visuelle (CTA, titres de section, bordures actives, accents 3D). Le fond tire
> vers le violet-noir pour éviter le noir pur froid et s'harmoniser avec les mesh gradients.

### Typographie
- **Titres** : Police distinctive (ex: `Space Mono`, `JetBrains Mono`, ou similaire)
- **Corps** : Police lisible et moderne
- Importer depuis Google Fonts via `next/font`

### Mesh Gradients — philosophie de profondeur
L'esthétique repose sur la **profondeur atmosphérique**, pas uniquement sur le néon.
Les mesh gradients servent de liant organique entre la 2D et la 3D :

- **Derrière chaque scène Three.js** : un mesh gradient flou en arrière-plan (jamais de fond noir uni)
- Implémentation : plusieurs `radial-gradient()` superposés + `filter: blur(60-80px)` + faible opacité
- Les couleurs du gradient varient subtilement selon la section — pas le même gradient partout
- Chaque section a sa propre **température de couleur** pour créer un rythme visuel au scroll

```css
/* Exemple de mesh gradient — Hero */
.mesh-gradient-hero {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 15% 40%, #ff2d5530 0%, transparent 65%),
    radial-gradient(ellipse 50% 60% at 85% 60%, #c0002a22 0%, transparent 65%),
    radial-gradient(ellipse 40% 40% at 50% 20%, #3d001522 0%, transparent 60%);
  filter: blur(70px);
  z-index: 0;
}

/* Exemple de mesh gradient — section Projects (plus froid, contraste) */
.mesh-gradient-projects {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 50% at 80% 30%, #ff2d5518 0%, transparent 60%),
    radial-gradient(ellipse 40% 60% at 20% 70%, #1e102033 0%, transparent 60%);
  filter: blur(80px);
  z-index: 0;
}
```

> Règle : chaque section a sa propre intensité de gradient — le Hero est le plus vif,
> les sections suivantes s'assombrissent progressivement pour créer un rythme au scroll.

- La scène Three.js est en `z-index: 1`, le contenu texte en `z-index: 2`
- Résultat visuel : la 3D **émerge de l'atmosphère** au lieu de flotter sur du noir

### Règles visuelles générales
- Fond sombre, jamais de noir pur `#000000` — utiliser `#050a14`
- Le néon (`--color-accent`) est réservé aux éléments interactifs et points focaux — pas un remplissage
- Animations sobres : durée entre 300ms et 800ms, easing naturel
- Pas d'animations en boucle infinie sauf dans les scènes Three.js

---

## 🧊 Règles Three.js / 3D

### Nombre de scènes
- **Pas de limite fixe** — le nombre de scènes dépend de leur légèreté et de leur pertinence visuelle
- Chaque scène doit justifier sa présence : pas de 3D décoratif sans valeur ajoutée
- Privilégier des scènes légères et ciblées plutôt que peu de scènes lourdes

### Performance & chargement
- Les composants R3F doivent être dans `/components/three/`
- **Lazy loading obligatoire** sur tous les composants Three.js :
  ```ts
  const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })
  ```
- Utiliser `Suspense` avec un fallback pour chaque `Canvas`
- Désactiver le rendu hors viewport : `frameloop="demand"` ou via `IntersectionObserver`
- Le texte 3D (ex: `Text3D`) utilise les polices stockées dans `/public/fonts/`

### Contraintes de qualité
- Pas de physics engine (inutile pour un portfolio)
- Pas de maillages > 50k polygones
- Pas d'animations en boucle qui tournent même hors viewport

### Mobile
- Sur mobile, les scènes Three.js sont **désactivées ou remplacées par un fallback statique**
- Utiliser `useMediaQuery` pour conditionner le rendu 3D :
  ```ts
  // Ne pas charger la scène sur écran < 1024px
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return isDesktop ? <HeroScene /> : <HeroFallback />
  ```

---

## 🔐 Sécurité & variables d'environnement

### Règles absolues
- **Jamais** hardcoder une clé API, token ou secret dans le code source
- **Jamais** committer `.env.local` (vérifié par `.gitignore`)
- Toujours créer/mettre à jour `.env.example` quand une nouvelle variable est ajoutée

### Convention de nommage des variables
```bash
# Côté serveur uniquement (API routes, Server Components)
NOM_DU_SERVICE_API_KEY=

# Côté client (exposé au navigateur — uniquement si non sensible)
NEXT_PUBLIC_NOM_VARIABLE=
```

### Fichiers à inclure dans `.gitignore`
```
.env.local
.env.*.local
.env
node_modules/
.next/
out/
```

### Sur Vercel
- Toutes les variables d'env doivent être configurées dans :
  `Vercel Dashboard → Project → Settings → Environment Variables`
- Ne jamais les passer en clair dans les scripts de déploiement

---

## 💻 Conventions de code

### TypeScript
- Mode strict activé dans `tsconfig.json`
- Pas de `any` sauf cas exceptionnel justifié en commentaire
- Typer tous les props de composants avec une `interface` ou `type`
- Préférer les `type` pour les unions, `interface` pour les objets

### Composants React
- Nommage : **PascalCase** (ex: `HeroSection.tsx`, `ProjectCard.tsx`)
- Un composant par fichier
- Props typées explicitement, jamais de props implicites
- Utiliser les Server Components par défaut, `"use client"` seulement si nécessaire

### Fonctions & variables
- Nommage : **camelCase**
- Fonctions utilitaires dans `/lib/`
- Constantes globales (couleurs, textes, données) dans `/lib/constants.ts`

### Commentaires
- **Tous les commentaires en français**
- Commenter les sections complexes (shaders, logique 3D, calculs)
- Pas de commentaires évidents (`// incrémente i` sur un `i++`)

---

## 🔄 Workflow Git & déploiement

### Convention de commits (Conventional Commits)
```
feat:     nouvelle fonctionnalité
fix:      correction de bug
style:    changement visuel / CSS uniquement
refactor: refactoring sans changement de comportement
perf:     amélioration de performance
chore:    maintenance, dépendances, config
docs:     documentation uniquement
```

Exemple : `feat: ajouter scène Three.js dans le hero`

### Branches
- `main` → production (déploiement automatique sur Vercel)
- Développer sur une branche feature si changement important, merger via PR

### Avant chaque commit
- Vérifier qu'aucune clé API n'est présente dans le code
- Vérifier que `.env.local` n'est pas staggé
- S'assurer que le build passe : `npm run build`

---

## 📱 Responsive & compatibilité

### Priorité d'affichage
- **Desktop en priorité** — le design est conçu et optimisé pour grand écran (1280px+)
- Le site doit rester **fonctionnel et lisible sur mobile**, mais sans compromettre l'expérience desktop
- Approche : **desktop-first** (styles de base pour desktop, media queries pour réduire sur mobile)

### Breakpoints Tailwind utilisés
```
sm:   640px   — petits écrans / paysage mobile
md:   768px   — tablette
lg:   1024px  — laptop
xl:   1280px  — desktop (référence principale)
2xl:  1536px  — grand écran
```

### Règles spécifiques
- Les scènes Three.js sur mobile : simplifiées ou remplacées par une image statique si trop lourdes
- La navigation devient un menu hamburger en dessous de `md:`
- Les grilles de projets passent de 3 colonnes (desktop) à 1 colonne (mobile)
- Les effets de glow/néon peuvent être réduits sur mobile pour la performance
- Ne jamais casser le layout desktop pour accommoder le mobile

---

## ⚡ Performance & bonnes pratiques

- Utiliser `next/image` pour toutes les images (optimisation automatique)
- Lazy loading sur les composants lourds (`dynamic(() => import(...), { ssr: false })`)
  notamment pour les composants Three.js
- Pas de `console.log` en production (les supprimer avant commit)
- Lighthouse score cible : > 90 en Performance, Accessibilité, SEO

---

## 📦 Dépendances principales prévues

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "three": "latest",
  "@react-three/fiber": "latest",
  "@react-three/drei": "latest",
  "@splinetool/react-spline": "latest",
  "framer-motion": "latest",
  "resend": "latest"
}
```

> Ajouter toute nouvelle dépendance ici avec une justification courte.

| Dépendance | Rôle |
|---|---|
| `next` | Framework principal — App Router |
| `three` + `@react-three/fiber` + `@react-three/drei` | Scènes 3D (installés, pas encore utilisés) |
| `@splinetool/react-spline` | Scènes 3D Spline (installé, intégration à retenter) |
| `framer-motion` | Animations au scroll, reveals, transitions |
| `resend` | Envoi d'emails depuis le formulaire de contact (server-side) |

---

## 🚧 APIs externes

### Resend — formulaire de contact
- **Usage** : envoi d'email lors de la soumission du formulaire de contact
- **Documentation** : https://resend.com/docs
- **Route API** : `/app/api/contact/route.ts` (server-side uniquement)
- **Variables d'env** :
  ```bash
  RESEND_API_KEY=        # Clé API Resend (jamais côté client)
  CONTACT_EMAIL=         # Adresse email qui reçoit les messages du formulaire
  ```
- **Gratuit** jusqu'à 3 000 emails/mois
- Le formulaire affiche un feedback visuel succès/erreur après soumission
- Ne jamais exposer `RESEND_API_KEY` côté client — appel uniquement depuis la route API

### Ajout d'une nouvelle API (procédure)
1. Ajouter la clé dans `.env.local` et `.env.example` (sans valeur)
2. Documenter l'usage dans cette section
3. Créer la route dans `/app/api/` si appel server-side
4. Préfixer `NEXT_PUBLIC_` uniquement si la variable est non sensible et utilisée côté client

---

## 📄 Structure de la page (single-page scroll)

Le portfolio est une **page unique à scroll vertical**. Ordre des sections :

| # | Section | Composant | Notes |
|---|---|---|---|
| 1 | Hero | `HeroSection.tsx` | Nom, bienvenue, scène Three.js, CTA |
| 2 | Expériences & Projets | `ProjectsSection.tsx` | Cards avec liens GitHub, certifications |
| 3 | Compétences | `SkillsSection.tsx` | Badges groupés par catégorie |
| 4 | À propos | `AboutSection.tsx` | Photo + bio, layout 2 colonnes |
| 5 | Contact | `ContactSection.tsx` | Formulaire → API Resend |

### Contenu Hero
- Nom complet : **Celestin Guilhen**
- Sous-titre : *Étudiant Ingénieur — Spécialisation Finance & Marchés — ECE Lyon*
- Message d'accueil : *Bienvenue sur mon portfolio.*
- Logo CG animé (scale + fade-in) au-dessus du titre
- Mesh gradient Crimson Noir derrière la scène
- Bouton CTA scrollant vers la section Projets

### Contenu Compétences
```
Langages        : Python, C, Java, JavaScript, HTML, CSS, JSON, SQL
Outils & DevOps : Git, GitHub, VS Code
Finance         : Bloomberg Terminal, Excel
```

### Contenu à compléter plus tard
- ~~Texte bio (section À propos)~~ ✅ Complété
- ~~Photo de profil~~ ✅ Complété (`/public/images/Photocv.jpeg`)
- ~~Détails des projets et expériences (section Projets)~~ ✅ 2 projets ajoutés
- Adresse email de réception dans `CONTACT_EMAIL`
- Intégration scène 3D (Spline ou Three.js) — à retenter plus tard

---

## 🔑 Variables d'environnement — référence complète

```bash
# .env.example — copier en .env.local et remplir les valeurs

# Resend — formulaire de contact
RESEND_API_KEY=        # Générer sur https://resend.com/api-keys
CONTACT_EMAIL=         # Ex: celestin.guilhen@email.com
```

---

*Dernière mise à jour : mars 2026*