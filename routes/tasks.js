// Our router module
const router = require('express').Router();

// Our controller
const TasksController = require('../controllers/tasksController.js');

// Our routes
//router.get(`/new`, TasksController.new);
router.get(`/`, TasksController.index);
router.get(`/:id`, TasksController.show);
router.get(`/:id/edit`, TasksController.edit);

router.post(`/`, TasksController.create);
router.post(`/update`, TasksController.update);
router.post(`/destroy`, TasksController.destroy);

// We have to export our changes
module.exports = router;
