import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001; 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

// Test Route (GET request to root)
app.get("/", (req, res) => {
  res.send("Hello! Backend is running.");
});

// API Endpoint: Save Form Data
app.post("/api/form", (req, res) => {
  const { name, number, email, notes } = req.body;

  const query =
    "INSERT INTO form_data (name, number, email, notes) VALUES (?, ?, ?, ?)";
  db.query(query, [name, number, email, notes], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Failed to save form data" }); 
    }

    res.status(201).json({ message: "Form data saved successfully!" }); 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error('Error starting server:', err);
  }
});