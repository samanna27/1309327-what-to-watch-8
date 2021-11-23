import Logo from '../logo/logo';
import SvgLogo from '../svg-logo/svg-logo';
import LoginLogout from '../login-logout/login-logout';
import {connect, ConnectedProps} from 'react-redux';
import React from 'react';
import {State} from '../../types/state';

const mapStateToProps = ({films}: State) => ({
  films,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function MyListScreen({films}: ConnectedComponentProps):JSX.Element {

  return (
    <>
      <SvgLogo />

      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo />

          <h1 className="page-title user-page__title">My list</h1>

          <LoginLogout />
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__films-list">

            {films.filter((film) => (film.addedToWatchList === true)).map((film) => (
              <article key={film.id} className="small-film-card catalog__films-card">
                <div className="small-film-card__image">
                  <img src={film.previewImage} alt={film.title} width="280" height="175" />
                </div>
                <h3 className="small-film-card__title">
                  <a className="small-film-card__link" href="film-page.html">{film.title}</a>
                </h3>
              </article>
            ))}

          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export {MyListScreen};
export default connector(MyListScreen);
