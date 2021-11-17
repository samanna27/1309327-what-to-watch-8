import {Link} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import React from 'react';
import Logo from '../logo/logo';
import GenresList from '../genres-list/genres-list';
import SmallFilmCard from '../small-film-card/small-film-card';
import ShowMoreButton from '../show-more-button/show-more-button';
import {ThunkAppDispatch} from '../../types/action';
import {logoutAction} from '../../store/api-actions';
import {State} from '../../types/state';

type MainPageProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmDate: number;
}

const mapStateToProps = ({films, genre, renderedFilms}: State) => ({
  films,
  genre,
  renderedFilms,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  requireLogout() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainPageProps;

function MainPage(props: ConnectedComponentProps): JSX.Element {
  const {films, renderedFilms, genre, promoFilmTitle, promoFilmGenre, promoFilmDate, requireLogout}=props;
  let filmsLength = 0;

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link
                className="user-block__link"
                onClick={(evt) => {
                  evt.preventDefault();

                  requireLogout();
                }}
                to='/'
              >
                Sign out
              </Link>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilmTitle}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilmGenre}</span>
                <span className="film-card__year">{promoFilmDate}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />

          <div className="catalog__films-list">
            {genre === 'All genres' ? (
              filmsLength = films.length,
              films.slice(0, Math.min(films.length, renderedFilms)).map((film) => (
                <SmallFilmCard key={film.id} film={film} />
              ))
            ) : (
              filmsLength = films.filter((film) => film.genre === genre).length,
              films.filter((film) => film.genre === genre).slice(0, Math.min(films.length, renderedFilms)).map((film) => (
                <SmallFilmCard key={film.id} film={film} />
              ))
            )}
          </div>

          <div className="catalog__more">
            {filmsLength > renderedFilms ? <ShowMoreButton /> : '' }
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <button className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </button>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export {MainPage};
export default connector(MainPage);
