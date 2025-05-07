# 📄 API Show all users

## 📍 Endpoint

- GET `http://localhost:PORT/api/users/users`
- `PORT` deve essere specificato nel file .env.
- Authentication: `Bearer token`

## Requisiti

- Autenticarsi con un `admin user`, ovvero, l'utente come `role` deve avere `ADMIN_USER_NAME` impostato nel file `.env`

## Usi consigliati:

- Ogni volta che devi recuperare i dati di tutti gli `User`

## Success (users):

_Risposta_:

```json
[
  {
    "firstName": "Pippo",
    "lastName": "Pluto",
    "isActive": true,
    "role": "admin",
    "createdAt": "2025-05-07T19:45:30.819Z",
    "lastAllowedIp": "0.0.0.0",
    "allowedIps": ["0.0.0.0"],
    "fullName": "Pippo Pluto",
    "id": "681bb85a60e63ab280b1c13a"
  }
]
```

## Failed (unouthorized -> token non presente o non valido):

```text
Unauthorized
```

## Failed (unouthorized -> utente non admin):

```json
{
  "error": "UnauthorizedError",
  "message": "User not autorized"
}
```
