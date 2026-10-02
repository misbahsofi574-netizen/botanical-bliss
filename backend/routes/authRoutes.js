const express = require("express");
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


/* =========================================================
   TEST
========================================================= */

router.get("/test", (req, res) => {

    res.json({

        message:
            "Auth routes are working!"

    });

});


/* =========================================================
   REGISTER
========================================================= */

router.post(
    "/register",
    authController.registerUser
);


/* =========================================================
   LOGIN
========================================================= */

router.post(
    "/login",
    authController.loginUser
);


/* =========================================================
   PROFILE
========================================================= */

router.get(
    "/profile",
    protect,
    authController.getProfile
);

router.put(
    "/profile",
    protect,
    authController.updateProfile
);


module.exports = router;