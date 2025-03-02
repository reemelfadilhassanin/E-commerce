import express from 'express';
import Product from '../models/Product.js';
import multer from 'multer';
import path from 'path';
import { verifyTokenAndAdmin } from './verifyToken.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Increase the limit here to 10MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed!'));
  },
});

const router = express.Router();

// CREATE PRODUCT  http://localhost:5000/api/products
router.post(
  '/',
  verifyTokenAndAdmin,
  upload.single('img'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const newProduct = new Product({
      ...req.body,
      img: req.file ? req.file.path : null, // Ensure img path is correct
    });

    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// UPDATE PRODUCT  http://localhost:5000/api/products/:id
router.put(
  '/:id',
  verifyTokenAndAdmin,
  upload.single('img'),
  async (req, res) => {
    try {
      const updatedData = req.file
        ? { ...req.body, img: req.file.path }
        : req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: updatedData },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// DELETE PRODUCT http://localhost:5000/api/products/:id
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET PRODUCT  http://localhost:5000/api/products/find/:id
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS with Pagination
router.get('/', async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  try {
    let products;

    const skip = (page - 1) * limit;

    if (qNew) {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      })
        .skip(skip)
        .limit(limit);
    } else {
      products = await Product.find().skip(skip).limit(limit);
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
