const express = require('express');
const router = express.Router();

router.get('/me', Protect , getMe);

export default router;
