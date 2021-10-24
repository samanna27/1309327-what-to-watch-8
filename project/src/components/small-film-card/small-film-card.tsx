import { Film } from '../../types/film';

type SmallFilmCardtProps = {
  film: Film;
}

function SmallFilmCard({film}: SmallFilmCardtProps):JSX.Element {
  const { poster, title } = film;
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={poster} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{title}</a>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
