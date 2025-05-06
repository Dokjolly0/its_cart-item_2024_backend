# 📄 API Login

## 📍 Endpoint

- POST `http://localhost:PORT/api/login`
- `PORT` deve essere specificato nel file .env.

## 🧩 Body richiesto
```json
{
  "username": "user@email.it",
  "password": "Password123"
}
```

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

## 🚀 Esempio Completo Loign (username o password sbagliati)
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
    "error": "LoginError",
    "message": "username user@email.it not found"
}
```

## 🚀 Esempio Completo Loign (Utente non attivato)
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
    "error": "LoginError",
    "message": "Account non attivato. Controlla la tua casella mail per confermare la registrazione."
}
```
