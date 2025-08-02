const express = require('express');
const authController = require('../controllers/authController'); 
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware'); 

router.get('/index', authController.index);
router.post('/login', authController.login); // Login route
router.post('/register', authController.register); // Register route
router.post('/logout', authController.logout); // Logout route
router.post('/refresh', authController.refresh); // Refresh token route
router.get('/profile', authMiddleware, authController.profile); // Profile route
router.post('/updateProfile', authMiddleware, authController.updateProfile); // Update profile route
router.post('/changePassword', authMiddleware, authController.changePassword); // Change password route


router.get('/google', authController.googleLogin); // Google login route
router.get('/google/callback', authController.googleCallback); // Google callback route

router.post('/registerShelter',authMiddleware, roleMiddleware(['shelter_manager']), authController.registerShelter); // Register shelter route
router.post('/createStaff',authMiddleware, roleMiddleware(['shelter_manager']), authController.createStaff); // Create staff route

router.post('/testAdopter', authMiddleware, roleMiddleware(['adopters']), (req, res) => {
  res.status(200).json({ message: "Adopter access granted" });
}); // Test route for adopters

router.post('/testShelter', authMiddleware, roleMiddleware(['shelter_manager', 'shelter_staff']), (req, res) => {
  res.status(200).json({ message: "Shelter access granted" });
}); // Test route for shelter managers and staff

module.exports = router;