//Imports
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors = require('cors');

//Creates an instance of an express application
const app = express();
const PORT = process.env.PORT || 5000;

//Enables the server to parse incoming request bodies in JSON format
app.use(bodyParser.json());
//Allows parsing of URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);
//Security
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});