import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
  import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#4b9e22] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2 transition-transform duration-300 hover:scale-105">
            RecipeShare
          </h2>
          <p className="text-sm leading-relaxed transition-opacity duration-300 hover:opacity-90">
            Discover and share amazing recipes with a vibrant food-loving community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 transition-colors duration-300 hover:text-white/90">
            Quick Links
          </h3>
       

<ul className="space-y-2 text-sm">
  <li>
    <NavLink 
      to="/" 
      className="hover:underline transition duration-300 hover:text-white/90"
    >
      Home
    </NavLink>
  </li>
  <li>
    <NavLink 
      to="/meals" 
      className="hover:underline transition duration-300 hover:text-white/90"
    >
      Recipes
    </NavLink>
  </li>
  <li>
    <NavLink 
      to="/add-recipe" 
      className="hover:underline transition duration-300 hover:text-white/90"
    >
      Add Recipe
    </NavLink>
  </li>
  
</ul>

        </div>


        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3 transition-colors duration-300 hover:text-white/90">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-transform duration-300 hover:scale-110">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-transform duration-300 hover:scale-110">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-transform duration-300 hover:scale-110">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center mt-10 text-sm border-t border-white/20 pt-4 opacity-90 hover:opacity-100 transition-opacity duration-300">
        &copy; {new Date().getFullYear()} <span className="font-semibold">RecipeShare</span>. All rights reserved.
      </div>
    </footer>
  );
}
