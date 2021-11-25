import { Film } from '../../types/film';

type FilmOverviewProps = {
  film: Film | null;
}

function FilmOverview({film}: FilmOverviewProps):JSX.Element {
  const exit = '';
  if(film === null) {
    return <div>{exit}</div>;
  } else {
    const { director, actors, overview } = film;
    const { description, rating, votes } = overview;
    const defineFilmRating = (rate: number) => {
      switch (true) {
        case ( rate >= 0 && rate < 3):
          return 'Bad';
        case  (rate >= 3 && rate < 5):
          return 'Normal';
        case  (rate >= 5 && rate < 8):
          return 'Good';
        case  (rate >= 8 && rate < 10):
          return 'Very good';
        case  (rate === 10 ):
          return 'Awesome';
      }
    };

    return (
      <>
        <div className="film-rating">
          <div className="film-rating__score">{rating}</div>
          <p className="film-rating__meta">
            <span className="film-rating__level">{defineFilmRating(rating)}</span>
            <span className="film-rating__count">{votes} ratings</span>
          </p>
        </div>

        <div className="film-card__text">
          <p style={{whiteSpace: 'pre-line'}}>{description}</p>

          <p className="film-card__director"><strong>Director: {director}</strong></p>

          <p className="film-card__starring"><strong>Starring: {actors.join(', ')} and other</strong></p>
        </div>
      </>
    );}
}

export default FilmOverview;
