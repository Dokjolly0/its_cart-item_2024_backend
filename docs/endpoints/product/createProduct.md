# 📦 API Create Product

## 📍 Endpoint URI: POST `http://localhost:PORT/api/products`

- `PORT` deve essere specificato nel file .env.

### 📝 Descrizione:

Crea un nuovo prodotto. Richiede autorizzazione da parte di un admin.

### 📦 Body Richiesto:

```json
{
  "name": "Nome Prodotto",
  "price": 19.99,
  "description": "Descrizione del prodotto",
  "image": "https://url.com"
}
```

### ✅ Risposta:

```json
{
  "message": "Prodotto creato con successo",
  "product": {
    "id": "product_id",
    "name": "Nome Prodotto",
    ...
  }
}
```
