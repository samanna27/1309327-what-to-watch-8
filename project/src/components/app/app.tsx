import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainPage from '../main-page/main-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import PlayerScreen from '../player-screen/player-screen';
import FilmScreen from '../film-screen/film-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import {Film} from '../../types/film';

type AppScreenProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmDate: number;
  films: Film[];
}

function App({promoFilmTitle, promoFilmGenre, promoFilmDate, films}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage
            promoFilmTitle={promoFilmTitle} promoFilmGenre={promoFilmGenre} promoFilmDate={promoFilmDate} films={films}
          />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignInScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={()=><MyListScreen films={films}/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Player}>
          <PlayerScreen films={films}/>
        </Route>
        <Route exact path={AppRoute.Film}>
          <FilmScreen films={films}/>
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <AddReviewScreen films={films}
            onReviewInput={() => {
              throw new Error('Function \'onReviewInput\' isn\'t implemented.');
            }}
          />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
