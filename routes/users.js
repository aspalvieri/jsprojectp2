const router = require("express").Router();

const UsersController = require("../controllers/usersController.js");

//Routes
//router.get(`/new`, UsersController.new);

router.post(`/`, UsersController.create);

module.exports = router;