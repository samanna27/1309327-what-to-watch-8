import { Film } from '../../types/film';
import {useState} from 'react';
import { Link } from 'react-router-dom';


type TabsProps = {
  film: Film;
}

function Tabs({film}: TabsProps):JSX.Element {
  const [isVisibleFilmOverview, setVisibleFilmOverview] = useState(false);
  const [isVisibleFilmDetails, setVisibleFilmDetails] = useState(false);
  const [isVisibleFilmReviews, setVisibleFilmReviews] = useState(false);

  const { id, genre, releaseDate, director, actors, duration, overview, reviews } = film;
  const { description } = overview;
  const reviewsList = reviews;

  const addingFilmOverview = function () {
    setVisibleFilmDetails((prevState) => false);
    setVisibleFilmReviews((prevState) => false);
    // document.querySelectorAll('.film-nav__item')[0].classList.add('film-nav__item--active');
    // document.querySelectorAll('.film-nav__item')[1].classList.remove('film-nav__item--active');
    // document.querySelectorAll('.film-nav__item')[2].classList.remove('film-nav__item--active');

    return (
      <>
        <div className="film-rating">
          <div className="film-rating__score">8,9</div>
          <p className="film-rating__meta">
            <span className="film-rating__level">Very good</span>
            <span className="film-rating__count">240 ratings</span>
          </p>
        </div>

        <div className="film-card__text">
          <p style={{whiteSpace: 'pre-line'}}>{description}</p>

          <p className="film-card__director"><strong>Director: {director}</strong></p>

          <p className="film-card__starring"><strong>Starring: {actors} and other</strong></p>
        </div>
      </>
    );
  };

  const addingFilmDetails = function () {
    setVisibleFilmOverview((prevState) => false);
    setVisibleFilmReviews((prevState) => false);
    // document.querySelectorAll('.film-nav__item')[1].classList.add('film-nav__item--active');
    // document.querySelectorAll('.film-nav__item')[0].classList.remove('film-nav__item--active');
    // document.querySelectorAll('.film-nav__item')[2].classList.remove('film-nav__item--active');


    return (
      <div className="film-card__text film-card__row">
        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Director</strong>
            <span className="film-card__details-value">{director}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Starring</strong>
            <span className="film-card__details-value">
              {actors}
            </span>
          </p>
        </div>

        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Run Time</strong>
            <span className="film-card__details-value">{duration}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Genre</strong>
            <span className="film-card__details-value">{genre}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Released</strong>
            <span className="film-card__details-value">{releaseDate}</span>
          </p>
        </div>
      </div>
    );
  };

  const addingFilmReviews = function () {
    setVisibleFilmOverview((prevState) => false);
    setVisibleFilmDetails((prevState) => false);
    // document.querySelectorAll('.film-nav__item')[1].classList.add('film-nav__item--active');
    // document.querySelectorAll('.film-nav__item')[0].classList.remove('film-nav__item--active');
    // document.querySelectorAll('.film-nav__item')[2].classList.remove('film-nav__item--active');


    return (
      <div className="film-card__reviews film-card__row">
        <div className="film-card__reviews-col">
          {reviewsList.map((review) => (
            <div key={film.id} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.text}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.userName}</cite>
                  <time className="review__date" dateTime={review.reviewDate}>{review.reviewDate}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rate}</div>
            </div>))}
        </div>
      </div>
    );
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className="film-nav__item">
            <Link to={`/films/${id}`} className="film-nav__link" onClick={() => setVisibleFilmOverview((prevState) => prevState)}>Overview</Link>
          </li>
          <li className="film-nav__item">
            <Link to={`/films/${id}`} className="film-nav__link" onClick={() => setVisibleFilmDetails((prevState) => !prevState)}>Details</Link>
          </li>
          <li className="film-nav__item">
            <Link to={`/films/${id}`} className="film-nav__link" onClick={() => setVisibleFilmReviews((prevState) => !prevState)}>Reviews</Link>
          </li>
        </ul>
      </nav>

      {isVisibleFilmOverview? addingFilmOverview(): null}
      {isVisibleFilmDetails? addingFilmDetails(): null}
      {isVisibleFilmReviews? addingFilmReviews(): null}

    </div>
  );
}

export default Tabs;
