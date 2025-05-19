# 🧑‍💻 User API Endpoint

## 📍 Endpoint: POST `http://localhost:PORT/users/reset-password`

- `PORT` deve essere specificato nel file .env.

### 🔐 Autenticazione: Richiesta

### 📝 Descrizione:

Reimposta la password corrente con una nuova.

### 📦 Body JSON:

```json
{
  "newPassword": "NuovaPassword123"
}
```

### ✅ Risposta di Successo:

```json
{ "message": "Password updated" }
```

### ❌ Possibili Errori:

- `401 Unauthorized` se non autenticato
- `404 Not Found` se utente o credenziali non trovate
