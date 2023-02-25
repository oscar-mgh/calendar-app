const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { genereteJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario ya existe',
			});
		}
		user = new User(req.body);

		//! encrypt password
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		//? Generate JWT
		const token = await genereteJWT(user.id, user.name);

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Porfavor contacte con el administrador',
		});
	}
};

const loginUser = async (req, res = response) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario no existe',
			});
		}

		//* Confirm passwords
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Contraseña invalida',
			});
		}

		//? Generate JWT
		const token = await genereteJWT(user.id, user.name);

		res.json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Porfavor contacte con el administrador',
		});
	}
};

const renewToken = async (req, res = response) => {
	const { uid, name } = req;

	//? Generate JWT
	const token = await genereteJWT(uid, name);

	res.status(200).json({
		ok: true,
		uid,
		name,
		token,
	});
};

module.exports = {
	createUser,
	loginUser,
	renewToken,
};
