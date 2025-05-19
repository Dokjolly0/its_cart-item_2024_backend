
# 🧑‍💻 User API Endpoint

**Base URL**: `http://localhost:3000/api/users/`  
(*Nota: la porta può essere modificata tramite `SERVER_URI` nel file `.env`*)

---

## 📍 Endpoint: GET `/validate-password/:oldPassword`

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
