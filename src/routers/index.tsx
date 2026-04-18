import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from '@/components/layout';
import AppLayout from '@/components/layout/dashboard/DashboardLayout';
import SignIn from '@/pages/Auth/SignIn';
import SignUp from '@/pages/Auth/SignUp';
import DashboardHome from '@/pages/Dashboard/Home';
import Home from '@/pages/Home';
import NotFound from '@/pages/Errors/NotFound';
import Tuition from '@/pages/Tuition';
import UserProfiles from '@/pages/Dashboard/Profile';
import PrivetRoute from './PrivateRoute';
import CurrentStatus from '@/pages/Dashboard/history/CurrentStatus';

const historyChildren = [
  {index: true, element: <CurrentStatus />},
  {path: 'applied', element: <h1>Applied Jobs</h1>},
  {path: 'shortlisted', element: <h1>Tuition Opportunities</h1>},
  {path: 'appointed', element: <h1>Tuition Opportunities</h1>},
  {path: 'confirmed', element: <h1>Tuition Opportunities</h1>},
  {path: 'payment', element: <h1>Tuition Opportunities</h1>},
  {path: 'due', element: <h1>Tuition Opportunities</h1>},
  {path: 'refund', element: <h1>Tuition Opportunities</h1>},
  {path: 'canceled', element: <h1>Tuition Opportunities</h1>},
];

const dashboardChildren = [
  {index: true, element: <DashboardHome />},
  {path: 'profile', element: <UserProfiles />},
  {path: 'job-board', element: <h1>Tuition Jobs</h1>},
  {path: 'history', children: historyChildren},
  {path: 'verification', element: <h1>Tuition Jobs</h1>},
  {path: 'settings', element: <h1>Tuition Jobs</h1>},
];

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
      <PrivetRoute>
        <AppLayout />
      </PrivetRoute>
    ),
    children: dashboardChildren,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
