import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate , NavLink, Outlet } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaRegCommentDots } from "react-icons/fa";

export default function MyRecipeDetail() {
  const { id } = useParams(); // Get the recipe id from the URL
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://enbla-recipe-sharing-app-16il.onrender.com/api/recipes/${id}`,{
            headers: {
            Authorization: `Bearer ${token}`,
          },
          }
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to fetch recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-lg font-semibold text-gray-500 mt-10">
        Loading recipe...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-lg font-semibold text-red-500 mt-10">
        {error}
      </p>
    );

  return (
    <div
      className="max-w-4xl mx-auto p-6 mt-12rounded-xl "
    >
      {/* Back Button */}
    <button
      onClick={() => navigate("/my-recipes")} // Navigate back to My Recipes
      className="flex items-center gap-2 text-gray-600 hover:text-[#4b9e22] mb-6 transition-colors"
    >
      <FaArrowLeft />
      <span className="font-medium">Back to My Recipes</span>
    </button>

      {/* Recipe Image */}
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
        {recipe.image ? (
          <img
            src={`https://enbla-recipe-sharing-app-16il.onrender.com/${recipe.image}`}
            alt={recipe.title}
            className="w-full h-[350px] object-contain"
          />
        ) : (
          <div className="w-full h-[350px] flex items-center justify-center text-gray-400 italic">
            No Image Available
          </div>
        )}
      </div>

      {/* Recipe Title */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
        {recipe.title}
      </h1>

      {/* Description */}
      {/* <p className="text-gray-600 text-lg leading-relaxed mb-6">
        {recipe.description}
      </p> */}

      {/* Actions */}
      <div className="flex items-center gap-6 text-gray-500">
        
      </div>
       <div className="w-full">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <nav className="flex gap-6 text-gray-600 font-medium text-md md:text-base">
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              // Make Breakfast active if URL is exactly "/categories" or "/categories/breakfast"
              `transition duration-200 hover:text-[#4b9e22] ${
                isActive || location.pathname === "/categories"
                  ? "text-[#4b9e22] underline underline-offset-4"
                  : ""
              }`
            }
          >
            Details
          </NavLink>
          <NavLink
            to="ingredients"
            className={({ isActive }) =>
              `transition duration-200 hover:text-[#4b9e22] ${
                isActive ? "text-[#4b9e22] underline underline-offset-4" : ""
              }`
            }
          >
            Ingredients
          </NavLink>
          <NavLink
            to="recipe"
            className={({ isActive }) =>
              `transition duration-200 hover:text-[#4b9e22] ${
                isActive ? "text-[#4b9e22] underline underline-offset-4" : ""
              }`
            }
          >
           Recipe
          </NavLink>
        </nav>
      </div>
      <div>
        <Outlet context={recipe}/>
      </div>
    </div>
    </div>
  );
}
