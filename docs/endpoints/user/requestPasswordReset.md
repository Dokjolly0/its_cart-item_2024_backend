
# 🧑‍💻 User API Endpoint

**Base URL**: `http://localhost:3000/api/users/`  
(*Nota: la porta può essere modificata tramite `SERVER_URI` nel file `.env`*)

---

## 📍 Endpoint: POST `/request-password-reset`

### 🔐 Autenticazione: ❌ Non richiesta

### 📝 Descrizione:
Invia una email all’utente per reimpostare la password.

### 📦 Body JSON:
```json
{
  "username": "user@email.com"
}
```

### ✅ Risposta:
```json
{ "message": "Controlla la tua email per le istruzioni di reset della password." }
```

### ❌ Possibili Errori:
- `404 Not Found` se l’utente non esiste
