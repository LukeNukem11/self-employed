// Import the mysql module
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost:3306', // Hostname of the database server
    user: 'root', // Username for connecting to the database
    password: 'J0shu4B0r3n!', // Password for connecting to the database
    database: 'unemployed_db' // Name of the database
});

// Connect to the database
connection.connect(function (err) {
    if (err) console.info(err); // Display an error message if connection fails
});

// Export the connection object to be used in other modules
module.exports = connection;
