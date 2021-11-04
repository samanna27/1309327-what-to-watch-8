import { Film } from '../../types/film';

type FilmOverviewProps = {
  film: Film;
}

function FilmOverview({film}: FilmOverviewProps):JSX.Element {
  const { director, actors, overview } = film;
  const { description } = overview;

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
}

export default FilmOverview;
