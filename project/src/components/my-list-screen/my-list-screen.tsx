import Logo from '../logo/logo';
import SvgLogo from '../svg-logo/svg-logo';
import LoginLogout from '../login-logout/login-logout';
import {connect, ConnectedProps} from 'react-redux';
import React from 'react';
import {State} from '../../types/state';
import SmallFilmCard from '../small-film-card/small-film-card';

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
              <SmallFilmCard key={film.id} film={film} />
            ))}

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

export {MyListScreen};
export default connector(MyListScreen);
