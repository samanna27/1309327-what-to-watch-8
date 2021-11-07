import { Film } from '../../types/film';

type FilmReviewProps = {
  film: Film;
}

function FilmReview({film}: FilmReviewProps):JSX.Element {
  const { reviews } = film;
  const reviewsList = reviews;

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
}

export default FilmReview;
