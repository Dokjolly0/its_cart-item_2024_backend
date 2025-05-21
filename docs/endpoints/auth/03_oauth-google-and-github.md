# 🔐 OAuth Authentication

## 📍 Endpoints OAuth

### 🌐 GitHub OAuth

- **URL**: `http://localhost:PORT/api/auth/github`
- L'attributo `PORT` è configurabile nel file `.env`.
- Il client sarà reindirizzato a GitHub per l'autenticazione.
- Al termine, GitHub reindirizzerà al callback configurato (`GITHUB_CALLBACK_URL`) con un token.

### 🌐 Google OAuth

- **URL**: `http://localhost:PORT/api/auth/google`
- L'attributo `PORT` è configurabile nel file `.env`.
- Il client sarà reindirizzato a Google per l'autenticazione.
- Al termine, Google reindirizzerà al callback configurato (`GOOGLE_CALLBACK_URL`) con un token.

## ⚙️ Configurazione .env richiesta

Assicurati di avere i seguenti valori nel file `.env`:

```env
# GOOGLE
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:PORT/api/auth/google/callback

# GITHUB
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GITHUB_CALLBACK_URL=http://localhost:PORT/api/auth/github/callback

# GENERALI
FRONTEND_URL=http://localhost:5000
JWT_SECRET=una_stringa_sicura
EXPIRED_IN_JWT=7d
```

⚠️ In mancanza di uno di questi, sarà sollevato un errore `DotEnvError`.

## 🔄 Flusso OAuth

1. L'utente clicca su "Accedi con Google" o "Accedi con GitHub" nel frontend.
2. Il backend reindirizza l’utente al provider (Google o GitHub).
3. Dopo l'autenticazione, l'utente viene reindirizzato a `FRONTEND_URL/login-success?token=<JWT_TOKEN>`.
4. Il token JWT può essere usato per autenticare le successive richieste API.

## 🧩 Utente Creato / Recuperato

Se l’utente esiste già (`username` corrispondente all’email), viene utilizzato. Altrimenti, viene creato un nuovo utente con i seguenti dati:

- `firstName`: preso dal nome del profilo
- `lastName`: preso dal cognome del profilo
- `username`: email
- `picture`: URL della foto del profilo
- `role`: `"user"`
- `isActive`: -> Dipende da `IS_REQUIRED_EMAIL_VERIFICATION` inpostato nel file `.env`
- `lastAllowedIplastAllowedIp`: IP del client che effettua l’accesso
- `allowedIps`: array contenente l’IP del client che effettua l’accesso
  Un record corrispondente viene creato anche in `UserIdentityModel` con:

- `provider`: `"google"` o `"github"`
- `credentials.username`: email dell’utente
- `credentials.hashedPassword`: UUID placeholder (non utilizzato)

## ✅ Esempio Flusso Completo (Google)

1. Chiamata: `GET http://localhost:3000/api/auth/google`
2. Redirect automatico a Google
3. Dopo l'autenticazione, redirect a:
   ```
   http://localhost:5173/login-success?token=<JWT>
   ```

## ❌ Errori Comuni

| Tipo di Errore              | Causa                                  | Azione                             |
| --------------------------- | -------------------------------------- | ---------------------------------- |
| `DotEnvError`               | Manca una variabile nel file `.env`    | Verifica la configurazione `.env`  |
| `401 Unauthorized`          | L'utente rifiuta l'accesso al provider | L’utente deve concedere i permessi |
| `500 Internal Server Error` | Problema nel salvataggio utente        | Verifica DB e logging              |

## 🛡️ Sicurezza

- Il token JWT è firmato con `JWT_SECRET` e ha scadenza impostata da `EXPIRED_IN_JWT`.
- IP del client viene registrato in `allowedIps` e `lastAllowedIp`.

## 📁 Esempio risposta al frontend

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "redirect": "http://localhost:5173/login-success?token=..."
}
```

## 📝 Note Finali

- Il token può essere decodificato per ottenere l’`id` utente.
- L’autenticazione OAuth semplifica l’onboarding utente e riduce la frizione nella registrazione.
- Le email ottenute da Google/GitHub sono considerate verificate.
