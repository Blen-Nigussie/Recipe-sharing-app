import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const UserSidebar = ({ isOpen, onClose }) => {
  const { user, logout, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  const handleProfileClick = () => {
    onClose();
    navigate('/my-recipes');
  };

  const handleAddRecipeClick = () => {
    onClose();
    navigate('/add-recipe');
  };

  const handleLikedMealsClick = () => {
    onClose();
    navigate('/liked-meals');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">User Menu</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          {isAuthenticated ? (
            <>
              {/* User Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#4b9e22] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{user?.name || 'User'}</h3>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <i className="ri-user-line text-xl text-gray-600"></i>
                  <span className="text-gray-800">My Recipes</span>
                </button>

                <button
                  onClick={handleAddRecipeClick}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <i className="ri-add-line text-xl text-gray-600"></i>
                  <span className="text-gray-800">Add Recipe</span>
                </button>

                <button
                  onClick={handleLikedMealsClick}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <i className="ri-heart-line text-xl text-gray-600"></i>
                  <span className="text-gray-800">Liked Meals</span>
                </button>
              </nav>

              {/* Logout Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  <i className="ri-logout-box-r-line"></i>
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            /* Not Authenticated */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-line text-2xl text-gray-500"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Not Logged In</h3>
              <p className="text-gray-600 mb-6">Please log in to access your account</p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/login');
                  }}
                  className="w-full bg-[#4b9e22] hover:bg-[#3d7e1b] text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/signup');
                  }}
                  className="w-full border border-[#4b9e22] text-[#4b9e22] hover:bg-[#4b9e22] hover:text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserSidebar; 