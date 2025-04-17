# 🚀 Relay-PWA

> **Progressive Web App (PWA)** de gestion de stock pour magasin, développée en **Next.js 15** + **Laravel API**.

---

## 📦 Technologies utilisées

- Next.js 15
- React 19
- Tailwind CSS 4
- HeroUI / HeadlessUI
- Framer Motion
- Heroicons
- Browser Image Compression
- Cypress (E2E testing)

---

## ⚙️ Installation locale

```bash
git clone git@github.com:Math49/Relay-PWA.git
cd Relay-PWA
npm install
npm run dev
```

Accès : [http://localhost:3000](http://localhost:3000)

---

## 🌍 Déploiement

- Hébergement : **PlanetHoster** (Node.js 22 via Passenger)
- CI/CD : **GitHub Actions**
- Production : `relay-pwa.mathis-mercier.mds-angers.yt`

---

## 🔒 Authentification

- Système de connexion sécurisé par **token Sanctum**.
- `AuthProvider` pour la gestion globale de la session.

---

## 🧪 Tests End-to-End (E2E)

Tests Cypress configurés.

**Lancer les tests :**

```bash
npm run cypress:open
```
ou
```bash
npx cypress open
```

---

## 📂 Structure du projet

```
src/
├── components/    # Composants globaux
├── context/       # Context React pour l'authentification
├── pages/         # Pages Next.js
├── services/      # Appels API (produits, catégories, messages)
├── styles/        # Fichiers Tailwind personnalisés
├── utils/         # Fonctions utilitaires
```

---

## 💡 Fonctionnalités principales

- 📱 Interface mobile-first optimisée pour PWA
- 🛒 Gestion de stock et de produits
- 🧾 Gestion de messages dynamiques pour le magasin

---

## 👤 Auteur
**Développé par** Mathis Mercier
**Contact :** mthsmercier@gmail.com