# 📄 API Registration

## 📍 Endpoint

### POST http://localhost:PORT/api/register

- PORT deve essere specificato nel file .env.

## 🧩 Body richiesto

### ➡️ Minimal Registration Body

```json
{
  "firstName": "",
  "lastName": "",
  "username": "user@email.it",
  "password": "Password123",
  "role": "user"
}
```

## Campi obbligatori:

- firstName (stringa non vuota)
- lastName (stringa non vuota)
- username (email valida)
- password (minimo 8 caratteri)
- role (default: "user")

### ➡️ Full Registration Body (opzionale)

```json
{
  "firstName": "",
  "lastName": "",
  "picture": "",
  "addressInfo": {
    "address": "",
    "city": "",
    "state": "",
    "country": "",
    "zipCode": "",
    "location": {
      "latitude": 0,
      "longitude": 0
    }
  },
  "birthDate": "2000-01-01",
  "gender": "male",
  "preferredLanguage": "it",
  "timeZone": "Europe/Rome",
  "username": "user@email.it",
  "password": "Password123",
  "role": "user"
}
```

## Campi aggiuntivi opzionali:

- picture (URL immagine o stringa)
- birthDate (data valida ISO8601)
- gender (stringa)
- preferredLanguage (stringa)
- timeZone (stringa)
- addressInfo (vedi sotto 👇)

### 🗺️ addressInfo struttura dettagliata

- Se fornito, addressInfo deve contenere:

<table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; text-align: left;">
  <thead style="background-color:rgb(167, 157, 157);">
    <tr>
      <th>Campo</th>
      <th>Tipo</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>address</td>
      <td>string | null</td>
      <td>Indirizzo</td>
    </tr>
    <tr>
      <td>city</td>
      <td>string | null</td>
      <td>Città</td>
    </tr>
    <tr>
      <td>state</td>
      <td>string | null</td>
      <td>Provincia o Stato</td>
    </tr>
    <tr>
      <td>country</td>
      <td>string | null</td>
      <td>Paese</td>
    </tr>
    <tr>
      <td>zipCode</td>
      <td>string | null</td>
      <td>CAP</td>
    </tr>
    <tr>
      <td>location</td>
      <td>object</td>
      <td>Coordinate geografiche</td>
    </tr>
    <tr>
      <td style="padding-left: 30px;">latitude</td>
      <td>number | null</td>
      <td>Latitudine</td>
    </tr>
    <tr>
      <td style="padding-left: 30px;">longitude</td>
      <td>number | null</td>
      <td>Longitudine</td>
    </tr>
  </tbody>
</table>

- Nota: Anche se i valori possono essere `null`, la struttura deve esistere.

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
    <tr>
      <td>addressInfo non valido</td>
      <td>addressInfo deve rispettare la struttura completa</td>
      <td>"L'oggetto addressInfo deve contenere address, city, state, country, zipCode e location (con latitude e longitude)."</td>
    </tr>
    <tr>
      <td>location non valido</td>
      <td>location deve essere un oggetto con latitude e longitude numerici o null</td>
      <td>"location.latitude must be a number"</td>
    </tr>
  </tbody>
</table>

### 🛡️ Esempi di Errori Comuni

### ❌ addressInfo errato (stringa invece di oggetto)

_Richiesta_:

```json
{
  "addressInfo": "sbagliato"
}
```

_Risposta_:

```json
{
  "details": [
    {
      "property": "addressInfo",
      "constraints": {
        "isValidAddressInfo": "L'oggetto addressInfo deve contenere address, city, state, country, zipCode e location (con latitude e longitude)."
      },
      "value": "sbagliato"
    }
  ]
}
```

## ✅ Note Finali

- Se invii un campo opzionale (picture, birthDate, gender, addressInfo, preferredLanguage, timeZone) devi comunque rispettarne il formato corretto.
- In assenza di alcuni campi opzionali, il server li imposta automaticamente a undefined o null.
- In caso di errore di validazione, il server restituisce sempre HTTP status 400.

## 🚀 Esempio Completo Registrazione (Successo)

_Body_:

```json
{
  "firstName": "Mario",
  "lastName": "Rossi",
  "username": "mario@rossi.it",
  "password": "Password123",
  "role": "user",
  "addressInfo": {
    "address": "Via Roma 1",
    "city": "Roma",
    "state": "RM",
    "country": "Italia",
    "zipCode": "00100",
    "location": {
      "latitude": 41.9028,
      "longitude": 12.4964
    }
  }
}
```

_Risposta_:

```json
{
  "firstName": "Mario",
  "lastName": "Rossi",
  "picture": null,
  "addressInfo": {
    "address": "Via Roma 1",
    "city": "Roma",
    "state": "RM",
    "country": "Italia",
    "zipCode": "00100",
    "location": {
      "latitude": 41.9028,
      "longitude": 12.4964
    }
  },
  "role": "user",
  "isActive": false,
  "createdAt": "2025-04-27T13:04:58.183Z",
  "fullName": "Mario Rossi",
  "id": "680e2b7a6219265fc1f87b5b"
}
```
