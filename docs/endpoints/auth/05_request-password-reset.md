# 📄 API Richiesta Reset Password

## 📍 Endpoint

- POST `http://localhost:PORT/api/request-password-reset`

## 🧩 Body richiesto

```json
{
  "username": "user@email.it"
}
```

## ✅ Risposta (Successo)

```json
{
  "message": "Controlla la tua email per reimpostare la password."
}
```

## ❌ Risposta (Utente non trovato)

```json
{
  "error": "NotFoundError",
  "message": "Utente non trovato."
}
```