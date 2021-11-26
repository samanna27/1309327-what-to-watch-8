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
import LoadingScreen from '../loading-screen/loading-screen';
import {State} from '../../types/state';
import browserHistory from '../../browser-history';
import AddReviewScreen from '../add-review-screen/add-review-screen';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const mapStateToProps = ({authorizationStatus, isDataLoaded, films, currentId, comment}: State) => ({
  authorizationStatus,
  isDataLoaded,
  films,
  currentId,
  comment,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function App(props: ConnectedComponentProps): JSX.Element {
  const { films, authorizationStatus, isDataLoaded, currentId} = props;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignInScreen />
        </Route>
        <PrivateRoute exact path={AppRoute.MyList} render={()=>
          <MyListScreen films={films}/>}
        >
        </PrivateRoute>
        <PrivateRoute exact path={AppRoute.AddReview} render={() => {
          const commentedFilm = films.find((film) => film.id === currentId);
          if(commentedFilm) {
            return <AddReviewScreen film={commentedFilm}/>;
          } else {
            return <AddReviewScreen film={null}/>;
          }
        }}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Player} render={(params)=>{
          const filmId = parseInt(params.match.params.id, 10);
          const filmToPlay = films.find((film) => film.id === filmId);
          if(filmToPlay) {
            return <PlayerScreen film={filmToPlay} />;
          } else {
            return <PlayerScreen film={null}/>;
          }
        }}
        >
        </Route>
        <Route exact path={AppRoute.Film} render={(params) => {
          const filmId = parseInt(params.match.params.id, 10);
          const matchedFilm = films.find((film) => film.id === filmId);
          if ( matchedFilm ) {
            return <FilmScreen film={matchedFilm}/>;
          } else {
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
