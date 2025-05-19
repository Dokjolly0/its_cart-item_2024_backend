# 📦 API Update Product

## 📍 Endpoint URI: PUT `http://localhost:PORT/api/products/:productId`

- `PORT` deve essere specificato nel file .env.

### 📝 Descrizione:

Aggiorna un prodotto esistente (solo admin).

### 📦 Body Richiesto:

```json
{
  "name": "Nuovo Nome",
  "price": 24.99,
  "description": "Descrizione aggiornata",
  "image": "https://newurl.com"
}
```

### ✅ Risposta:

```json
{
  "message": "Prodotto aggiornato con successo"
}
```
