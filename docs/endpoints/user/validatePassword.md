# 🧑‍💻 User API Endpoint

## 📍 Endpoint: GET `http://localhost:PORT/users/validate-password/:oldPassword`

- `PORT` deve essere specificato nel file .env.

### 🔐 Autenticazione: Richiesta

### 📝 Descrizione:

Valida se la password corrente fornita è corretta.

### 🔄 Parametri:

- `oldPassword`: Password attuale da validare

### ✅ Risposte:

```json
{ "message": "Password is valid" }
```

oppure

```json
{ "message": "Password is invalid" }
```
