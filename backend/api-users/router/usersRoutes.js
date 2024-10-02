const authJwt = require('../../middleware/auth');
const authController = require('../controllers/userAuthController');
const express = require('express');
const router = express.Router();

router.get('/all', authController.allAccess);
router.get('/test', [authJwt.verifyToken], authController.userContent);
module.exports = router;
