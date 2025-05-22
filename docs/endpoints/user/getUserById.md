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
  "firstName": "Alex",
  "lastName": "Violatto",
  "role": "user",
  "createdAt": "2025-05-22T10:49:31.263Z",
  "lastAllowedIp": "0.0.0.0",
  "allowedIps": ["0.0.0.0"],
  "lastLogin": "2025-05-22T12:58:40.101Z",
  "lastUpdateAt": "2025-05-22T12:58:40.103Z",
  "fullName": "Alex Violatto",
  "id": "ID_UTENTE"
}
```

### ❌ Possibili Errori:

- `401 Unauthorized` se non autenticato
- `404 Not Found` se l'utente non esiste
