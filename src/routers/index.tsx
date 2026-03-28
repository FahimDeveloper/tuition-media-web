import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from '../components/layout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Tuition from '../pages/Tuition/Tuition';
import Dashboard from '../pages/Dashboard/Dashboard';
import DashboardLayout from '../components/layout/shared/DashboardLayout';

const router = createBrowserRouter([
  // Public Routes (with MainLayout)
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {path: '/', element: <Home />},
      {path: '/login', element: <Login />},
      {path: '/signup', element: <Signup />},
      {path: '/tuition', element: <Tuition />},
    ],
  },

  // Dashboard Routes (NO MainLayout)
  {
    path: '/dashboard',
    element: <DashboardLayout />, // separate layout
    children: [{path: '', element: <Dashboard />}],
  },

  // 404 (global)
  {
    path: '*',
    element: <div>404</div>,
  },
]);

export default router;
