# 🛒 API Get All Cart Items

## 📍 Endpoint URI: GET `http://localhost:PORT/api/cart-items/all`

- `PORT` deve essere specificato nel file .env.

### 📝 Descrizione:

Recupera tutti gli articoli del carrello per tutti gli utenti (solo admin).

### ✅ Risposta:

```json
[
  {
    "id": "item_id",
    "userId": "user_id",
    "productId": "product_id",
    "quantity": 1
  },
  ...
]
```
