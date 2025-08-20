import { motion } from "framer-motion";
import {useNavigate} from 'react-router-dom'

export default function Home() {
   const navigate = useNavigate();
  const sections = [
  {
    title: "Explore Endless Recipes",
    content:
      "Discover a wide range of recipes from all over the world — complete with step-by-step instructions, ingredients, and tips to help you cook with confidence."
  },
  {
    title: "Create & Share Your Own",
    content:
      "Got a favorite dish? Add your personal recipes under 'My Recipes' and include ingredients, cooking steps, and preparation time to share with the community."
  },
  {
    title: "Interactive Cooking Experience",
    content:
      "Easily manage your ingredients, follow procedures step-by-step, and contribute to a growing collection of user-generated recipes made with passion."
  }
];

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        className="min-h-screen bg-cover bg-center flex items-center justify-center text-white relative px-6"
        style={{
          backgroundImage: "url('/cta.webp')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Overlay */}
        

        {/* Hero Content */}
        <motion.div
          className="text-center max-w-3xl px-4 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-4 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Welcome to the community
          </motion.p>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            RecipeShare
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Discover and share your favorite recipes with a community of food lovers from around the world.
          </motion.p>

          <motion.button
            className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300"
            onClick={() => navigate("/add-recipe")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Share Your Recipe
          </motion.button>
        </motion.div>
      </motion.section>

      
     {/* About Section */}
<div className="min-h-screen bg-gradient-to-b from-white to-[#f1f1f1] flex flex-col items-center px-6 py-20">
  <motion.h1
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="text-4xl md:text-5xl font-extrabold text-[#4b9e22] mb-14 tracking-tight"
  >
    Our Features
  </motion.h1>

  <div className="w-full max-w-4xl space-y-8">
    {sections.map((section, index) => (
      <motion.div
        key={index}
        whileHover={{
          scale: 1.02,
          y: -4,
          boxShadow: "0 12px 25px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-[#4b9e22] transition-all duration-200 ease-in-out group"
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800 group-hover:text-[#4b9e22] transition-colors duration-200">
          {section.title}
        </h2>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200 leading-relaxed">
          {section.content}
        </p>
      </motion.div>
    ))}
  </div>
</div>


    </div>
  );
}
