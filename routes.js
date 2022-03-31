const { loginRequired } = require("./src/middlewares.js");
const { Router } = require("express");
const router = new Router();

// Controllers
const homeController = require("./src/controllers/homeController.js");
const loginController = require("./src/controllers/loginController.js");
const contactController = require("./src/controllers/contactController.js");

// Home Routes
router.get("/", homeController.index);

// Login Routes
router.get("/login", loginController.index);
router.post("/login/register", loginController.register);
router.post("/login/enter", loginController.enter);
router.get("/logout", loginController.logout);

// Contact Routes
router.get("/contact", loginRequired, contactController.index);
router.post("/contact/register", loginRequired, contactController.register);
router.get("/contact/:id", loginRequired, contactController.edit);
router.post("/contact/edit/:id", loginRequired, contactController.editContact);
router.get("/contact/delete/:id", loginRequired, contactController.delete);

module.exports = router;