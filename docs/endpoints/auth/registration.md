# 📄 API Registration

## 📍 Endpoint

- POST `http://localhost:PORT/api/register`
- `PORT` deve essere specificato nel file .env.
- Specificare se richiedere la conferma registrazione email tramite `IS_REQUIRED_EMAIL_VERIFICATION` nel file .env valori: true si false no
- Se `IS_REQUIRED_EMAIL_VERIFICATION` è true, dovranno essere specificati i campi per l'invio delle email come email, password ed eventuali codici richiesti

## 🧩 Body richiesto

### ➡️ Minimal Registration Body

```json
{
  "firstName": "User first name",
  "lastName": "User last name",
  "username": "user@email.it",
  "password": "Password123"
}
```

### Campi obbligatori:

- `firstName` (stringa non vuota)
- `lastName` (stringa non vuota)
- `username` (email valida)
- `password` (minimo 8 caratteri)

### ➡️ Full Registration Body (opzionale)

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe@gmail.com",
  "password": "Password123",
  "picture": "https://www.url.com",
  "birthDate": "2000-01-01",
  "gender": "male",
  "preferredLanguage": "it",
  "timeZone": "Europe/Rome",
  "role": "user"
}
```

### Campi aggiuntivi opzionali:

- picture (URL immagine o stringa)
- birthDate (data valida ISO8601)
- gender (stringa)
- preferredLanguage (stringa)
- timeZone (stringa)

## ❌ Dotenv error

- Se viene rilevata la mancanza di un valore nel file `.env` riceverai un errore di tipo `DotenvError`. Vedi esempio

```Error
its_cart-item_2024_backend\src\api\auth\auth.controller.ts:20
if (!JWT_SECRET) throw new DotEnvError();

DotEnvError: Entity not found in dotenv
    at Object.<anonymous> (its_cart-item_2024_backend\src\api\auth\auth.controller.ts:20:24)
    at Module._compile (node:internal/modules/cjs/loader:1734:14)
    at Module.m._compile (its_cart-item_2024_backend\node_modules\ts-node\src\index.ts:1618:23)
    at loadTS (node:internal/modules/cjs/loader:1826:10)
    at Object.require.extensions.<computed> [as .ts] (its_cart-item_2024_backend\node_modules\ts-node\src\index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1469:32)
    at Function._load (node:internal/modules/cjs/loader:1286:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
    at Module.require (node:internal/modules/cjs/loader:1491:12)
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
    <tr>
      <td>Formato data non valido</td>
      <td>birthDate deve essere in formato data ISO8601</td>
      <td>"birthDate must be a valid ISO 8601 date string"</td>
    </tr>
  </tbody>
</table>

### 🛡️ Esempi di Errori Comuni

## ✅ Note Finali

- Se invii un campo opzionale (picture, birthDate, gender, addressInfo, preferredLanguage, timeZone) devi comunque rispettarne il formato corretto.
- In assenza di alcuni campi opzionali, il server li imposta automaticamente a undefined o null.
- In caso di errore di validazione, il server restituisce sempre HTTP status 400.

## 🚀 Esempio Completo Registrazione senza conferma email (Successo)

_Body_:

```json
{
  "firstName": "Mario",
  "lastName": "Rossi",
  "username": "mario@rossi.it",
  "password": "Password123",
  "role": "user"
}
```

_Risposta_:

```json
{
    "newUser": {
        "firstName": "Pippo",
        "lastName": "Pluto",
        "isActive": false,
        "role": "user",
        "createdAt": "2025-05-14T12:49:12.906Z",
        "lastAllowedIp": "0.0.0.0",
        "allowedIps": [
            "0.0.0.0"
        ],
        "confirmationToken": "token",
        "fullName": "Pippo Pluto",
        "id": "id"
    },
    "message": "User register succesfully."
}
```

## 🚀 Esempio Completo Registrazione con conferma email (Successo)

_Body_:

```json
{
  "firstName": "Mario",
  "lastName": "Rossi",
  "username": "mario@rossi.it",
  "password": "Password123",
  "role": "user"
}
```

_Risposta_:

```json
{
    "newUser": {
        "firstName": "Pippo",
        "lastName": "Pluto",
        "isActive": false,
        "role": "user",
        "createdAt": "2025-05-14T12:49:12.906Z",
        "lastAllowedIp": "0.0.0.0",
        "allowedIps": [
            "0.0.0.0"
        ],
        "confirmationToken": "token",
        "fullName": "Pippo Pluto",
        "id": "id"
    },
    "message": "User register succesfully, please check the email and confirm the email verification."
}
```
