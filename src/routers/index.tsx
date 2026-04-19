import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from '@/components/layout';
import AppLayout from '@/components/layout/dashboard/DashboardLayout';
import SignIn from '@/pages/Auth/SignIn';
import SignUp from '@/pages/Auth/SignUp';
import Home from '@/pages/Home';
import NotFound from '@/pages/Errors/NotFound';
import Tuition from '@/pages/Tuition';
import PrivetRoute from './PrivateRoute';
import {tutorPath} from './tutor.routes';
import {routesGenerator} from '@/utils/routesGenerator';
import {userRole} from '@/utils/role';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {index: true, element: <Home />},
      {path: 'tuition', element: <Tuition />},
    ],
  },
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/tutor',
    element: (
      <PrivetRoute role={userRole.TUTOR}>
        <AppLayout />
      </PrivetRoute>
    ),
    children: routesGenerator(tutorPath),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
