import {Link, useParams} from 'react-router-dom';
import Logo from '../logo/logo';
import SmallFilmCard from '../small-film-card/small-film-card';
import Tabs from '../tabs/tabs';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {fetchFilmDataAction, fetchSimilarFilmsAction, fetchCommentsAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import {store} from '../../index';
import {Film} from '../../types/film';
import Loader from 'react-loader-spinner';
import SvgLogo from '../svg-logo/svg-logo';
import LoginLogout from '../login-logout/login-logout';
import MyListButton from '../my-list-button/my-list-button';
import PlayerScreen from '../player-screen/player-screen';
import { AuthorizationStatus } from '../../const';

type FilmScreenProps = {
  film: Film | null,
}

type FilmScreenRouteParams = {
  id: string
}

const mapStateToProps = ({currentFilm, currentId, similarFilms, authorizationStatus}: State) => ({
  similarFilms,
  currentFilm,
  currentId,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FilmScreenProps;

function FilmScreen({ film, similarFilms, currentFilm, currentId, authorizationStatus}: ConnectedComponentProps):JSX.Element {
  const exit = '';
  const params = useParams<FilmScreenRouteParams>();
  const filmId = params.id;
  if (film === null && currentFilm === null) {
    (store.dispatch as ThunkAppDispatch)(fetchFilmDataAction(filmId));
    (store.dispatch as ThunkAppDispatch)(fetchSimilarFilmsAction(filmId, currentId));
    (store.dispatch as ThunkAppDispatch)(fetchCommentsAction(filmId));
    return (
      <Loader type="Puff"
        color="#00BFFF"
        height={500}
        width={500}
      />
    );
  }
  const { id, poster, title, bigPoster, genre, releaseDate } = film || currentFilm || {};

  if ( similarFilms && id !== currentId) {
    if (id === undefined) {
      return <div>No data</div>;
    }
    currentId = +id;
    (store.dispatch as ThunkAppDispatch)(fetchSimilarFilmsAction(filmId, currentId));
    (store.dispatch as ThunkAppDispatch)(fetchCommentsAction(filmId));
    return (
      <Loader type="Puff"
        color="#00BFFF"
        height={500}
        width={500}
      />
    );
  }

  return (
    <>
      <SvgLogo />

      <section className="film-card film-card--full" key={id}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={bigPoster} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <LoginLogout />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{releaseDate}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${film?.id}`} className="btn film-card__button">
                  <button className="btn btn--play film-card__button" type="button"
                    onClick={()=>{
                      <PlayerScreen film={film} />;
                    }}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                </Link>
                <MyListButton film={film}/>

                { authorizationStatus === AuthorizationStatus.Auth ?
                  <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link> :
                  ''}

              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={poster} alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <Tabs film={film} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {similarFilms === null ?
              <div>{exit}</div> :
              similarFilms.slice(0,4).map((item) => <SmallFilmCard key={item.id} film={item}/>)}
          </div>
        </section>

        <footer className="page-footer">
          <Logo />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export {FilmScreen};
export default connector(FilmScreen);
