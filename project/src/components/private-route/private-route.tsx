import {Navigate} from 'react-router-dom';
import { AppRoutes } from '../../const';

type PrivateRouteProp = {
  isAuth: boolean;
  children: JSX.Element;
};

const PrivateRoute = ({isAuth, children}: PrivateRouteProp) => (
  isAuth ? children : <Navigate to={AppRoutes.Login} />
);

export default PrivateRoute;
