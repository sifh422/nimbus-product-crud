import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectToDatabase } from './utils/db.js';
import productsRouter from './routes/products.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database
connectToDatabase().catch((err) => {
  console.error('Failed initial DB connection:', err);
  process.exit(1);
});

// Routes
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
app.use('/api/products', productsRouter);

// 404 handler for unmatched routes
app.use((req, res, _next) => {
  res.status(404).json({ message: 'Not Found', path: req.originalUrl });
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
    details: err.details || undefined,
  });
});

export default app;


