import {connect, ConnectedProps} from 'react-redux';
import React from 'react';
import Logo from '../logo/logo';
import GenresList from '../genres-list/genres-list';
import SmallFilmCard from '../small-film-card/small-film-card';
import ShowMoreButton from '../show-more-button/show-more-button';
import {State} from '../../types/state';
import LoginLogout from '../login-logout/login-logout';
import MyListButton from '../my-list-button/my-list-button';
import PlayButton from '../play-button/play-button';

const mapStateToProps = ({promoFilm, films, genre, renderedFilms, currentId, currentFilm}: State) => ({
  promoFilm,
  films,
  genre,
  renderedFilms,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function MainPage(props: ConnectedComponentProps): JSX.Element {
  const {promoFilm, films, renderedFilms, genre}=props;
  let filmsLength = 0;

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={promoFilm === null ? '' : promoFilm.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <LoginLogout />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm === null ? '' : promoFilm.poster} alt={promoFilm === null ? '' : `${promoFilm.title} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm === null ? '' : promoFilm.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm === null ? '' : promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm === null ? '' : promoFilm.releaseDate}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton film={promoFilm}/>
                <MyListButton film={promoFilm}/>
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
          <Logo />

          <div className="copyright">
            <p>?? 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export {MainPage};
export default connector(MainPage);
