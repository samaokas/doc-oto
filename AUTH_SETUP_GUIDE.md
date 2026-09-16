# 🔐 Configuration des boutons Sign In & Get Started

## 📋 Vue d'ensemble

Les boutons **Sign In** et **Get Started** sont maintenant configurés avec:
- ✅ Authentification GitHub OAuth
- ✅ Authentification Email/Password
- ✅ Gestion d'état utilisateur (AuthContext)
- ✅ Menu utilisateur après connexion
- ✅ Persistance de session (localStorage)
- ✅ Validation des formulaires
- ✅ Animations et transitions fluides

---

## 🚀 Configuration rapide

### 1. Créer une OAuth App GitHub

1. Allez sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Cliquez sur **"OAuth Apps"** → **"New OAuth App"**
3. Remplissez les informations:
   - **Application name**: `Doc-OTO`
   - **Homepage URL**: `http://localhost:5173` (développement)
   - **Authorization callback URL**: `http://localhost:5173/auth/callback`
4. Cliquez sur **"Register application"**
5. Notez votre **Client ID**
6. Générez un **Client Secret** (gardez-le sécurisé!)

### 2. Configurer les variables d'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer .env avec vos valeurs
nano .env  # ou votre éditeur préféré
```

Contenu minimal de `.env`:
```env
VITE_GITHUB_CLIENT_ID=votre_client_id_github_ici
```

### 3. Redémarrer le serveur de développement

```bash
npm run dev
```

---

## 🎯 Fonctionnalités implémentées

### Bouton "Sign In"
- Ouvre le modal d'authentification en mode "connexion"
- Propose GitHub OAuth et Email/Password
- Redirige vers le dashboard après connexion réussie

### Bouton "Get Started"
- Ouvre le modal d'authentification en mode "inscription"
- Permet la création de compte avec Email/Password
- Ou connexion rapide via GitHub

### Après connexion
- Les boutons sont remplacés par un **menu utilisateur**
- Affiche l'avatar et le nom de l'utilisateur
- Dropdown avec:
  - Mes Véhicules
  - Paramètres
  - Abonnement
  - Déconnexion

---

## 🔧 Architecture technique

### Fichiers créés/modifiés

```
src/
├── contexts/
│   └── AuthContext.tsx          # Gestion d'état authentification
├── components/
│   ├── AuthModal.tsx            # Modal de connexion/inscription
│   ├── UserMenu.tsx             # Menu utilisateur connecté
│   └── Navbar.tsx               # Navbar mise à jour
├── App.tsx                      # Intégration AuthProvider
└── vite-env.d.ts                # Types pour variables d'env
```

### AuthContext

```typescript
// Utilisation dans n'importe quel composant
import { useAuth } from './contexts/AuthContext';

function MonComposant() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <p>Veuillez vous connecter</p>;
  }
  
  return <p>Bonjour {user.full_name}!</p>;
}
```

### GitHub OAuth Flow

```typescript
// 1. Redirection vers GitHub
const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
window.location.href = githubAuthUrl;

// 2. GitHub redirige vers votre callback avec un code
// URL: http://localhost:5173/auth/callback?code=abc123

// 3. Échanger le code contre un token (côté backend)
// POST /api/auth/github
// { code: 'abc123' }
// Response: { access_token: '...', user: {...} }
```

---

## 🎨 Personnalisation

### Changer les couleurs du modal

Dans `AuthModal.tsx`:
```typescript
// Bouton GitHub
className="bg-slate-800 hover:bg-slate-700 border-slate-700"

// Bouton principal
className="bg-blue-600 hover:bg-blue-500"

// Messages d'erreur
className="bg-red-500/10 border-red-500/20 text-red-400"
```

### Modifier le menu utilisateur

Dans `UserMenu.tsx`, ajoutez/supprimez des éléments:
```typescript
<button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50">
  <Settings className="w-4 h-4 text-slate-400" />
  <span className="text-sm text-slate-300">Paramètres</span>
</button>
```

---

## 🔒 Sécurité

### Bonnes pratiques implémentées

1. **Validation des formulaires**
   - Email valide requis
   - Mot de passe minimum 6 caractères
   - Nom complet requis pour l'inscription

2. **Protection CSRF**
   - Tokens OAuth state parameter (à implémenter côté backend)

3. **Stockage sécurisé**
   - localStorage pour la session utilisateur
   - HttpOnly cookies recommandés pour les tokens en production

4. **Déconnexion sécurisée**
   - Nettoyage du localStorage
   - Réinitialisation de l'état

### À implémenter côté backend

```typescript
// Exemple avec Express.js
app.post('/api/auth/github', async (req, res) => {
  const { code } = req.body;
  
  // Échanger le code contre un token
  const tokenResponse = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    { headers: { Accept: 'application/json' } }
  );
  
  // Récupérer les infos utilisateur
  const userResponse = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
  });
  
  // Créer/mettre à jour l'utilisateur dans votre DB
  const user = await User.findOrCreate({
    github_id: userResponse.data.id,
    email: userResponse.data.email,
    full_name: userResponse.data.name,
  });
  
  // Générer un JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
  res.json({ token, user });
});
```

---

## 🧪 Tests

### Tester la connexion GitHub

1. Cliquez sur "Sign In" ou "Get Started"
2. Cliquez sur "Continuer avec GitHub"
3. Vous devriez voir un message de succès
4. Le menu utilisateur apparaît dans la navbar

### Tester la connexion Email

1. Cliquez sur "Sign In"
2. Entrez un email et mot de passe (min 6 caractères)
3. Cliquez sur "Se connecter"
4. Vérifiez que le menu utilisateur apparaît

### Tester la déconnexion

1. Cliquez sur l'avatar/nom dans la navbar
2. Cliquez sur "Déconnexion"
3. Les boutons "Sign In" et "Get Started" réapparaissent

---

## 🐛 Dépannage

### "Property 'env' does not exist on type 'ImportMeta'"

**Solution**: Vérifiez que `src/vite-env.d.ts` existe avec le contenu correct.

### GitHub OAuth ne fonctionne pas

**Vérifications**:
- Client ID correct dans `.env`
- Callback URL configurée sur GitHub
- Application redémarrée après modification de `.env`

### Le modal ne s'ouvre pas

**Vérifications**:
- `authModalOpen` state est correctement passé à `AuthModal`
- Pas d'erreurs dans la console
- `AuthProvider` enveloppe bien l'application dans `App.tsx`

### La session ne persiste pas

**Vérifications**:
- localStorage est activé dans le navigateur
- Pas de mode navigation privée
- Clé `doc_oto_user` présente dans localStorage

---

## 📚 Ressources

- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [React Context API](https://react.dev/reference/react/useContext)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## 🎯 Prochaines étapes

1. **Implémenter le backend** pour gérer réellement GitHub OAuth
2. **Créer la page `/auth/callback`** pour gérer le retour de GitHub
3. **Ajouter Google OAuth** si nécessaire
4. **Implémenter la récupération de mot de passe**
5. **Ajouter la vérification d'email**
6. **Créer le dashboard utilisateur** après connexion

---

**Besoin d'aide?** Consultez la documentation ou contactez support@doc-oto.dz
