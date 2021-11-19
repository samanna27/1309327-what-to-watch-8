import {connect, ConnectedProps} from 'react-redux';
import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import MainPage from '../main-page/main-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import PlayerScreen from '../player-screen/player-screen';
import FilmScreen from '../film-screen/film-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import {Film} from '../../types/film';
import LoadingScreen from '../loading-screen/loading-screen';
import {State} from '../../types/state';
import browserHistory from '../../browser-history';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const mapStateToProps = ({authorizationStatus, isDataLoaded, films}: State) => ({
  authorizationStatus,
  isDataLoaded,
  films,
});

const connector = connect(mapStateToProps);

type AppScreenProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmDate: number;
  films: Film[];
}
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppScreenProps;

function App(props: ConnectedComponentProps): JSX.Element {
  const {promoFilmTitle, promoFilmGenre, promoFilmDate, films, authorizationStatus, isDataLoaded} = props;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage
            promoFilmTitle={promoFilmTitle} promoFilmGenre={promoFilmGenre} promoFilmDate={promoFilmDate}
          />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignInScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={()=><MyListScreen films={films}/>}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Player}>
          <PlayerScreen films={films}/>
        </Route>
        <Route exact path={AppRoute.Film} render={(params) => {
          const filmId = parseInt(params.match.params.id, 10);
          const matchedFilm = films.find((film) => film.id === filmId);
          if (matchedFilm) {
            return <FilmScreen film={matchedFilm}/>;
          } else {
            // eslint-disable-next-line
            console.log(123);
            return <FilmScreen film={null}/>;
          }
        }}
        >
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
