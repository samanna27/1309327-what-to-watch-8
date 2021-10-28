import SmallFilmCard from '../small-film-card/small-film-card';
import { Film } from '../../types/film';

type FilmListProps = {
  films: Film[];
}

function FilmsListComponent({films}: FilmListProps): JSX.Element {
  const filmsList=films;

  return (
    <div className="catalog__films-list">
      {
        filmsList.map((film) => (
          <SmallFilmCard key={film.id} film={film}/>
        ))
      }
    </div>
  );
}

export default FilmsListComponent;
