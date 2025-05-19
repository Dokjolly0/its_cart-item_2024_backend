# 🛒 API Get Cart Item by ID

## 📍 Endpoint URI: GET `http://localhost:PORT/api/cart-items/:itemId`

- `PORT` deve essere specificato nel file .env.

### 📝 Descrizione:

Recupera un singolo articolo nel carrello tramite il suo ID.

### ✅ Risposta:

```json
{
  "id": "item_id",
  "userId": "user_id",
  "productId": "product_id",
  "quantity": 2
}
```
