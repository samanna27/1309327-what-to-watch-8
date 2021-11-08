import { Film } from '../../types/film';
import { FILM_CARD_COUNT_PER_STEP } from '../../const';
import FilmsListComponent from '../films-list-component/films-list-component';

type ShowMoreButtonProps = {
  renderedFilms: number;
  filmCount: number;
  filmList: Film[];
}

function ShowMoreButton({renderedFilms, filmCount, filmList}:  ShowMoreButtonProps):JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => {renderedFilms < filmCount ? renderedFilms += FILM_CARD_COUNT_PER_STEP: renderedFilms=filmCount;}}>Show more</button>
      <FilmsListComponent films={filmList.slice(0, renderedFilms)} />
    </div>
  );
}

export default ShowMoreButton;
