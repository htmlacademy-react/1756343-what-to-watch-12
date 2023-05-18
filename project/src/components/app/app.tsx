import Main from '../../pages/main/main';
import { Film } from '../../types/film';

type AppProp = {
  filmData: Film;
}

function App({filmData}: AppProp): JSX.Element {
  return <Main filmData={filmData} />;
}

export default App;
