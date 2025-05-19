# 📦 API Get Product By ID

## 📍 Endpoint URI: GET `http://localhost:PORT/api/products/:productId`

- `PORT` deve essere specificato nel file .env.

### 📝 Descrizione:

Restituisce i dettagli di un prodotto specifico.

### ✅ Risposta:

```json
{
  "id": "product_id",
  "name": "Nome Prodotto",
  "price": 19.99,
  "description": "Descrizione",
  "image": "https://url.com",
  ...
}
```
