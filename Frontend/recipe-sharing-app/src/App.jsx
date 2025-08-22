import { RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './context/UserContext';
import 'boxicons/css/boxicons.min.css';
import 'remixicon/fonts/remixicon.css';
import "./App.css";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={AppRoutes}/>
    </UserProvider>
  );
}

export default App;
