import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function MyRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { alert: 'Please log in to view your recipes' } });
      return;
    }

    const fetchMyRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        if (!token) {
          setError("No authentication token found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/recipes/my", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <p className="p-6">Redirecting to login...</p>;
  }

  if (loading) return <p className="p-6">Loading...</p>;

  if (error)
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">My Recipes</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">My Recipes</h1>

      {recipes.length === 0 ? (
        <p className="text-center text-gray-500">No recipes found. Start creating your first recipe!</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Link 
            key={recipe._id} 
          to={`/my-recipes/${recipe._id}`}
            >
            <li
              key={recipe._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="bg-gray-100 aspect-[4/3] overflow-hidden">
                {recipe.image ? (
                  <img
                    src={`http://localhost:5000/${recipe.image}`}
                    alt={recipe.title}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{recipe.title}</h2>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{recipe.description}</p>
                </div>

                <div className="mt-5 text-xs text-gray-500">Category: {recipe.category}</div>
              </div>
            </li>
            </Link>
            
          ))}
        </ul>
      )}
    </div>
  );
}
