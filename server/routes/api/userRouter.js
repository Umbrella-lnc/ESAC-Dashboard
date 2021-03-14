const userRoutes = require("../../controllers/userController.js");
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/register", userRoutes.register);
router.post("/login", userRoutes.login);
router.get("/", (req, res) => {
    // access by localhost:5000/api/users/
    res.send("It works!!!");
});

//Testing authentification, just send a get request with bearer token in auth
router.get(
    "/secure",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.send("You are authenticated, sending web page to: " + req.user);
    }
);

module.exports = router;
