
# 🧑‍💻 User API Endpoint

**Base URL**: `http://localhost:3000/api/users/`  
(*Nota: la porta può essere modificata tramite `SERVER_URI` nel file `.env`*)

---

## 📍 Endpoint: GET `/find/:fullName`

### 🔐 Autenticazione: Richiesta

### 📝 Descrizione:
Cerca un utente tramite il nome completo (firstName + lastName).

### 🔄 Parametri URL:
- `fullName`: Esempio `Mario Rossi`

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
- `404 Not Found` se nessun utente corrisponde
