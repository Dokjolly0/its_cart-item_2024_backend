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
  "firstName": "Pippo",
  "lastName": "Pluto",
  "isActive": true,
  "role": "user",
  "createdAt": "2025-05-05T11:50:29.167Z",
  "lastAllowedIp": "0.0.0.0",
  "allowedIps": ["0.0.0.0"],
  "fullName": "Pippo Pluto",
  "id": "6818a6058991e6dcff6b5664"
}
```

## Failed (unouthorized):

```text
Unauthorized
```
