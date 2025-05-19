# 🧑‍💻 User API Endpoint

## 📍 Endpoint: GET `http://localhost:PORT/users/find/:fullName`

- `PORT` deve essere specificato nel file .env.

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
