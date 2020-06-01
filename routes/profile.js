
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const profileValidationRules = require('../validation_rules/profile');

// Get profile
router.get('/', profileController.getProfile);

// Update profile
router.put('/', profileValidationRules.updateProfileRules, profileController.updateProfile);

module.exports = router;