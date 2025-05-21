# 📄 API Conferma Email

## 📍 Endpoint

- GET `http://localhost:PORT/api/confirm-email`
- `PORT` deve essere specificato nel file .env.

## 🔐 Parametri Richiesti (Query Params)

- `userId`: ID dell'utente ricevuto via email
- `code`: codice di conferma ricevuto via email

## 🧪 Esempio di richiesta (Successo)

```
GET /api/confirm-email?userId=6818a2c1016f654dc1dccd3c&code=tokenricevuto
```

## ✅ Risposta (Successo)

```json
{
  "message": "Mail confermata, account attivato."
}
```

## ❌ Risposta (Errore - codice errato)

```json
{
  "message": "Codice di conferma non valido."
}
```