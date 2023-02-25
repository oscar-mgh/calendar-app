//!			host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
	'/new',
	[
		//Middlewares
		check('name', 'name field is required').not().isEmpty(),
		check('email', 'email field is required').isEmail(),
		check('password', 'your password must be at least 6 characters long').isLength({ min: 6 }),
    validateFields
	],
	createUser
);

router.post(
	'/',
	[
		//Middlewares
		check('email', 'email field is required').isEmail(),
		check('password', 'your password must be at least 6 characters long').isLength({ min: 6 }),
    validateFields
	],
	loginUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
