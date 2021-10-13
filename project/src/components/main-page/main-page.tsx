import React from 'react';
import SmallFilmCard from '../small-film-card/small-film-card';

let i=1;
const FILM_CARD_COUNT = new Array(20).fill('').map((index) => {
  index=i;
  i++;

  return index;
});

type MainPageProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmDate: number;
}

function MainPage({promoFilmTitle, promoFilmGenre, promoFilmDate}: MainPageProps): JSX.Element {
  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <button className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </button>
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <button className="user-block__link">Sign out</button>
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

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <button className="catalog__genres-link">All genres</button>
            </li>
            <li className="catalog__genres-item">
              <button className="catalog__genres-link">Comedies</button>
            </li>
            <li className="catalog__genres-item">
              <button className="catalog__genres-link">Crime</button>
            </li>
            <li className="catalog__genres-item">
              <button className="catalog__genres-link">Documentary</button>
            </li>
            <li className="catalog__genres-item">
              <button className="catalog__genres-link">Dramas</button>
            </li>
            <li className="catalog__genres-item">
              <button className="catalog__genres-link">Horror</button>
            </li>
            <li className="catalog__genres-item">
              <button className="catalog__genres-link">Kids & Family</button>
            </li>
            <li className="catalog__genres-item">
              <button className="catalog__genres-link">Romance</button>
            </li>
            <li className="catalog__genres-item">
              <button className="catalog__genres-link">Sci-Fi</button>
            </li>
            <li className="catalog__genres-item">
              <button className="catalog__genres-link">Thrillers</button>
            </li>
          </ul>

          <div className="catalog__films-list">
            {
              FILM_CARD_COUNT.map((index) => (
                <SmallFilmCard key={index}/>
              ))
            }
          </div>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
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

export default MainPage;
