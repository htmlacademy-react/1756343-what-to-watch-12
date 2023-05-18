import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../const';
import Film from '../../pages/film/film';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import MyList from '../../pages/mylist/mylist';
import Page404 from '../../pages/page-404/page-404';
import Player from '../../pages/player/player';
import Review from '../../pages/review/review';
import { FilmData } from '../../types/film';
import PrivateRoute from '../private-route/private-route';

type AppProp = {
  filmData: FilmData;
}

const App = ({filmData}: AppProp) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.Main}>
        <Route index element={<Main filmData={filmData} />} />
        <Route path={AppRoutes.Login} element={<Login />} />
        <Route
          path={AppRoutes.MyList}
          element={
            <PrivateRoute isAuth={false}>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Film} element={<Film />} />
        <Route path={AppRoutes.Review} element={<Review />} />
        <Route path={AppRoutes.Player} element={<Player />} />
      </Route>
      <Route path={AppRoutes.NotFound} element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
