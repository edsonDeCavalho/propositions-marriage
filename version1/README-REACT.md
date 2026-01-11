# 💕 Site Web de Mariage React - Yannick & Lydia

Application React moderne pour célébrer le mariage de Yannick & Lydia. Design élégant avec palette pastel, entièrement responsive et construit avec React + Vite.

## 🚀 Installation

1. **Installer les dépendances** :
```bash
npm install
```

2. **Lancer le serveur de développement** :
```bash
npm run dev
```

3. **Construire pour la production** :
```bash
npm run build
```

4. **Prévisualiser la version de production** :
```bash
npm run preview
```

## 📁 Structure du projet

```
YannickMariage/
├── src/
│   ├── components/          # Composants React
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Story.jsx
│   │   ├── Info.jsx
│   │   ├── Program.jsx
│   │   ├── Gallery.jsx
│   │   ├── RSVP.jsx
│   │   ├── Accommodation.jsx
│   │   ├── DressCode.jsx
│   │   └── Footer.jsx
│   ├── App.jsx              # Composant principal
│   ├── main.jsx             # Point d'entrée
│   └── styles.css           # Styles CSS globaux
├── index.html               # Template HTML
├── package.json             # Dépendances
├── vite.config.js           # Configuration Vite
└── README-REACT.md          # Ce fichier
```

## 🎨 Personnalisation

### Modifier les photos

Les images sont définies directement dans les composants. Par exemple, dans `Hero.jsx` :

```jsx
<div 
  className="hero-image" 
  style={{ backgroundImage: "url('VOTRE_PHOTO.jpg')" }}
></div>
```

### Modifier les textes

Tous les textes sont dans les composants React. Ouvrez le fichier correspondant et modifiez le contenu :

- **Hero** : `src/components/Hero.jsx`
- **Notre Histoire** : `src/components/Story.jsx`
- **Infos Pratiques** : `src/components/Info.jsx`
- **Programme** : `src/components/Program.jsx`
- **RSVP** : `src/components/RSVP.jsx`
- etc.

### Modifier les couleurs

Les couleurs sont définies dans `src/styles.css` via les variables CSS :

```css
:root {
    --color-primary: #F5E6E0;
    --color-secondary: #E8D5C4;
    --color-accent: #D4A5A5;
    /* etc. */
}
```

## ✨ Fonctionnalités React

- ✅ **Hooks React** : useState, useEffect pour la gestion d'état
- ✅ **Navigation fluide** : Smooth scroll avec gestion d'événements React
- ✅ **Galerie interactive** : Slider avec état React et auto-play
- ✅ **Formulaire RSVP** : Gestion d'état avec validation
- ✅ **Animations au scroll** : Intersection Observer avec useEffect
- ✅ **Menu mobile** : État local avec useState
- ✅ **Responsive** : Design adaptatif pour tous les écrans

## 🛠️ Technologies

- **React 18** : Bibliothèque UI
- **Vite** : Build tool moderne et rapide
- **CSS3** : Styles avec variables CSS
- **Google Fonts** : Typographies élégantes

## 📦 Déploiement

### Netlify / Vercel

1. Connectez votre repository Git
2. Configurez la commande de build : `npm run build`
3. Le dossier de sortie est : `dist`

### GitHub Pages

1. Installez `gh-pages` : `npm install --save-dev gh-pages`
2. Ajoutez dans `package.json` :
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Déployez : `npm run deploy`

## 🔧 Configuration du formulaire RSVP

Le formulaire RSVP utilise actuellement un état local. Pour recevoir réellement les données :

1. **Option 1 - Service tiers** : Utilisez Formspree, Netlify Forms, etc.
2. **Option 2 - Backend** : Modifiez `src/components/RSVP.jsx` pour envoyer les données à votre API

Exemple avec fetch :
```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const response = await fetch('votre-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    // Gérer la réponse
  } catch (error) {
    console.error('Erreur:', error)
  }
}
```

## 📝 Notes

- Les images utilisent des URLs Unsplash par défaut - remplacez-les par vos propres photos
- Le formulaire RSVP affiche un message de succès mais n'envoie pas réellement les données
- Tous les composants sont modulaires et facilement personnalisables

## 🎯 Prochaines étapes

- [ ] Ajouter React Router pour une navigation multi-pages
- [ ] Intégrer une API pour le formulaire RSVP
- [ ] Ajouter un système de gestion d'images
- [ ] Optimiser les images avec lazy loading
- [ ] Ajouter des tests unitaires

---

**Fait avec ❤️ pour Yannick & Lydia**

*Bon mariage ! 🎉💍*

