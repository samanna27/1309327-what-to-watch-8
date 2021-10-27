import SmallFilmCard from '../small-film-card/small-film-card';
import { Film } from '../../types/film';

// let i = 1;
// const FILM_CARD_COUNT = new Array(20).fill('').map((index) => {
//   index = i;
//   i++;

//   return index;
// });

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
