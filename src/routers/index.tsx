import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from '../components/layout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Tuition from '../pages/Tuition/Tuition';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/tuition',
        element: <Tuition />,
      },
      {path: '*', element: <div>404</div>},
    ],
  },
]);

export default router;
