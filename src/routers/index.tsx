import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from '../components/layout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

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
      {path: '*', element: <div>404</div>},
    ],
  },
]);

export default router;
