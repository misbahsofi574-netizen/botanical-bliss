const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
console.log("PROTECT TYPE:", typeof protect);

const {
    createGardenPost,
    getGardenPosts,
    likeGardenPost,
    deleteGardenPost
} = require("../controllers/gardenPostController");

router.post("/", protect, createGardenPost);

router.get("/", getGardenPosts);

router.put("/:id/like", protect, likeGardenPost);

router.delete("/:id", protect, deleteGardenPost);

module.exports = router;