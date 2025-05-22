# 📄 API Me

## 📍 Endpoint

- GET `http://localhost:PORT/api/users/me`
- `PORT` deve essere specificato nel file .env.
- Authentication: `Bearer token`

## Usi consigliati:

- Ogni volta che devi recuperare i dati di un `User`

## Success (user):

_Risposta_:

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

## Failed (unouthorized):

```text
Unauthorized
```
