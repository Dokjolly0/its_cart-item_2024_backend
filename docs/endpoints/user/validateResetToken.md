
# 🧑‍💻 User API Endpoint

**Base URL**: `http://localhost:3000/api/users/`  
(*Nota: la porta può essere modificata tramite `SERVER_URI` nel file `.env`*)

---

## 📍 Endpoint: GET `/validate-reset-token?token=...&userId=...`

### 🔐 Autenticazione: ❌ Non richiesta

### 📝 Descrizione:
Valida un token di reset password ricevuto via email.

### 🔄 Query Params:
- `token`: Token di reset ricevuto
- `userId`: ID dell’utente

### ✅ Risposta:
```json
{ "message": "Token valido." }
```

### ❌ Errore:
```json
{ "message": "Token non valido o scaduto." }
```
