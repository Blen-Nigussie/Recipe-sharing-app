import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

export default function LikedMeal() {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please log in again.");
          return;
        }

        // Use the proper backend endpoint for liked recipes
        const response = await axios.get("http://localhost:5000/api/recipes/liked", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(" Liked recipes response:", response.data);
        console.log(" First recipe image data:", response.data[0]?.image);
        
        setLikedRecipes(response.data);
      } catch (err) {
        console.error("Error fetching liked recipes:", err);
        setError("Failed to fetch liked recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchLikedRecipes();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
          ❤️ Your Liked Meals
        </h1>
        <p className="text-center text-lg font-semibold text-gray-500 mt-10">
          Loading your liked recipes...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
          ❤️ Your Liked Meals
        </h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
        ❤️ Your Liked Meals
      </h1>

      {likedRecipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💔</div>
          <p className="text-xl text-gray-600 mb-4">You haven't liked any recipes yet.</p>
          <p className="text-gray-500">Start exploring recipes and like the ones you love!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {likedRecipes.map((recipe) => (
            <Link key={recipe._id} to={`/meals/${recipe._id}`}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gray-100 aspect-[4/3] overflow-hidden">
                  {recipe.image ? (
                    <>
                      {console.log("🖼️ Rendering image for recipe:", recipe.title, "Image path:", recipe.image)}
                      <img
                        src={recipe.image.startsWith('http') ? recipe.image : `http://localhost:5000/${recipe.image}`}
                        alt={recipe.title}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          console.error(" Image failed to load:", e.target.src);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center text-gray-400 italic" style={{display: 'none'}}>
                        Image Failed to Load
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-500">
                      <FaHeart />
                      <span className="text-sm font-semibold">{recipe.likes?.length || 0} Likes</span>
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {recipe.category}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
