import { Router } from 'express';
import { body, param } from 'express-validator';
import Product from '../models/Product.js';

const router = Router();

// Helpers
function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function validationMiddleware(validations) {
  return async (req, res, next) => {
    for (const validation of validations) {
      // run validators sequentially to capture all errors
      // eslint-disable-next-line no-await-in-loop
      await validation.run(req);
    }
    const { validationResult } = await import('express-validator');
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.details = result.array();
      return next(error);
    }
    return next();
  };
}

// Create a new product
router.post(
  '/',
  validationMiddleware([
    body('name').isString().trim().isLength({ min: 2, max: 120 }),
    body('price').isFloat({ min: 0 }),
    body('category')
      .isString()
      .trim()
      .isIn(['electronics', 'fashion', 'grocery', 'home', 'sports', 'other']),
    body('inStock').optional().isBoolean(),
  ]),
  asyncHandler(async (req, res) => {
    const { name, price, category, inStock } = req.body;
    const product = await Product.create({ name, price, category, inStock });
    res.status(201).json(product);
  })
);

// Get all products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  })
);

// Get a single product by ID
router.get(
  '/:id',
  validationMiddleware([param('id').isMongoId()]),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  })
);

// Update a product by ID
router.put(
  '/:id',
  validationMiddleware([
    param('id').isMongoId(),
    body('name').optional().isString().trim().isLength({ min: 2, max: 120 }),
    body('price').optional().isFloat({ min: 0 }),
    body('category')
      .optional()
      .isString()
      .trim()
      .isIn(['electronics', 'fashion', 'grocery', 'home', 'sports', 'other']),
    body('inStock').optional().isBoolean(),
  ]),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    const product = await Product.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  })
);

// Delete a product by ID
router.delete(
  '/:id',
  validationMiddleware([param('id').isMongoId()]),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(204).send();
  })
);

export default router;


