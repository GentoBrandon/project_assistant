const authJwt = require('../../middleware/auth');
const authController = require('../controllers/userAuthController');
const express = require('express');
const router = express.Router();


router.get('/profile', [authJwt.verifyTokens], authController.userProfile);
router.post('/logout', [authJwt.verifyTokens],authController.userLogout);
module.exports = router;
