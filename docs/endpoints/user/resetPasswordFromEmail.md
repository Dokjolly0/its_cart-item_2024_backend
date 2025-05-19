
# 🧑‍💻 User API Endpoint

**Base URL**: `http://localhost:3000/api/users/`  
(*Nota: la porta può essere modificata tramite `SERVER_URI` nel file `.env`*)

---

## 📍 Endpoint: POST `/reset-password-from-email?token=...&userId=...`

### 🔐 Autenticazione: ❌ Non richiesta

### 📝 Descrizione:
Reimposta la password fornendo il token di reset.

### 🔄 Query Params:
- `token`: Token ricevuto via email
- `userId`: ID dell’utente

### 📦 Body JSON:
```json
{ "newPassword": "NuovaPassword123" }
```

### ✅ Risposta:
```json
{ "message": "Password reimpostata con successo." }
```

### ❌ Errore:
```json
{ "message": "Token non valido o scaduto." }
```
