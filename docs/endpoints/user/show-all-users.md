# 📄 API Show all users

## 📍 Endpoint

- GET `http://localhost:PORT/api/users/users`
- `PORT` deve essere specificato nel file .env.
- Authentication: `Bearer token`

## Requisiti

- Deve essere `autenticato`, ovvero la propieta `role` dentro User deve essere uguale a `ADMIN_USER_NAME` impostato nel file `.env`, di default sarà `admin`

## Usi consigliati:

- Ogni volta che devi recuperare i dati di tutti gli `User`

## Success (users):

_Risposta_:

```json
[
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
