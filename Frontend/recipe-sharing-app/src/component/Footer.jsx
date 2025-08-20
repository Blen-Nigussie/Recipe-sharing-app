import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

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
            {["Home", "Recipes", "Submit Recipe", "About Us"].map((item, index) => (
              <li key={index}>
                <a
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:underline transition duration-300 hover:text-white/90"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3 transition-colors duration-300 hover:text-white/90">
            Subscribe
          </h3>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-white text-[#4b9e22] font-semibold px-3 py-2 rounded hover:bg-gray-100 transition duration-300"
            >
              Subscribe
            </button>
          </form>
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
