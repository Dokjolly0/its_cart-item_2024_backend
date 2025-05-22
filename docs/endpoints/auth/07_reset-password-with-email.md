# 📄 API Reset Password via Email

## 📍 Endpoint

- POST `http://localhost:PORT/api/reset-password-with-email?token=TOKEN&userId=USER_ID`
- Parametri URL:
- `token`: token ricevuto via email
- `userId`: ID dell'utente
- Parametri Body:
- `newPassword`: nuova password da impostare

## 🧩 Body richiesto

```json
{
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
