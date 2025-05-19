# 🛡️ Autenticazione OAuth con Google e GitHub (Node.js + Passport.js)

Questa guida ti aiuta a configurare login e registrazione via **Google** e **GitHub OAuth 2.0**, utilizzando **Passport.js** in un'app Node.js/Express con MongoDB.

---

## 📦 Requisiti

* Node.js
* Express.js
* MongoDB + Mongoose
* Passport.js
* Variabili d’ambiente (.env)
* Librerie:

  ```bash
  npm install passport passport-google-oauth20 passport-github2 express-session jsonwebtoken uuid
  ```

---

## 🌍 Variabili `.env` richieste

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback

FRONTEND_URL=http://localhost:3000
JWT_SECRET=supersecretkey
EXPIRED_IN_JWT=1d
```

---

## 🔧 Configurazione Google OAuth

### 1. Crea un progetto Google Cloud

* Vai su [https://console.cloud.google.com/](https://console.cloud.google.com/)
* Crea un nuovo progetto
* Vai su **API & Services > OAuth consent screen**

  * Tipo di utente: **Esterno**
  * Compila nome app, email, ecc.
  * Aggiungi utenti tester (max 100 se l'app non è verificata)

### 2. Crea le credenziali OAuth

* Vai su **API & Services > Credentials**
* Clicca su **Create Credentials > OAuth client ID**
* Tipo: **Web application**
* Inserisci:

  * Authorized redirect URIs:
    `http://localhost:3000/api/auth/google/callback`
* Salva il `Client ID` e `Client Secret` nel `.env`

---

## 🔧 Configurazione GitHub OAuth

### 1. Registra un'app GitHub OAuth

* Vai su [https://github.com/settings/developers](https://github.com/settings/developers)

* Clicca su **"New OAuth App"**

* Inserisci:

  * Application Name: `MyApp`
  * Homepage: `http://localhost:3000`
  * Authorization callback URL: `http://localhost:3000/api/auth/github/callback`

* Salva `Client ID` e `Client Secret` nel `.env`

---

## 🧠 Strategia Passport - Google

**File**: `google-strategy.ts`

```ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../../models/User";
import { UserIdentityModel } from "../../models/UserIdentity";
import { v4 as uuidv4 } from "uuid";
import { requireEnvVars } from "../../utils/dotenv";

const [CLIENT_ID, CLIENT_SECRET, CALLBACK_URL] = requireEnvVars([
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CALLBACK_URL",
]);

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0].value;
      if (!email) return done(null, false);

      let user = await UserModel.findOne({ username: email });
      if (!user) {
        user = await UserModel.create({
          username: email,
          firstName: profile.name?.givenName || "",
          lastName: profile.name?.familyName || "",
          picture: profile.photos?.[0]?.value,
          isActive: true,
          role: "user",
        });

        await UserIdentityModel.create({
          provider: "google",
          user: user._id,
          credentials: {
            username: email,
            hashedPassword: uuidv4(),
          },
        });
      }

      return done(null, user.toObject());
    }
  )
);
```

---

## 🧠 Strategia Passport - GitHub

**File**: `github-strategy.ts`

```ts
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { UserModel } from "../../models/User";
import { UserIdentityModel } from "../../models/UserIdentity";
import { v4 as uuidv4 } from "uuid";
import { requireEnvVars } from "../../utils/dotenv";

const [CLIENT_ID, CLIENT_SECRET, CALLBACK_URL] = requireEnvVars([
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
  "GITHUB_CALLBACK_URL",
]);

passport.use(
  new GitHubStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;

      let user = await UserModel.findOne({ username: email });
      if (!user) {
        user = await UserModel.create({
          username: email,
          firstName: profile.displayName?.split(" ")[0] || profile.username,
          lastName: profile.displayName?.split(" ")[1] || "",
          picture: profile.photos?.[0]?.value,
          isActive: true,
          role: "user",
        });

        await UserIdentityModel.create({
          provider: "github",
          user: user._id,
          credentials: {
            username: email,
            hashedPassword: uuidv4(),
          },
        });
      }

      return done(null, user.toObject());
    }
  )
);
```

---

## 🔌 Rotte Express

```ts
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  handleOAuthSuccess
);

router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/login" }),
  handleOAuthSuccess
);
```

---

## 📟 Funzione comune di callback

```ts
export const handleOAuthSuccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.EXPIRED_IN_JWT!,
    });

    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
  } catch (err) {
    next(err);
  }
};
```

---

## 🔐 Esempio Frontend (React)

```jsx
<a href="http://localhost:3000/api/auth/google">
  <button>Login con Google</button>
</a>

<a href="http://localhost:3000/api/auth/github">
  <button>Login con GitHub</button>
</a>
```

### Componente `LoginSuccess.tsx`

```tsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const LoginSuccess = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/";
    }
  }, [token]);

  return <p>Login in corso...</p>;
};

export default LoginSuccess;
```

---

## 🧪 Debug & Consigli

* ✅ Assicurati che `passport.initialize()` e `passport.session()` siano nel middleware Express.
* ✅ Se usi sessioni temporanee: aggiungi `express-session`.
* ✅ Controlla che `callbackURL` in `.env` combaci esattamente con quello registrato su Google/GitHub.
* ✅ Logga `req.user` nel callback per debugging.

---
