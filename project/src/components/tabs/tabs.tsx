import { Film } from '../../types/film';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReview from '../film-review/film-review';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';


type TabsProps = {
  film: Film | null;
}

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & TabsProps;

function Tabs({film, authorizationStatus}: ConnectedComponentProps):JSX.Element {

  const [isVisibleFilmOverview, setVisibleFilmOverview] = useState(true);
  const [isVisibleFilmDetails, setVisibleFilmDetails] = useState(false);
  const [isVisibleFilmReviews, setVisibleFilmReviews] = useState(false);

  const addFilmOverview = function () {
    setVisibleFilmDetails((prevState) => false);
    setVisibleFilmReviews((prevState) => false);
    document.querySelectorAll('.film-nav__item')[0].classList.add('film-nav__item--active');
    document.querySelectorAll('.film-nav__item')[1].classList.remove('film-nav__item--active');
    if (authorizationStatus === 'AUTH') {
      document.querySelectorAll('.film-nav__item')[2].classList.remove('film-nav__item--active');
    }
  };

  const addFilmDetails = function () {
    setVisibleFilmOverview((prevState) => false);
    setVisibleFilmReviews((prevState) => false);
    document.querySelectorAll('.film-nav__item')[1].classList.add('film-nav__item--active');
    document.querySelectorAll('.film-nav__item')[0].classList.remove('film-nav__item--active');
    if (authorizationStatus === 'AUTH') {
      document.querySelectorAll('.film-nav__item')[2].classList.remove('film-nav__item--active');
    }
  };

  const addFilmReview = function () {
    setVisibleFilmOverview((prevState) => false);
    setVisibleFilmDetails((prevState) => false);
    document.querySelectorAll('.film-nav__item')[2].classList.add('film-nav__item--active');
    document.querySelectorAll('.film-nav__item')[0].classList.remove('film-nav__item--active');
    document.querySelectorAll('.film-nav__item')[1].classList.remove('film-nav__item--active');
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        {film === null ?
          <ul className="film-nav__list">
            <li className="film-nav__item film-nav__item--active">
              <a href="#" className="film-nav__link">Overview</a>
            </li>
            <li className="film-nav__item">
              <a href="#" className="film-nav__link">Details</a>
            </li>
            { authorizationStatus === 'AUTH' ?
              <li className="film-nav__item">
                <a href="#" className="film-nav__link">Reviews</a>
              </li> :
              <div></div>}
          </ul> :
          <ul className="film-nav__list">
            <li className="film-nav__item film-nav__item--active">
              <Link to={`/films/${film.id}`} className="film-nav__link" onClick={() => {
                setVisibleFilmOverview((prevState) => true);
                addFilmOverview();
              }}
              >
              Overview
              </Link>
            </li>
            {}
            <li className="film-nav__item">
              <Link to={`/films/${film.id}`} className="film-nav__link" onClick={() => {
                setVisibleFilmDetails((prevState) => true);
                addFilmDetails();
              }}
              >
              Details
              </Link>
            </li>
            { authorizationStatus === 'AUTH' ?
              <li className="film-nav__item">
                <Link to={`/films/${film.id}`} className="film-nav__link" onClick={() => {
                  setVisibleFilmReviews((prevState) => true);
                  addFilmReview();
                }}
                >
                Reviews
                </Link>
              </li>:
              <div></div>}
          </ul>}
      </nav>

      {isVisibleFilmOverview && <FilmOverview film={film}  />}
      {isVisibleFilmDetails && <FilmDetails film={film} />}
      {isVisibleFilmReviews && <FilmReview />}

    </div>
  );
}

export {Tabs};
export default connector(Tabs);
