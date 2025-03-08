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
router.post('/add', upload.single('image'), async (req, res) => {
  console.log('Session Data:', req.session);
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  const { name, type, price, state, description } = req.body;

  // Parse price to a float
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) {
    return res.status(400).json({ message: 'Price must be a valid number.' });
  }

  // Validate state value (should be either 'متوفر' or 'غير متوفر')
  const validStates = ['متوفر', 'غير متوفر'];
  if (!validStates.includes(state)) {
    return res
      .status(400)
      .json({ message: 'State must be either "متوفر" or "غير متوفر".' });
  }

  // Process type
  let parsedType = type;
  if (typeof type === 'string') {
    parsedType = type.split(',');
  }

  if (!Array.isArray(parsedType) || parsedType.length === 0) {
    return res
      .status(400)
      .json({ message: 'Type must be an array of values.' });
  }

  // Ensure all required fields are present
  if (
    !name ||
    !description ||
    !parsedPrice ||
    !state ||
    !parsedType ||
    !req.file
  ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const image = req.file ? req.file.path : null;

  try {
    // Create and save new product
    const newProduct = new Product({
      name,
      description,
      price: parsedPrice,
      type: parsedType,
      state, // Store the state as 'متوفر' or 'غير متوفر'
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
});

router.get('/best-sellers', async (req, res) => {
  const { type, priceRange } = req.query;

  try {
    // Initialize filter conditions
    let filterConditions = {};

    // Apply 'type' filter if provided
    if (type) {
      filterConditions.type = { $in: type.split(',') }; // type is expected as a comma-separated string
    }

    // Apply 'price' filter based on the priceRange query parameter
    if (priceRange) {
      if (priceRange === 'less-than-100') {
        filterConditions.price = { $lt: 100 }; // Less than $100
      } else if (priceRange === '100-to-300') {
        filterConditions.price = { $gte: 100, $lte: 300 }; // From $100 to $300
      } else if (priceRange === 'more-than-3000') {
        filterConditions.price = { $gt: 3000 }; // More than $3000
      }
      // If no 'priceRange' is specified, it will return all price ranges
    }

    // Fetch the best-sellers based on the filter conditions
    const bestSellers = await Product.find(filterConditions)
      .sort({ soldCount: -1 }) // Sort by soldCount in descending order (most sold first)
      .limit(10); // Limit to the top 10 best-sellers

    return res.status(200).json({
      message: 'Best sellers fetched successfully!',
      products: bestSellers,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Something went wrong while fetching the best sellers.',
      error: err.message,
    });
  }
});

router.get('/featured-products', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true })
      .limit(10)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Featured products fetched successfully!',
      products: featuredProducts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Something went wrong while fetching featured products.',
      error: err.message,
    });
  }
});

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
