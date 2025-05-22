# 📄 API Validazione Token Reset Password

## 📍 Endpoint

- GET `http://localhost:PORT/api/validate-reset-token`

## 🔐 Parametri Richiesti (Query Params)

- `userId`: ID dell'utente
- `token`: token ricevuto via email

## ✅ Risposta (Token Valido)

```json
{
  "message": "Token valido."
}
```

## ❌ Risposta (Token non valido o scaduto)

```json
{
  "message": "Token non valido o scaduto."
}
```
