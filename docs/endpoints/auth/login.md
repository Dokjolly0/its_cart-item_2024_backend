# 📄 API Login

### 📍 Endpoint

- POST `http://localhost:PORT/api/login`
- `PORT` deve essere specificato nel file .env.

## 🧩 Body richiesto

### ➡️ Minimal Login Body

```json
{
  "username": "user@email.it",
  "password": "Password123"
}
```

## ❌ Possibili Errori di Validazione

<table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; text-align: left; width: 100%;">
  <thead style="background-color: rgb(167, 157, 157);">
    <tr>
      <th>Tipo di Errore</th>
      <th>Causa</th>
      <th>Esempio di Messaggio di Errore</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Campo mancante o vuoto</td>
      <td>firstName, lastName, role, username, password obbligatori</td>
      <td>"firstName must be a string"</td>
    </tr>
    <tr>
      <td>Email non valida</td>
      <td>username deve essere un'email corretta</td>
      <td>"username must be an email"</td>
    </tr>
    <tr>
      <td>Password troppo corta</td>
      <td>password minimo 8 caratteri</td>
      <td>"password must be longer than or equal to 8 characters"</td>
    </tr>
  </tbody>
</table>

## 🚀 Esempio Completo Loign (Successo)
_Body_:

```json
{
    "username": "user@email.it",
    "password": "Password123"
}
```

_Risposta_:

```json
{
    "user": {
        "firstName": "Pippo",
        "lastName": "Pluto",
        "isActive": true,
        "role": "user",
        "createdAt": "2025-05-05T11:36:33.273Z",
        "lastAllowedIp": "0.0.0.0",
        "allowedIps": [
            "0.0.0.0"
        ],
        "fullName": "Pippo Pluto",
        "id": "6818a2c1016f654dc1dccd3c"
    },
    "token": "TOKEN"
}
```

## 🚀 Esempio Completo Loign (Utente o password sbagliati)
_Body_:

```json
{
    "username": "user5@email.it",
    "password": "Password123"
}
```

_Risposta_:

```json
{
    "error": "LoginError",
    "message": "username user5@email.it not found"
}
```
