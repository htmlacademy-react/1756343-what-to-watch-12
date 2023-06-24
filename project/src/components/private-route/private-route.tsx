import {Navigate} from 'react-router-dom';
import { AppRoutes } from '../../const';

type PrivateRouteProp = {
  children: JSX.Element;
  isAuth: boolean;
};

const PrivateRoute = ({children, isAuth}: PrivateRouteProp) => (
  isAuth ? children : <Navigate to={AppRoutes.Login} />
);

export default PrivateRoute;
