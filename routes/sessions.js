const router = require("express").Router();

const SessionsController = require("../controllers/sessionsController.js");

//Routes
//router.get("/login", SessionsController.login);
router.post("/authenticate", SessionsController.authenticate);
router.get("/authenticated", SessionsController.isAuthenticated);
router.post("/logout", SessionsController.logout);

module.exports = router;