
# 🧑‍💻 User API Endpoint

**Base URL**: `http://localhost:3000/api/users/`  
(*Nota: la porta può essere modificata tramite `SERVER_URI` nel file `.env`*)

---

## 📍 Endpoint: GET `/picture`

### 🔐 Autenticazione: Richiesta

### 📝 Descrizione:
Restituisce l'immagine di profilo dell’utente autenticato.

### ✅ Risposta:
- `200 OK`: L’immagine viene restituita come file
- `404 Not Found`: Immagine non trovata
- `500 Internal Server Error`: Errore interno
