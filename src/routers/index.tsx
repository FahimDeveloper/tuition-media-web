import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from '@/components/layout';
import AppLayout from '@/components/layout/dashboard/DashboardLayout';
import SignIn from '@/pages/Auth/SignIn';
import SignUp from '@/pages/Auth/SignUp';
import Blank from '@/pages/Dashboard/Blank';
import Calendar from '@/pages/Dashboard/Calendar';
import BarChart from '@/pages/Dashboard/Demo/Charts/BarChart';
import LineChart from '@/pages/Dashboard/Demo/Charts/LineChart';
import DashboardHome from '@/pages/Dashboard/Home';
import FormElements from '@/pages/Dashboard/Demo/Forms/FormElements';
import Home from '@/pages/Home';
import NotFound from '@/pages/Errors/NotFound';
import BasicTables from '@/pages/Dashboard/Demo/Tables/BasicTables';
import Tuition from '@/pages/Tuition';
import Alerts from '@/pages/Dashboard/Demo/UiShowcase/Alerts';
import Avatars from '@/pages/Dashboard/Demo/UiShowcase/Avatars';
import Badges from '@/pages/Dashboard/Demo/UiShowcase/Badges';
import Buttons from '@/pages/Dashboard/Demo/UiShowcase/Buttons';
import Images from '@/pages/Dashboard/Demo/UiShowcase/Images';
import Videos from '@/pages/Dashboard/Demo/UiShowcase/Videos';
import UserProfiles from '@/pages/Dashboard/Profile';
import PrivetRoute from './PrivateRoute';

const dashboardChildren = [
  {index: true, element: <DashboardHome />},
  {path: 'profile', element: <UserProfiles />},
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
    path: '/dashboard',
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
