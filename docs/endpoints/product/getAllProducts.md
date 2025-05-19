# 📦 API Get All Products

## 📍 Endpoint URI: GET `http://localhost:PORT/api/products`

- `PORT` deve essere specificato nel file .env.

### 📝 Descrizione:

Recupera l'elenco completo dei prodotti disponibili.

### ✅ Risposta:

```json
[
  {
    "id": "product_id",
    "name": "Nome Prodotto",
    "price": 19.99,
    "description": "Descrizione",
    "image": "https://url.com",
    ...
  },
  ...
]
```
