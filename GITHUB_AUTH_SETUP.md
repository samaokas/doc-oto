# Configuration GitHub OAuth pour Doc-OTO

## 📋 Étapes pour activer la connexion GitHub

### 1. Créer une application GitHub OAuth

1. Allez sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Cliquez sur **"OAuth Apps"** puis **"New OAuth App"**
3. Remplissez les informations :
   - **Application name**: `Doc-OTO`
   - **Homepage URL**: `https://votre-domaine.dz` (ou `http://localhost:5173` pour le dev)
   - **Authorization callback URL**: `https://votre-domaine.dz/auth/github/callback`
4. Cliquez sur **"Register application"**
5. Notez votre **Client ID** et générez un **Client Secret**

### 2. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_GITHUB_CLIENT_ID=votre_client_id_ici
VITE_GITHUB_CLIENT_SECRET=votre_client_secret_ici
VITE_API_URL=https://votre-api.dz
```

### 3. Implémenter le flux OAuth (Backend)

#### Option A: Avec un backend Node.js/Express

```typescript
// server/auth.ts
import express from 'express';
import axios from 'axios';

const router = express.Router();

// Étape 1: Rediriger vers GitHub
router.get('/auth/github', (req, res) => {
  const clientId = process.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = `${process.env.VITE_API_URL}/auth/github/callback`;
  
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`
  );
});

// Étape 2: Gérer le callback
router.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    // Échanger le code contre un token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.VITE_GITHUB_CLIENT_ID,
        client_secret: process.env.VITE_GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } }
    );

    const accessToken = tokenResponse.data.access_token;

    // Récupérer les infos utilisateur
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const userData = userResponse.data;

    // Créer ou mettre à jour l'utilisateur dans votre base de données
    // const user = await User.findOrCreate({ githubId: userData.id, ... });

    // Générer un JWT pour votre app
    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    // Rediriger vers le frontend avec le token
    res.redirect(`https://votre-domaine.dz/auth/success?token=${token}`);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.redirect('https://votre-domaine.dz/auth/error');
  }
});

export default router;
```

#### Option B: Utiliser un service d'authentification

**Supabase** (recommandé pour démarrage rapide) :
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// Dans AuthModal.tsx
const handleGitHubLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: 'https://votre-domaine.dz/auth/callback' }
  });
};
```

**Firebase** :
```typescript
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

const auth = getAuth();
const provider = new GithubAuthProvider();

const handleGitHubLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // user.displayName, user.email, user.photoURL
  } catch (error) {
    console.error('Auth error:', error);
  }
};
```

### 4. Mettre à jour le Frontend

Modifiez `AuthModal.tsx` pour utiliser votre Client ID :

```typescript
const handleGitHubLogin = () => {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = encodeURIComponent(`${window.location.origin}/auth/github/callback`);
  
  // Rediriger vers GitHub
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
};
```

### 5. Gérer le callback côté Frontend

Créez une page `/auth/github/callback` :

```typescript
// pages/AuthCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code) {
      // Envoyer le code à votre backend
      fetch('/api/auth/github/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      .then(res => res.json())
      .then(data => {
        // Stocker le token
        localStorage.setItem('authToken', data.token);
        // Rediriger vers le dashboard
        navigate('/dashboard');
      })
      .catch(err => {
        console.error('Auth error:', err);
        navigate('/auth/error');
      });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-slate-400">Connexion en cours...</p>
      </div>
    </div>
  );
}
```

### 6. Configuration Supabase (Alternative simple)

Si vous utilisez Supabase :

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Dans **Authentication > Providers**, activez **GitHub**
4. Entrez votre **Client ID** et **Client Secret** GitHub
5. Copiez le **Callback URL** fourni par Supabase
6. Ajoutez-le dans votre app GitHub OAuth

```typescript
// .env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=votre_anon_key
```

## 🔒 Sécurité

- **Ne jamais exposer** `VITE_GITHUB_CLIENT_SECRET` côté client
- Utilisez toujours HTTPS en production
- Validez les tokens côté backend
- Implémentez la rotation des secrets
- Ajoutez des rate limits sur les endpoints d'auth

## 📚 Ressources

- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Supabase Auth with GitHub](https://supabase.com/docs/guides/auth/social-login/auth-github)
- [Passport.js GitHub Strategy](http://www.passportjs.org/packages/passport-github2/)

## 🚀 Déploiement

### Vercel
```bash
# Ajouter les variables d'environnement dans le dashboard Vercel
vercel env add VITE_GITHUB_CLIENT_ID
vercel env add GITHUB_CLIENT_SECRET
```

### Netlify
Ajoutez dans **Site settings > Environment variables**

### Docker
```dockerfile
ENV VITE_GITHUB_CLIENT_ID=${VITE_GITHUB_CLIENT_ID}
```

---

**Besoin d'aide ?** Consultez la documentation ou contactez support@doc-oto.dz
