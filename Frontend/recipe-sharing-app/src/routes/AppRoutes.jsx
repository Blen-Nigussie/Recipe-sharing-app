import { Routes, Route,RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom';
import ProtectedRoute from '../component/ProtectedRoute';
import Layout from '../component/Layout';
import Home from '../pages/home';
import MealPage from '../pages/Meals/MealPage';
import MealDetail from '../pages/Meals/MealsDetail';
import MealDescription from '../pages/Meals/MealDescription';
import MealRecipe from '../pages/Meals/MealRecipie';
import MealIngeredient from '../pages/Meals/MealIngredient';
import PopularMeals from '../pages/Popular/PopularMeals';
import PopularMealsDetail from '../pages/Popular/PopularMealsDetail';
import PopularDescription from '../pages/Popular/PopularDescription';
import PopularIngredient from '../pages/Popular/PopularIngredients';
import PopularRecipe from '../pages/Popular/PopularRecipe';
import AddRecipe from '../pages/AddRecipe/AddRecipe';
import Signup from '../pages/signup';
import Login from '../pages/login';
import MyRecipe from '../pages/MyRecipe/myRecipe';
import LikedMeal from '../pages/LikedMeal/likedmeal';
import MyRecipeDetail from '../pages/MyRecipe/MyRecipeDetail';
import MyRecipeDescription from '../pages/MyRecipe/MyRecipeDescription';
import MyRecipeIngredient from '../pages/MyRecipe/MyRecipeIngredient';
import MyRecipeRecipe from '../pages/MyRecipe/MyRecipeRecipe';
import CommentPage from '../pages/Comments/CommentPage';

const AppRoutes = createBrowserRouter(createRoutesFromElements(
   <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route 
          path="/meals" 
          element={
             <ProtectedRoute>
                <MealPage />
             </ProtectedRoute>
          }/>
       <Route
           path='/meals/:id'
           element={
          <ProtectedRoute>
            <MealDetail />
          </ProtectedRoute>
          }>
        <Route index element={<MealDescription />} />
        <Route path='recipe' element={<MealRecipe />} />
        <Route path='ingredients' element={<MealIngeredient />} />
        
      </Route>
      <Route path="popular" element={
        <ProtectedRoute>
          <PopularMeals />
        </ProtectedRoute>}/>
        <Route
             path="popular/:id"
             element={
               <ProtectedRoute>
                 <PopularMealsDetail />
               </ProtectedRoute>
             }
        >
              <Route index element={<PopularDescription />} />
              <Route path='recipe' element={<PopularRecipe />} />
              <Route path='ingredients' element={<PopularIngredient />} />
       </Route>
       <Route
          path='add-recipe'
          element={
            <ProtectedRoute>
              <AddRecipe />
            </ProtectedRoute>
          }
      />
      <Route
          path='my-recipes'
          element={
            <ProtectedRoute>
              <MyRecipe />
            </ProtectedRoute>
          }
      />
      <Route
           path='/my-recipes/:id'
           element={
          <ProtectedRoute>
            <MyRecipeDetail />
          </ProtectedRoute>
          }>
        <Route index element={<MyRecipeDescription />} />
        
        <Route path='recipe' element={<MyRecipeRecipe />} />
        <Route path='ingredients' element={<MyRecipeIngredient />} />
      </Route>
      <Route
          path='liked-meals'
          element={
            <ProtectedRoute>
              <LikedMeal />
            </ProtectedRoute>
          }
      />
      <Route
        path="comments/:id"
        element={
          <ProtectedRoute>
            <CommentPage />
          </ProtectedRoute>
        }
      />
    </Route>
))

export default AppRoutes;
