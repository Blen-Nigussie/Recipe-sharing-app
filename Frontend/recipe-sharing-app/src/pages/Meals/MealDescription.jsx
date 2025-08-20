import { useOutletContext } from "react-router-dom";
import { FaTag, FaInfoCircle, FaUtensils } from "react-icons/fa";

export default function MealDescription() {
  const recipe = useOutletContext();

  return (
    <div className="relative max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-3xl p-10 mt-10 border border-gray-200
      before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#4b9e22]/10 before:to-transparent before:rounded-3xl before:-z-10"
    >
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-3 relative after:block after:w-24 after:h-1 after:rounded-full after:bg-[#4b9e22] after:absolute after:left-0 after:-bottom-2">
        <FaUtensils className="text-[#4b9e22]" />
        Recipe Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Name */}
        <div className="bg-white p-7 rounded-2xl border border-gray-300 hover:shadow-lg hover:border-[#4b9e22] transition-all duration-300 cursor-default">
          <p className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-2 mb-2 tracking-wide select-none">
            <FaTag className="text-[#4b9e22]" /> Name
          </p>
          <p className="text-xl font-semibold text-gray-900">{recipe.title}</p>
        </div>

        {/* Category */}
        <div className="bg-white p-7 rounded-2xl border border-gray-300 hover:shadow-lg hover:border-[#4b9e22] transition-all duration-300 cursor-default">
          <p className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-2 mb-2 tracking-wide select-none">
            <FaInfoCircle className="text-[#4b9e22]" /> Category
          </p>
          <p className="text-xl font-semibold text-gray-900">{recipe.category}</p>
        </div>

        {/* Description */}
        <div className="bg-white p-7 rounded-2xl border border-gray-300 sm:col-span-2 hover:shadow-lg hover:border-[#4b9e22] transition-all duration-300 cursor-default">
          <p className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-2 mb-4 tracking-wide select-none">
            <FaInfoCircle className="text-[#4b9e22]" /> Description
          </p>
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{recipe.description}</p>
        </div>
      </div>
    </div>
  );
}
