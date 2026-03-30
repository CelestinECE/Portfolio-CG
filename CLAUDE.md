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
│   ├── layout.tsx          # Navbar globale incluse ici
│   ├── page.tsx
│   └── api/                # Routes API server-side uniquement
├── components/             # Composants React réutilisables
│   ├── ui/                 # Composants génériques (Navbar, boutons, cards, etc.)
│   ├── sections/           # Sections de la page (Hero, About, Projects...)
│   └── three/              # Composants Three.js / R3F isolés
├── lib/                    # Fonctions utilitaires, helpers, constantes
├── public/                 # Assets statiques (images, fonts, modèles 3D)
│   ├── fonts/              # Polices typeface.json pour Text3D
│   ├── images/             # Photos, logos 2D
│   └── models/             # Fichiers SVG et 3D (logo-cg.svg, icônes compétences...)
├── styles/                 # Styles globaux
├── three-fiber.d.ts        # Déclaration types JSX pour R3F (compat @types/react v19)
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
--color-accent:    #e8102e   /* Rouge franc — couleur principale d'accentuation */
--color-accent-2:  #c0002a   /* Rouge profond — secondaire, hover, bordures actives */
--color-text:      #f0e8ec   /* Texte principal — blanc légèrement rosé */
--color-muted:     #7a5a62   /* Texte secondaire, labels */
```

> Le rouge (`#e8102e`) est un rouge franc, sans teinte rose. Il est réservé aux éléments
> à forte valeur visuelle (CTA, titres de section, bordures actives, accents 3D).

### Typographie
- **Titres** : `Space Mono` (monospace)
- **Corps** : `Inter`
- Importés depuis Google Fonts via `next/font`

### Mesh Gradients — philosophie de profondeur
L'esthétique repose sur la **profondeur atmosphérique**, pas uniquement sur le néon.

- Implémentation : plusieurs `radial-gradient()` superposés + `filter: blur(60-80px)` + faible opacité
- Chaque section a sa propre intensité — le Hero est le plus vif, les suivantes s'assombrissent
- Classes CSS définies dans `styles/globals.css` : `.mesh-gradient-hero`, `.mesh-gradient-projects`

### Glassmorphism — menu de navigation
Le panel du menu hamburger utilise un effet verre liquide :
```css
background: rgba(18, 18, 26, 0.45);
backdrop-filter: blur(24px) saturate(180%);
border-left: 1px solid rgba(255,255,255,0.08);
box-shadow: -8px 0 40px rgba(0,0,0,0.4), inset 1px 0 0 rgba(255,255,255,0.05);
```

### Règles visuelles générales
- Fond sombre, jamais de noir pur `#000000`
- Le rouge accent est réservé aux éléments interactifs et points focaux
- Animations sobres : durée entre 300ms et 800ms, easing naturel
- Pas d'animations en boucle infinie sauf dans les scènes Three.js
- Effets hover sur les badges compétences : `scale(1.12)` + `rotateY(12deg)` instantané (`tween 80ms`)
- Effets hover sur la photo de profil : `scale(1.05)` + `y(-8px)` + halo rouge (spring fluide)

---

## 🧊 Règles Three.js / 3D

### Logo CG 3D — Hero
- Fichier SVG source : `/public/models/logo-cg.svg`
- Composant : `/components/three/LogoCG3D.tsx`
- Chargé via `SVGLoader` + `ExtrudeGeometry` + matériaux `meshStandardMaterial`
- Effet tilt : suit la position de la souris via `useThree().pointer` + lerp dans `useFrame`
- `// @ts-nocheck` sur ce fichier (incompatibilité @types/react v19 / R3F v8 JSX global)
- Sur mobile (`< 1024px`) : remplacé par le logo 2D PNG (`/public/images/Logo_CG.png`)
- Chargement : `dynamic(() => import(...), { ssr: false })` + `useState<boolean | null>(null)` pour éviter le flash 2D→3D

### Performance & chargement
- Les composants R3F doivent être dans `/components/three/`
- **Lazy loading obligatoire** sur tous les composants Three.js :
  ```ts
  const MonComposant = dynamic(() => import('@/components/three/MonComposant'), { ssr: false })
  ```
- Utiliser `Suspense` avec un fallback pour chaque `Canvas`
- `isDesktop` initialisé à `null` (pas `false`) pour éviter le flash de contenu mobile

### Contraintes de qualité
- Pas de physics engine
- Pas de maillages > 50k polygones
- Pas d'animations en boucle qui tournent hors viewport

### Note TypeScript R3F
Fichier `three-fiber.d.ts` à la racine pour déclarer les types JSX Three.js :
```ts
import { ThreeElements } from '@react-three/fiber'
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
```
Les composants R3F portent `// @ts-nocheck` si les erreurs persistent (compat @types/react v19).

---

## 🔐 Sécurité & variables d'environnement

