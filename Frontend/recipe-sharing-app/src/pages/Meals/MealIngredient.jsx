import { useOutletContext } from 'react-router-dom';

export default function MealIngredient() {
  const recipe = useOutletContext();

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-10 mt-10 border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b border-gray-200 pb-3">
        🥕 Ingredients
      </h2>

      {recipe?.ingredients && recipe.ingredients.length > 0 ? (
        <ul className="space-y-4">
          {recipe.ingredients.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-4 p-4 bg-green-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg select-none">
                ✓
              </span>
              <span className="text-gray-800 font-semibold text-lg">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400 italic text-lg mt-6">
          No ingredients listed for this recipe.
        </p>
      )}
    </div>
  );
}
