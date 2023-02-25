const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN);
    console.log('Database Online');
	} catch (error) {
		console.log(error);
		throw new Error('Error, cannot initialize database');
	}
};

module.exports = {
  dbConnection
}