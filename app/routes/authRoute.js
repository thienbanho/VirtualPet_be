const express = require('express');
const authController = require('../controllers/authController'); 
const router = express.Router();

router.post('/login', authController.login); // Login route
router.post('/register', authController.register); // Register route
module.exports = router;