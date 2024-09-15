require('dotenv').config();

const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

// Connecting to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the database');
});

// Handle user signup
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if the email already exists
    const checkEmailSql = "SELECT * FROM authentication WHERE email = ?";
    db.query(checkEmailSql, [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Database query error" });
        if (results.length > 0) return res.status(400).json({ message: "Email already exists" });

        // Insert new user
        const sql = "INSERT INTO authentication (name, email, password) VALUES (?)";
        const values = [name, email, password];
        db.query(sql, [values], (err, result) => {
            if (err) return res.status(500).json({ message: "Error inserting data" });
            res.status(201).json({ message: "User created successfully" });
        });
    });
});

// Handle user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    const sql = "SELECT * FROM authentication WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ message: "Database query error" });
        if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });
        res.status(200).json({ message: "Login successful" });
    });
});

// Starting the server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
