import { useOutletContext } from "react-router-dom";

export default function MyRecipeRecipe() {
  const recipe = useOutletContext();

  // Normalize steps: handle both array and string formats
  const stepsArray = Array.isArray(recipe.steps)
    ? recipe.steps
    : recipe.steps
    ? recipe.steps.split("\n").filter((step) => step.trim() !== "")
    : [];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b border-gray-200 pb-4 flex items-center gap-3">
          <span role="img" aria-label="Cooking">
            🍳
          </span>
          Cooking Instructions
        </h2>

        <div className="space-y-6 text-gray-800 leading-relaxed">
          {stepsArray.length > 0 ? (
            stepsArray.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-5 bg-yellow-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-yellow-400 text-white font-bold rounded-full shadow-lg select-none text-lg">
                  {index + 1}
                </span>
                <p className="text-lg">{step}</p>
              </div>
            ))
          ) : (
            <p className="italic text-gray-400 text-center text-lg">
              No steps available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
