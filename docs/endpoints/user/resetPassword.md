
# 🧑‍💻 User API Endpoint

**Base URL**: `http://localhost:3000/api/users/`  
(*Nota: la porta può essere modificata tramite `SERVER_URI` nel file `.env`*)

---

## 📍 Endpoint: POST `/reset-password`

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
