## Nimbus - Product CRUD with Mongoose

A simple Node.js + Express API implementing Create, Read, Update, and Delete (CRUD) operations for a `Product` collection using Mongoose and MongoDB.

### Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas URI

### Setup
1. Install dependencies:
```bash
npm install
```
2. Configure environment:
   - Copy `.env.example` to `.env`
   - Set `MONGODB_URI` to your MongoDB connection string
   - Optionally change `PORT`

### Scripts
- `npm run dev` - start with nodemon for development
- `npm start` - start the server

### Endpoints
- `GET /health` - health check
- `POST /api/products` - create product
  - Body: `{ name: string, price: number, category: 'electronics'|'fashion'|'grocery'|'home'|'sports'|'other', inStock?: boolean }`
- `GET /api/products` - list all products
- `PUT /api/products/:id` - update product by id (partial body allowed)
- `DELETE /api/products/:id` - delete product by id

### Validation & Errors
- Request validation via `express-validator`
- Schema validation via Mongoose
- Centralized error handling and 404 handling included

### Example cURL
```bash
# Create
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Phone","price":699.99,"category":"electronics"}'

# Read
curl http://localhost:4000/api/products

# Update
curl -X PUT http://localhost:4000/api/products/<id> \
  -H "Content-Type: application/json" \
  -d '{"price":649.99}'

# Delete
curl -X DELETE http://localhost:4000/api/products/<id>
```


