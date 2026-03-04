# Mariage Yannick & Lydia - Landing Page

Une landing page élégante et immersive pour le mariage de Yannick & Lydia, avec une animation d'introduction inspirée des invitations de mariage traditionnelles.

## 🎨 Caractéristiques

- **Animation d'introduction immersive** : Enveloppe avec sceau de cire animé
- **Design élégant et romantique** : Inspiré des invitations de mariage traditionnelles
- **Responsive** : Adapté pour mobile et desktop
- **Sections complètes** : Hero, Notre Histoire, Détails du Mariage, RSVP, Galerie

## 🚀 Installation

```bash
npm install
```

## 💻 Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

## 📁 Structure du Projet

```
src/
├── components/
│   ├── EnvelopeIntro/      # Animation d'introduction avec enveloppe
│   ├── WaxSeal/            # Sceau de cire avec animation
│   ├── MainContent/        # Conteneur principal du contenu
│   ├── Hero/               # Section héro avec noms et date
│   ├── OurStory/           # Section "Notre Histoire"
│   ├── WeddingDetails/     # Détails du mariage (date, lieu, programme)
│   ├── RSVP/               # Formulaire RSVP
│   └── Gallery/            # Galerie de photos
├── App.jsx                  # Composant principal
├── main.jsx                 # Point d'entrée
└── index.css               # Styles globaux
```

## 🎭 Animation d'Introduction

L'animation d'introduction comprend :
1. Affichage d'une enveloppe centrée en plein écran
2. Sceau de cire avec initiales "L & Y"
3. Au clic sur le sceau : rotation et effet de craquement
4. Ouverture de l'enveloppe en deux parties (haut et bas)
5. Transition vers le contenu principal

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `src/index.css` via les variables CSS :
- `--color-cream` : Crème
- `--color-ivory` : Ivoire
- `--color-gold` : Or
- `--color-wax-red` : Rouge cire

### Textes
Modifiez les textes directement dans les composants :
- `src/components/Hero/Hero.jsx` : Noms et date
- `src/components/OurStory/OurStory.jsx` : Histoire
- `src/components/WeddingDetails/WeddingDetails.jsx` : Détails du mariage

### Polices
Les polices sont chargées depuis Google Fonts dans `index.html` :
- Playfair Display (serif)
- Cormorant Garamond (élégante)
- Dancing Script (script)

## 📱 Responsive

Le design est entièrement responsive et s'adapte aux écrans :
- Desktop (> 768px)
- Tablette (768px)
- Mobile (< 768px)

## 🛠️ Technologies

- React 18
- Vite
- Framer Motion (animations)
- CSS Modules

## 📝 Notes

- Le formulaire RSVP est actuellement en mode démo (console.log)
- La galerie utilise des placeholders (à remplacer par de vraies images)
- Tous les textes sont des exemples et doivent être personnalisés

