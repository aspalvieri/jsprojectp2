// Our router module
const router = require('express').Router();

// Our controller
const PagesController = require('../controllers/pagesController.js');

// Our routes
router.get(`/`, PagesController.show);

// We have to export our changes
module.exports = router;