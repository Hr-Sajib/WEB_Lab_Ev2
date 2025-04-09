const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const app = express();
const port = 5100;
const cors = require('cors');

// Enable CORS for both localhost and 127.0.0.1
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    credentials: true
}));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// API route to fetch all users
app.get('/api/users', (req, res) => {
    const { name, email } = req.query; // Get search parameters from query string

    let sql = 'SELECT * FROM user_data WHERE 1=1'; // Start with a condition that always matches

    const params = [];

    // Add conditions based on query parameters
    if (name) {
        sql += ' AND name LIKE ?';
        params.push(`%${name}%`); // Search by name (partial match)
    }
    
    if (email) {
        sql += ' AND email LIKE ?';
        params.push(`%${email}%`); // Search by email (partial match)
    }

    sql += ' ORDER BY id ASC'; // Order results by ID

    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }
        res.json(results);
    });
});

// Route to handle adding a new user
app.post('/add', (req, res) => {
    const { name, age, email, address } = req.body;
    const sql = 'INSERT INTO user_data (name, age, email, address) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, age, email, address], (err, result) => {
        if (err) {
            console.error('Error adding data:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }
        res.redirect('/'); // Redirect to the main page
    });
});

// Route to handle the update
app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, age, email, address } = req.body;

    const sql = 'UPDATE user_data SET name = ?, age = ?, email = ?, address = ? WHERE id = ?';
    connection.query(sql, [name, age, email, address, id], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }
        res.redirect('/'); // Redirect to the main page
    });
});

// Route to handle delete
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM user_data WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }
        res.redirect('/'); // Redirect to the main page
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
