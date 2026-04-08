import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from '@/components/layout';
import AppLayout from '@/components/layout/dashboard/DashboardLayout';
import SignIn from '@/pages/Dashboard/Auth/SignIn';
import SignUp from '@/pages/Dashboard/Auth/SignUp';
import Blank from '@/pages/Dashboard/Blank';
import Calendar from '@/pages/Dashboard/Calendar';
import BarChart from '@/pages/Dashboard/Charts/BarChart';
import LineChart from '@/pages/Dashboard/Charts/LineChart';
import DashboardHome from '@/pages/Dashboard/Home';
import FormElements from '@/pages/Dashboard/Forms/FormElements';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import NotFound from '@/pages/OtherPage/NotFound';
import Signup from '@/pages/Signup/Signup';
import BasicTables from '@/pages/Dashboard/Tables/BasicTables';
import Tuition from '@/pages/Tuition/Tuition';
import Alerts from '@/pages/Dashboard/UiElements/Alerts';
import Avatars from '@/pages/Dashboard/UiElements/Avatars';
import Badges from '@/pages/Dashboard/UiElements/Badges';
import Buttons from '@/pages/Dashboard/UiElements/Buttons';
import Images from '@/pages/Dashboard/UiElements/Images';
import Videos from '@/pages/Dashboard/UiElements/Videos';
import UserProfiles from '@/pages/Dashboard/Profile';
import PrivetRoute from './PrivateRoute';

const dashboardChildren = [
  {index: true, element: <DashboardHome />},
  {path: 'profile', element: <UserProfiles />},
  {path: 'calendar', element: <Calendar />},
  {path: 'blank', element: <Blank />},
  {path: 'form-elements', element: <FormElements />},
  {path: 'basic-tables', element: <BasicTables />},
  {path: 'alerts', element: <Alerts />},
  {path: 'avatars', element: <Avatars />},
  {path: 'badge', element: <Badges />},
  {path: 'buttons', element: <Buttons />},
  {path: 'images', element: <Images />},
  {path: 'videos', element: <Videos />},
  {path: 'line-chart', element: <LineChart />},
  {path: 'bar-chart', element: <BarChart />},
  {path: 'error-404', element: <NotFound />},
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {index: true, element: <Home />},
      {path: 'login', element: <Login />},
      {path: 'signup', element: <Signup />},
      {path: 'tuition', element: <Tuition />},
    ],
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
    path: '/dashboard/signin',
    element: <SignIn />,
  },
  {
    path: '/dashboard/signup',
    element: <SignUp />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
