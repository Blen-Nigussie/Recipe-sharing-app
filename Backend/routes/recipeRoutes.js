const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadImage");
const {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  likeRecipe,
  getRecipesByCategory,
  getLikedRecipes,
  getMyRecipes
} = require("../controllers/recipeController");

const router = express.Router();

//  Category route (must be before /:id)
router.get("/category/:category", getRecipesByCategory);

//  User-specific routes (must be before /:id)
router.get("/my", protect, getMyRecipes);
router.get("/liked", protect, getLikedRecipes);

//  Like recipe
router.put("/like/:id", protect, likeRecipe);

//  Create + Get All Recipes
router
  .route("/")
  .post(protect, upload.single("image"), createRecipe)
  .get(getRecipes);

//  Single Recipe routes (must be last)
router
  .route("/:id")
  .get(getRecipe)
  .put(protect, upload.single("image"), updateRecipe)
  .delete(protect, deleteRecipe);

module.exports = router;
