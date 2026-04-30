import {createBrowserRouter} from 'react-router-dom';
import {tutorPath} from '@/routers/tutor.routes';
import {routesGenerator} from '@/utils/routesGenerator';
import {userRole} from '@/utils/role';
import MainLayout from '@/components/layout/shell/MainLayout';
import DashboardLayout from '@/components/layout/shell/DashboardLayout';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import Home from '@/pages/Home';
import NotFound from '@/pages/errors/NotFound';
import Tuitions from '@/pages/tuitions/Tuitions';
import PrivetRoute from '@/routers/PrivateRoute';
import BookDemoClass from '@/pages/book-demo-class/BookDemoClass';
import TuitionDetailsPage from '@/pages/tuitions/TuitionDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {index: true, element: <Home />},
      {path: 'demo-class', element: <BookDemoClass />},
      {path: 'tuitions', element: <Tuitions />},
      {path: 'tuitions/:id', element: <TuitionDetailsPage />},
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
        <DashboardLayout />
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
