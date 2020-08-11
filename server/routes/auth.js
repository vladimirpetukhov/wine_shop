const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth');

// @route POST api/auth
// @desc Login user, send auth cookie
router.post('/', login);

// @route POST api/auth/register
// @desc Register user
router.post('/register', register);

// @route GET api/auth
// @desc Logout user, clear auth cookie
router.get('/logout', logout);

module.exports = router;
