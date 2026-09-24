const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        message: "Auth routes are working!"
    });
});

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

module.exports = router;