const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { addComment, getComments } = require("../controllers/commentController");

const router = express.Router();

// Add new comment
router.post("/:recipeId", protect, addComment);

// Get all comments of a recipe
router.get("/:recipeId", getComments);

module.exports = router;
