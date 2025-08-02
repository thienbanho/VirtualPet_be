const express = require('express');
const petController = require('../controllers/petController'); 
const petTypeController = require('../controllers/petTypeController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['shelter_manager', 'shelter_staff']), petController.createPet);
router.get('/', petController.getAllPets);
router.get('/types', petTypeController.getAllPetTypes); // Get all pet types route
router.post('/types', authMiddleware, roleMiddleware(['shelter_manager', 'shelter_staff']), petTypeController.createPetType); // Create a new pet type route
router.get('/:id', petController.getPetById);
router.put('/:id', authMiddleware, roleMiddleware(['shelter_manager', 'shelter_staff']), petController.updatePet);
router.delete('/:id', authMiddleware, roleMiddleware(['shelter_manager', 'shelter_staff']), petController.deletePet);

router.post('/bulk', authMiddleware, roleMiddleware(['shelter_manager']), petController.bulkCreatePets); // Bulk create pets route


module.exports = router;
