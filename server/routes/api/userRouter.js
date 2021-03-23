const express = require("express");
const router = express.Router();

const userRoutes = require("../../controllers/userController.js");

router.post("/register", userRoutes.register);
router.post("/login", userRoutes.login);

module.exports = router;
