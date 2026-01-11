# 💕 Site Web de Mariage - Yannick & Lydia

Site web élégant et romantique pour célébrer le mariage de Yannick & Lydia. Design moderne avec palette pastel, entièrement responsive et facilement personnalisable.

## 📁 Structure des fichiers

```
YannickMariage/
├── index.html      # Structure HTML principale
├── styles.css      # Styles CSS avec design responsive
├── script.js       # Fonctionnalités JavaScript interactives
└── README.md       # Ce fichier
```

## 🚀 Utilisation

1. **Ouvrir le site** : Double-cliquez sur `index.html` ou ouvrez-le dans votre navigateur
2. **Personnaliser** : Suivez les instructions ci-dessous pour modifier les contenus
3. **Héberger** : Téléversez les fichiers sur votre hébergeur web

## 🎨 Personnalisation facile

### 📸 Modifier les photos

#### Photo Hero (Bandeau d'accueil)
Dans `index.html`, ligne ~47, remplacez l'URL de l'image :

```html
<div class="hero-image" style="background-image: url('VOTRE_PHOTO.jpg');"></div>
```

**Options :**
- Utilisez une photo locale : `url('images/hero.jpg')` (créez un dossier `images/`)
- Utilisez une URL en ligne : `url('https://votre-lien.com/photo.jpg')`
- Dimensions recommandées : 1920x1080px minimum

#### Photo dans "Notre Histoire"
Dans `index.html`, ligne ~78, remplacez :

```html
<img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" alt="Yannick & Lydia">
```

Par :
```html
<img src="images/notre-histoire.jpg" alt="Yannick & Lydia">
```

#### Photos de la Galerie
Dans `index.html`, lignes ~155-168, remplacez les URLs des images dans les slides :

```html
<div class="gallery-slide active">
    <img src="images/galerie-1.jpg" alt="Photo 1">
</div>
<div class="gallery-slide">
    <img src="images/galerie-2.jpg" alt="Photo 2">
</div>
<!-- etc. -->
```

**Astuce :** Vous pouvez ajouter ou supprimer des slides en copiant/collant la structure `<div class="gallery-slide">`. N'oubliez pas d'ajouter un point de navigation correspondant dans la section `.gallery-dots`.

### ✏️ Modifier les textes

#### Informations principales
Dans `index.html`, recherchez et modifiez :

**Tagline Hero** (ligne ~42) :
```html
<p class="hero-tagline">Votre phrase personnalisée ici</p>
```

**Date du mariage** (lignes ~44-48) :
```html
<span class="date-day">15</span>
<span class="date-month">Juin</span>
<span class="date-year">2024</span>
```

**Notre Histoire** (lignes ~60-95) :
- Modifiez le texte d'introduction
- Personnalisez les 3 étapes de la timeline (Rencontre, Premiers Pas, Demande)

**Informations pratiques** (lignes ~100-130) :
- Date complète
- Heures de cérémonie, cocktail, dîner
- Adresse de la mairie
- Adresse du lieu de réception

**Programme** (lignes ~135-180) :
- Ajustez les horaires et descriptions de chaque étape

**Hébergement** (lignes ~240-265) :
- Remplacez les informations des hôtels par vos recommandations

**Contact** (lignes ~310-320) :
- Email et téléphone dans le footer

### 🗺️ Ajouter une carte interactive

Dans `index.html`, ligne ~230, remplacez le placeholder par une carte Google Maps :

1. Allez sur [Google Maps](https://www.google.com/maps)
2. Recherchez votre adresse
3. Cliquez sur "Partager" → "Intégrer une carte"
4. Copiez le code iframe
5. Remplacez dans le HTML :

```html
<iframe src="VOTRE_CODE_GOOGLE_MAPS" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
```

### 🎨 Personnaliser les couleurs

Dans `styles.css`, modifiez les variables CSS en haut du fichier (lignes ~3-15) :

```css
:root {
    --color-primary: #F5E6E0;      /* Rose pâle principal */
    --color-secondary: #E8D5C4;    /* Beige */
    --color-accent: #D4A5A5;       /* Rose accent */
    --color-text: #5A5A5A;         /* Texte gris */
    /* etc. */
}
```

**Palettes suggérées :**
- **Romantique pastel** : `#F5E6E0`, `#E8D5C4`, `#D4A5A5`
- **Élégant bleu** : `#E8F0F5`, `#D4E5F0`, `#A5C4D4`
- **Naturel vert** : `#F0F5E8`, `#E5F0D4`, `#C4D4A5`

### 🔤 Changer les polices

Dans `index.html`, ligne ~10, modifiez les Google Fonts :

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
```

Puis dans `styles.css`, modifiez les variables :
```css
--font-heading: 'Playfair Display', serif;
--font-body: 'Montserrat', sans-serif;
```

## 📧 Configuration du formulaire RSVP

Le formulaire RSVP est actuellement configuré pour afficher un message de confirmation. Pour recevoir réellement les réponses :

### Option 1 : Utiliser un service tiers
- **Formspree** : https://formspree.io/
- **Netlify Forms** : Si vous hébergez sur Netlify
- **Google Forms** : Alternative simple

### Option 2 : Backend personnalisé
Modifiez `script.js`, ligne ~120, pour envoyer les données à votre serveur :

```javascript
fetch('votre-endpoint.php', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())
.then(result => {
    // Afficher le message de succès
});
```

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte automatiquement à :
- 📱 **Mobile** (< 480px)
- 📱 **Tablette** (480px - 768px)
- 💻 **Desktop** (> 768px)

## ✨ Fonctionnalités

- ✅ Navigation fluide avec menu mobile
- ✅ Galerie photo avec slider automatique
- ✅ Formulaire RSVP interactif
- ✅ Animations au scroll
- ✅ Design élégant et moderne
- ✅ Palette de couleurs pastel harmonieuse
- ✅ Typographies élégantes (Playfair Display + Montserrat)

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Design moderne avec variables CSS
- **JavaScript** : Interactivité et animations
- **Google Fonts** : Typographies élégantes

## 📝 Notes importantes

1. **Images** : Utilisez des images optimisées (format WebP ou JPG compressé) pour de meilleures performances
2. **Hébergement** : Pour un site en production, utilisez un hébergeur web (Netlify, Vercel, GitHub Pages, etc.)
3. **Domaine** : Vous pouvez connecter un nom de domaine personnalisé
4. **SEO** : Le fichier HTML contient déjà les balises meta de base

## 🎯 Prochaines étapes suggérées

- [ ] Ajouter une liste de mariage
- [ ] Intégrer un compte à rebours
- [ ] Ajouter une section "Témoignages"
- [ ] Créer une page de remerciements post-mariage
- [ ] Ajouter un système de playlist musicale

## 💡 Astuces

- **Testez sur mobile** : Utilisez les outils de développement de votre navigateur (F12)
- **Optimisez les images** : Utilisez des outils comme TinyPNG avant de les uploader
- **Sauvegardez** : Gardez une copie de vos fichiers avant de faire des modifications importantes

## 📞 Support

Pour toute question ou personnalisation supplémentaire, n'hésitez pas à consulter la documentation ou à demander de l'aide.

---

**Fait avec ❤️ pour Yannick & Lydia**

*Bon mariage ! 🎉💍*