### Règles absolues
- **Jamais** hardcoder une clé API, token ou secret dans le code source
- **Jamais** committer `.env.local` (vérifié par `.gitignore`)
- Toujours créer/mettre à jour `.env.example` quand une nouvelle variable est ajoutée

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

---

## 💻 Conventions de code

### TypeScript
- Mode strict activé dans `tsconfig.json`
- Pas de `any` sauf cas exceptionnel justifié en commentaire
- Typer tous les props de composants avec une `interface` ou `type`

### Composants React
- Nommage : **PascalCase** (ex: `HeroSection.tsx`, `ProjectCard.tsx`)
- Un composant par fichier
- Utiliser les Server Components par défaut, `"use client"` seulement si nécessaire

### Commentaires
- **Tous les commentaires en français**
- Commenter les sections complexes (shaders, logique 3D, calculs)

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

### Avant chaque commit
- Vérifier qu'aucune clé API n'est présente dans le code
- Vérifier que `.env.local` n'est pas staggé
- S'assurer que le build passe : `npm run build`

---

## 📱 Responsive & compatibilité

- **Desktop en priorité** — design optimisé pour 1280px+
- Approche **desktop-first**
- Scènes Three.js désactivées sous `1024px` (remplacées par fallback statique)
- Navigation hamburger disponible sur tous les écrans (fixe en haut à droite)

---

## ⚡ Performance & bonnes pratiques

- Utiliser `next/image` pour toutes les images
- Lazy loading sur les composants lourds
- Pas de `console.log` en production
- Lighthouse score cible : > 90 en Performance, Accessibilité, SEO

---

## 📦 Dépendances installées

| Dépendance | Rôle |
|---|---|
| `next` | Framework principal — App Router |
| `three` + `@react-three/fiber` + `@react-three/drei` | Scènes 3D |
| `@splinetool/react-spline` | Viewer Spline (disponible, non utilisé actuellement) |
| `framer-motion` | Animations au scroll, reveals, transitions, hover |
| `resend` | Envoi d'emails depuis le formulaire de contact (server-side) |

---

## 🚧 APIs externes

### Resend — formulaire de contact
- **Route API** : `/app/api/contact/route.ts`
- **Expéditeur** : `onboarding@resend.dev` (sans domaine custom vérifié)
- **Destinataire** : adresse du compte Resend (limitation plan gratuit sans domaine)
- **Variables d'env** :
  ```bash
  RESEND_API_KEY=        # Clé API Resend
  CONTACT_EMAIL=         # Adresse de réception (doit être l'adresse du compte Resend)
  ```

---

## 📄 Structure de la page (single-page scroll)

| # | Section | Composant | Notes |
|---|---|---|---|
| — | Navigation | `Navbar.tsx` | Fixe, hamburger → panel glass latéral |
| 1 | Hero | `HeroSection.tsx` | Logo 3D R3F, nom, CTA |
| 2 | Intro | `IntroSection.tsx` | Court texte d'accroche "Ce qui me définit" |
| 3 | Expériences & Projets | `ProjectsSection.tsx` | 3 projets avec liens GitHub |
| 4 | Compétences | `SkillsSection.tsx` | Badges avec icônes SVG + hover 3D CSS |
| 5 | À propos | `AboutSection.tsx` | Photo + bio, layout 2 colonnes |
| 6 | Contact | `ContactSection.tsx` | Formulaire → API Resend |

### Projets actuels
1. **Réseaux Trophiques** — C, JSON, Git — [gitfront.io](https://gitfront.io/r/Celestingn/75eUesPgPATd/projet-reseaux-trophiques-equipe-3b/)
2. **Agence de Location de Voitures** — Java 21, POO, UML — [gitfront.io](https://gitfront.io/r/Celestingn/U66iViRUDCrD/Projet-location/)
3. **Outil d'Analyse Financière** — Python, VBA, Excel — En cours (pas de lien)

### Compétences
```
Langages        : Python, C, Java, HTML, CSS, JSON, SQL
Outils & DevOps : Git, GitHub, VS Code
Finance         : Bloomberg, Excel
```

### Assets disponibles
- `/public/images/Logo_CG.png` — Logo 2D (fallback mobile)
- `/public/images/Photocv.jpeg` — Photo de profil
- `/public/images/TDG.png` — Image projet Réseaux Trophiques
- `/public/images/Java_Projet.png` — Image projet Java
- `/public/models/logo-cg.svg` — Logo SVG vectorisé pour extrusion 3D
- `/public/models/*.svg` — Icônes SVG des compétences (python, c, java, html, css, json, sql, git, github, vs-code, bloomberg, excel)

---

## 🔑 Variables d'environnement

```bash
# .env.example — copier en .env.local et remplir les valeurs
RESEND_API_KEY=        # Générer sur https://resend.com/api-keys
CONTACT_EMAIL=         # Adresse du compte Resend
```

---

*Dernière mise à jour : mars 2026*
