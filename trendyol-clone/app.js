const express = require('express');
const path = require('path');

// Import product data
const products = require('./data/products');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set public directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming request data
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('home', { products }); // Placeholder for now
});
app.get('/search', (req, res) => {
    const searchQuery = req.query.q?.toLowerCase() || ''; // Get the search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
    );
    res.render('search', { products: filteredProducts, searchQuery });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
