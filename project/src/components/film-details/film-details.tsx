import { Film } from '../../types/film';

type FilmDetailsProps = {
  film: Film | null;
}

const transferMinutesToDurationString = (minutes: number) => {
  const hours = minutes / 60;
  const min = minutes % 60;

  return `${hours.toFixed(0)}h ${min}m`;
};

function FilmDetails({film}: FilmDetailsProps):JSX.Element {
  const exit = '';

  if(film === null) {
    return <div>{exit}</div>;
  } else {
    const { genre, releaseDate, director, actors, duration } = film;

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
              {actors.join(', ')}
            </span>
          </p>
        </div>

        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Run Time</strong>
            <span className="film-card__details-value">{transferMinutesToDurationString(+duration)}</span>
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
  }
}

export default FilmDetails;
