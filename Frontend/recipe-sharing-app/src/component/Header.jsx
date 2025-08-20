import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import UserSidebar from './UserSidebar';
import logo from '../assets/img/logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userSidebarOpen, setUserSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useUser();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleUserSidebar = () => setUserSidebarOpen(!userSidebarOpen);
  const closeUserSidebar = () => setUserSidebarOpen(false);

  return (
    <>
      <header className="flex justify-between items-center px-6 md:px-32 py-4 shadow-md bg-white relative">
        {/* Logo */}
        <Link to="/" className="flex items-center py-2" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-[#4b9e22] transition duration-200 ${
                isActive ? 'text-[#4b9e22] underline underline-offset-4' : ''
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/meals"
            className={({ isActive }) =>
              `hover:text-[#4b9e22] transition duration-200 ${
                isActive ? 'text-[#4b9e22] underline underline-offset-4' : ''
              }`
            }
          >
            Meals
          </NavLink>
          <NavLink
            to="/popular"
            className={({ isActive }) =>
              `hover:text-[#4b9e22] transition duration-200 ${
                isActive ? 'text-[#4b9e22] underline underline-offset-4' : ''
              }`
            }
          >
            Popular
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/my-recipes"
              className={({ isActive }) =>
                `hover:text-[#4b9e22] transition duration-200 ${
                  isActive ? 'text-[#4b9e22] underline underline-offset-4' : ''
                }`
              }
            >
              My Recipes
            </NavLink>
          )}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-6 text-xl text-gray-600">
          
          
          {isAuthenticated ? (
            <>
              <Link
                to="/liked-meals"
                title="Favorites"
                className="hover:text-[#4b9e22] transition duration-200"
              >
                <i className="ri-heart-line text-2xl"></i>
              </Link>
              <Link
                to="/add-recipe"
                title="Add New Recipe"
                className="hover:text-[#4b9e22] transition duration-200"
              >
                <i className="ri-add-line text-2xl"></i>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                title="Login"
                className="hover:text-[#4b9e22] transition duration-200"
              >
                <i className="ri-login-box-line text-2xl"></i>
              </Link>
              <Link
                to="/signup"
                title="Sign Up"
                className="hover:text-[#4b9e22] transition duration-200"
              >
                <i className="ri-user-add-line text-2xl"></i>
              </Link>
            </>
          )}

          {/* User Icon - Always visible */}
          <button 
            title={isAuthenticated ? "User Menu" : "Login/Signup"}
            onClick={toggleUserSidebar}
            className="hover:text-[#4b9e22] transition duration-200 relative"
          >
            {isAuthenticated ? (
              <div className="w-8 h-8 bg-[#4b9e22] rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            ) : (
              <i className="ri-user-line"></i>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden hover:text-[#4b9e22] transition duration-200"
            onClick={toggleMenu}
          >
            <i className={`ri-${menuOpen ? 'close-line' : 'menu-line'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md p-6 flex flex-col gap-4 md:hidden z-50">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `hover:text-[#4b9e22] transition duration-200 ${
                  isActive ? 'text-[#4b9e22] underline underline-offset-4' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/meals"
              onClick={closeMenu}
              className={({ isActive }) =>
                `hover:text-[#4b9e22] transition duration-200 ${
                  isActive ? 'text-[#4b9e22] underline underline-offset-4' : ''
                }`
              }
            >
              Meals
            </NavLink>
            <NavLink
              to="/popular"
              onClick={closeMenu}
              className={({ isActive }) =>
                `hover:text-[#4b9e22] transition duration-200 ${
                  isActive ? 'text-[#4b9e22] underline underline-offset-4' : ''
                }`
              }
            >
              Popular
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/my-recipes"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `hover:text-[#4b9e22] transition duration-200 ${
                    isActive ? 'text-[#4b9e22] underline underline-offset-4' : ''
                  }`
                }
              >
                My Recipes
              </NavLink>
            )}
            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="hover:text-[#4b9e22] transition duration-200"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={closeMenu}
                  className="hover:text-[#4b9e22] transition duration-200"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </header>

      {/* User Sidebar */}
      <UserSidebar 
        isOpen={userSidebarOpen} 
        onClose={closeUserSidebar} 
      />
    </>
  );
};

export default Header;
