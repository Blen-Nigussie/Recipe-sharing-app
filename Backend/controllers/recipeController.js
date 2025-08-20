const Recipe = require("../models/Recipe");
const User = require("../models/User");


// 📌 CREATE a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, category } = req.body;
    const image = req.file?.path;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients: ingredients.split(",").map(i => i.trim()),
      steps: steps.split("\n").map(s => s.trim()), // allow multiline steps
      category,
      image,
      createdBy: req.user._id
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error.message);
    res.status(500).json({ message: "Server error creating recipe" });
  }
  
};

// 📌 GET all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("createdBy", "name");
    res.json(recipes);
  } catch (error) {
    console.error("Error getting recipes:", error.message);
    res.status(500).json({ message: "Server error getting recipes" });
  }
};

// 📌 GET single recipe
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("createdBy", "name");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    console.error("Error getting recipe:", error.message);
    res.status(500).json({ message: "Server error getting recipe" });
  }
};

// 📌 GET recipes by category
exports.getRecipesByCategory = async (req, res) => {
  try {
    const recipes = await Recipe.find({ category: req.params.category }).populate("createdBy", "name");
    res.json(recipes);
  } catch (error) {
    console.error("Error getting category recipes:", error.message);
    res.status(500).json({ message: "Server error getting category recipes" });
  }
};

// UPDATE recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this recipe" });
    }

    const { title, description, ingredients, steps, category } = req.body;
    if (title) recipe.title = title;
    if (description) recipe.description = description;
    if (ingredients) recipe.ingredients = ingredients.split(",").map(i => i.trim());
    if (steps) recipe.steps = steps.split("\n").map(s => s.trim());
    if (category) recipe.category = category;
    if (req.file) recipe.image = req.file.path;

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error.message);
    res.status(500).json({ message: "Server error updating recipe" });
  }
};
//  GET recipes created by logged-in user
exports.getMyRecipes = async (req, res) => {
  try {
    console.log("getMyRecipes called");
    console.log("User ID from request:", req.user._id);
    console.log("User object:", req.user);
    
    // Test if user exists in database
    const userExists = await User.findById(req.user._id);
    console.log(" User exists in DB:", !!userExists);
    
    const recipes = await Recipe.find({ createdBy: req.user._id })
      .populate("createdBy", "name");
    
    console.log(" Recipes found:", recipes);
    
    res.json(recipes);
  } catch (error) {
    console.error(" Error in getMyRecipes:", error);
    console.error(" Error stack:", error.stack);
    res.status(500).json({ message: "Server error getting recipe" });
  }
};


//  DELETE recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }

    await recipe.deleteOne();
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error.message);
    res.status(500).json({ message: "Server error deleting recipe" });
  }
};
exports.getLikedRecipes = async (req, res) => {
  try {
    console.log("getLikedRecipes called for user:", req.user._id);
    
    const recipes = await Recipe.find({ likes: req.user._id })
      .populate("createdBy", "name");
    
    console.log("Liked recipes found:", recipes.length);
    console.log("First recipe data:", recipes[0] ? {
      _id: recipes[0]._id,
      title: recipes[0].title,
      image: recipes[0].image,
      hasImage: !!recipes[0].image
    } : "No recipes");
    
    res.json(recipes);
  } catch (error) {
    console.error("Error in getLikedRecipes:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: "Server error getting liked recipes" });
  }
};


//  LIKE / UNLIKE recipe
exports.likeRecipe = async (req, res) => {
  try {
    console.log(" Like/Unlike request for recipe:", req.params.id);
    console.log(" User ID:", req.user._id);
    
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      console.log(" Recipe not found:", req.params.id);
      return res.status(404).json({ message: "Recipe not found" });
    }

    const userId = req.user._id.toString();
    const alreadyLiked = recipe.likes.some(id => id.toString() === userId);
    
    console.log("Current likes:", recipe.likes);
    console.log("User already liked:", alreadyLiked);

    if (alreadyLiked) {
      recipe.likes = recipe.likes.filter(id => id.toString() !== userId);
      console.log(" User unliked recipe");
    } else {
      recipe.likes.push(req.user._id);
      console.log(" User liked recipe");
    }

    await recipe.save();
    console.log(" Recipe saved with new likes:", recipe.likes);

    const updatedRecipe = await Recipe.findById(req.params.id)
      .populate("createdBy", "name")
      .lean();

    res.json({
      ...updatedRecipe,
      likesCount: updatedRecipe.likes.length,
    });
  } catch (error) {
    console.error("Error liking recipe:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: "Server error liking recipe" });
  }
};

