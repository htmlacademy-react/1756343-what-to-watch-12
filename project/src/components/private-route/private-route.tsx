import {Navigate} from 'react-router-dom';
import { AppRoutes } from '../../const';
import { useAppSelector } from '../../hooks/use-redux';
import { authSelector } from '../../store/selectors';

type PrivateRouteProp = {
  children: JSX.Element;
};

const PrivateRoute = ({children}: PrivateRouteProp) => {
  const {authorizationStatus} = useAppSelector(authSelector);
  return (
    authorizationStatus ? children : <Navigate to={AppRoutes.Login} />
  );
};

export default PrivateRoute;
