const express = require('express');
const app = express();
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//* Database
dbConnection();

//* CORS
app.use(cors());

//* Public Access
app.use(express.static('public'));

//* Reading and parsing body
app.use(express.json());

//* Rutes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

//* Listen on Port
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
