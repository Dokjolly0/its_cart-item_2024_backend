# 🧑‍💻 User API Endpoint

## 📍 Endpoint: GET `http://localhost:PORT/users/find/:id`

- `PORT` deve essere specificato nel file .env.

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
