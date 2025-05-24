const express = require('express');
const router = express.Router();
const { getMe } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddlewares');

console.log(typeof protect);
console.log(typeof getMe);

router.get('/me', protect , getMe);

module.exports = router;
