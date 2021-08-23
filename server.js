const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require("mysql2");

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
	{
		host: "localhost",
		user: "root",
		password: "goodboy217",
		database: "election",
	},
	console.log("Connected to the election database")
);

db.query(`SELECT * FROM candidates`, (err, rows) => {
	console.log(rows);
});

//!  Default res for any other req (Not Found) LAST ROUTE
app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
