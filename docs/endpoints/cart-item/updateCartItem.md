# 🛒 API Update Cart Item

## 📍 Endpoint URI: PUT `http://localhost:PORT/api/cart-items/:itemId`

- `PORT` deve essere specificato nel file .env.

### 📝 Descrizione:

Aggiorna un articolo del carrello (es. quantità).

### 📦 Body Richiesto:

```json
{
  "quantity": 5
}
```

### ✅ Risposta:

```json
{
  "message": "Articolo aggiornato con successo"
}
```
