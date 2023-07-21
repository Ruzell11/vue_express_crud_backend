const express = require('express');
const routes = require('./src/routes');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes)
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
