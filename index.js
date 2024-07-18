const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env file

// AWS RDS MySQL database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to database as id', connection.threadId);

  // Create a new database (if it doesn't exist)
  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`, (err, result) => {
    if (err) {
      console.error('Error creating database:', err.stack);
      return;
    }
    console.log(`Database '${process.env.DB_DATABASE}' created or already exists.`);
    
    // Use the newly created database
    connection.query(`USE ${process.env.DB_DATABASE}`, (err, result) => {
      if (err) {
        console.error('Error selecting database:', err.stack);
        return;
      }
      console.log(`Using database '${process.env.DB_DATABASE}'.`);

      // Example query: select 10 records from a table 
      connection.query('SELECT * FROM your_table_name LIMIT 10', (err, rows) => {
        if (err) {
          console.error('Error querying database:', err.stack);
          return;
        }
        console.log('Data received from database:');
        console.log(rows);
      });

      // Close the connection
      connection.end((err) => {
        if (err) {
          console.error('Error closing database connection:', err.stack);
          return;
        }
        console.log('Database connection closed gracefully.');
      });
    });
  });
});
