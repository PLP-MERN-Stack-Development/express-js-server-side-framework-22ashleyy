// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config');
const Product = require('./products.js');
require('dotenv').config();

// TODO: Implement custom middleware for:
// - Request logging
const logger = (req, res, next) => {
  console.log(` ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
}
// - Authentication
const authenticate = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if(apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or missing API key'});
  }
  next();
}
// - Error handling
const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

//connect DB
connectDB();

// Middleware setup
app.use(bodyParser.json());
app.use(logger);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products', async(req, res) => {
  try{
    const product = await Product.find();
    res.status(200).json(product);
  }catch(error){
    res.status(500).json({ message: error.message});
  }
});
// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', async(req, res) => {
  try{
    const { id } = req.params;

    const product = await Product.findById(id);
    res.status(200).json(product);
  }catch(error){
    res.status(500).json({ message: error.message})
  }
})
// POST /api/products - Create a new product
app.post('/api/products', authenticate, async (req, res, next) => {
  try{
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  }catch(error){
    res.status(500).json({message: error.message});
  }
})
// PUT /api/products/:id - Update a product
app.put('/api/products/:id', authenticate, async(req, res) => {
  try{
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);
     
    if(!product){
      res.status(404).json({ message: "Product not found"})
    }

    const newProduct = await Product.findById(id);
    res.status(200).json(newProduct);
  }catch(error){
    res.status(500).json({ message: error.message});
  }
})
// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', authenticate, async(req, res) => {
  try{
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if(!product){
      return res.status(404).json({ message: "product not found"});
    }
    res.status(200).json({ message: "Product deleted sucessfully"});
  }catch(error){
    res.status(500).json({ message: error.message })
  }
})


app.use(errorHandler);
// Example route implementation for GET /api/products
// app.get('/api/products', (req, res) => {
//   res.json(products);
// });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 