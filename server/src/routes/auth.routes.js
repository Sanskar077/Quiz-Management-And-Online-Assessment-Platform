const { Router } = require('express');
const { register, login, logout, me } = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../middleware/validate.middleware');
const { requireAuth } = require('../middleware/auth.middleware');

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, me);

module.exports = router;
