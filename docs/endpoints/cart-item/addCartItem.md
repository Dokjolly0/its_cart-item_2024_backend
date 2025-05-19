# 🛒 API Add Cart Item

## 📍 Endpoint URI: POST `http://localhost:PORT/api/cart-items`

- `PORT` deve essere specificato nel file .env.

### 📝 Descrizione:

Aggiunge un articolo al carrello.

### 📦 Body Richiesto:

```json
{
  "productId": "product_id",
  "quantity": 1
}
```

### ✅ Risposta:

```json
{
  "message": "Articolo aggiunto al carrello",
  "item": {
    "productId": "product_id",
    "quantity": 1,
    "userId": "user_id"
  }
}
```
