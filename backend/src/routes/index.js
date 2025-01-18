const express = require('express');
const router = express.Router();

// Define your API routes here
router.get('/', (req, res) => {
    res.send('Welcome to the OpenAI website API');
});

// Add more routes as needed
// Example: router.get('/example', (req, res) => { ... });

module.exports = router;