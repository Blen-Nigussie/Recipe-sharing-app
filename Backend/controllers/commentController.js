const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

// Add a new comment to a recipe
exports.addComment = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { text } = req.body;

    // Check if the recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Create and save the comment
    const comment = new Comment({
      text,
      user: req.user._id,
      recipe: recipeId
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all comments for a recipe
exports.getComments = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const comments = await Comment.find({ recipe: recipeId })
      .populate("user", "name") // Get commenter name
      .sort({ createdAt: -1 }); // Most recent first

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error" });
  }
};
