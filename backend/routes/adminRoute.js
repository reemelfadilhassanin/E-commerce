import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js'; // Import the middleware
import Product from '../models/Product.js';
import multer from 'multer';
import moment from 'moment'; // For date manipulation

const router = express.Router();

// The API base path is http://localhost:5000/api/admin
// Ensure that this route is properly defined and matches the path you are trying to access

// Welcome route for the admin dashboard
router.get('/', verifyToken, verifyAdmin, (req, res) => {
  console.log('Session admin welcome:', req.session);
  res.status(200).json({
    message: 'Welcome to the admin dashboard!',
    user: req.user, // This should contain the authenticated user info
  });
});

// Storage configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Directory to store the uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Make the filename unique
  },
});

const upload = multer({ storage }); // Initialize multer with the storage configuration

// Route to add a new product (with file upload support)
router.post(
  '/add',
  upload.single('image'), 
  async (req, res) => {
    console.log('Session Data:', req.session);
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { name, type, price, state, description } = req.body;

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: 'Price must be a valid number.' });
    }

    const parsedState = state === 'instock'; 
    if (typeof parsedState !== 'boolean') {
      return res.status(400).json({ message: 'State must be a valid boolean value.' });
    }

    let parsedType = type;
    if (typeof type === 'string') {
      parsedType = type.split(','); 
    }

    if (!Array.isArray(parsedType) || parsedType.length === 0) {
      return res.status(400).json({ message: 'Type must be an array of values.' });
    }

    if (!name || !description || !parsedPrice || !parsedState || !parsedType || !req.file) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const image = req.file ? req.file.path : null;

    try {
      const newProduct = new Product({
        name,
        description,
        price: parsedPrice,
        type: parsedType,
        state: parsedState,
        image,
      });

      await newProduct.save();

      return res.status(201).json({
        message: 'Product added successfully!',
        product: newProduct,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Something went wrong while adding the product.',
        error: err.message,
      });
    }
  }
);



// Get all products
router.get('/products', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    return res.status(200).json({
      message: 'Products retrieved successfully!',
      products,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Something went wrong while retrieving the products.',
      error: err.message,
    });
  }
});

// Route to get a specific product by ID
router.get('/product/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id); // Fetch product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({
      message: 'Product retrieved successfully!',
      product,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Something went wrong while retrieving the product.',
      error: err.message,
    });
  }
});

// Route to delete a product by ID
router.delete('/product/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    await product.remove();

    return res.status(200).json({
      message: 'Product deleted successfully!',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Something went wrong while deleting the product.',
      error: err.message,
    });
  }
});

// Route to filter products by date and paginate
router.get('/moment', verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Get page and date from query parameters
    const { page = 1, date } = req.query; // Default to page 1 if not specified
    const limit = 10; // Limit products per page
    const skip = (page - 1) * limit; // Calculate skip for pagination

    // If a date is provided, parse and filter products
    let filter = {};
    if (date) {
      // Assuming the date format is 'YYYY-MM-DD', you may want to adjust based on your frontend
      const startDate = moment(date).startOf('day').toDate(); // Set to start of the day (midnight)
      const endDate = moment(date).endOf('day').toDate(); // Set to end of the day (11:59 PM)

      filter = {
        createdAt: {
          $gte: startDate, // products created after the start of the day
          $lte: endDate, // products created before the end of the day
        },
      };
    }

    // Retrieve the products from the database with filtering and pagination
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 1 }); // Sort products by creation date in ascending order

    // Count total products for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit); // Calculate total pages

    return res.status(200).json({
      message: 'Products retrieved successfully!',
      products: products,
      currentPage: page,
      totalPages: totalPages,
      totalProducts: totalProducts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error retrieving products.',
      error: err.message,
    });
  }
});

export default router;
