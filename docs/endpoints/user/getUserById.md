
# 🧑‍💻 User API Endpoint

**Base URL**: `http://localhost:3000/api/users/`  
(*Nota: la porta può essere modificata tramite `SERVER_URI` nel file `.env`*)

---

## 📍 Endpoint: GET `/find/:id`

### 🔐 Autenticazione: Richiesta (Bearer Token)

### 📝 Descrizione:
Recupera un utente specifico tramite il suo ID.

### 🔄 Parametri URL:
- `id`: ID dell'utente da cercare

### ✅ Risposta di Successo:
```json
{
  "id": "user_id",
  "firstName": "Mario",
  "lastName": "Rossi",
  ...
}
```

### ❌ Possibili Errori:
- `401 Unauthorized` se non autenticato
- `404 Not Found` se l'utente non esiste
