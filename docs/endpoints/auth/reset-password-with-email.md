# 📄 API Reset Password via Email

## 📍 Endpoint

- POST `http://localhost:PORT/api/reset-password-with-email`

## 🧩 Body richiesto

```json
{
  "userId": "6818a2c1016f654dc1dccd3c",
  "token": "tokenricevuto",
  "newPassword": "NuovaPassword123"
}
```

## ✅ Risposta (Successo)

```json
{
  "message": "Password aggiornata con successo."
}
```

## ❌ Risposta (Token errato o scaduto)

```json
{
  "error": "UnauthorizedError",
  "message": "Token non valido o scaduto."
}
```