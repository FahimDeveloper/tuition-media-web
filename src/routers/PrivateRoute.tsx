import type {ReactNode} from 'react';
import {useAppSelector} from '../hooks/useAppHooks';
import {Navigate} from 'react-router-dom';

const PrivetRoute = ({children}: {children: ReactNode}) => {
  const {user, accessToken} = useAppSelector((state) => state.auth);
  if (!user && !accessToken) {
    return <Navigate to="/" replace={true} />;
  } else {
    return children;
  }
};

export default PrivetRoute;
