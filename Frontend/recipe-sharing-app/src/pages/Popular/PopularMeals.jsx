import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link , useNavigate} from "react-router-dom";

export default function PopularMeals() {
  const [recipes, setRecipes] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/recipes/category/Popular",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);
  const handleLike = async (e, recipeId) => {
    e.preventDefault();
  
    // Optimistic update
    setRecipes(prev =>
      prev.map(r => {
        if (r._id !== recipeId) return r;
        const alreadyLiked = r.likes.some(likeId => likeId.toString() === userId);
        return {
          ...r,
          likes: alreadyLiked
            ? r.likes.filter(likeId => likeId.toString() !== userId)
            : [...r.likes, userId]
        };
      })
    );
  
    try {
      await axios.put(
        `http://localhost:5000/api/recipes/like/${recipeId}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } catch (err) {
      console.error(err);
      alert("Failed to like recipe");
  
      setRecipes(prev =>
        prev.map(r => {
          if (r._id !== recipeId) return r;
          const alreadyLiked = r.likes.some(likeId => likeId.toString() === userId);
          return {
            ...r,
            likes: alreadyLiked
              ? r.likes.filter(likeId => likeId.toString() !== userId)
              : [...r.likes, userId]
          };
        })
      );
    }
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Page Title */}
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        🍴 Popular Recipes
      </h2>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Link to={`${recipe._id}` }>
          <motion.div
            key={recipe._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            variants={cardVariants}
          >
            {/* Image container with fixed aspect ratio and subtle bg */}
            <div className="bg-gray-100 aspect-[4/3] overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Recipe Info */}
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {recipe.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {recipe.description}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-5 flex justify-between items-center text-gray-500">
              <button
  className={`flex items-center gap-2 transition-colors ${
    recipe.likes?.includes(userId) ? "text-red-500" : "text-gray-500 hover:text-red-500"
  }`}
  onClick={(e) => handleLike(e, recipe._id)}
>
  <FaHeart />
  <span className="text-sm font-semibold">{recipe.likes?.length || 0} Likes</span>
</button>
                <button
                  onClick={(e) => {
                    e.preventDefault(); 
                    e.stopPropagation();
                    navigate(`/comments/${recipe._id}`);
                  }}
                  className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                >
                  <FaRegCommentDots />
                  <span className="text-sm font-semibold">Comment</span>
                </button>
              </div>
            </div>
          </motion.div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {recipes.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No Popular recipes found.
        </p>
      )}
    </motion.div>
  );
}
