import { Film } from '../../types/film';
import { FILM_CARD_COUNT_PER_STEP } from '../../const';
import FilmsListComponent from '../films-list-component/films-list-component';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';

type ShowMoreButtonProps = {
  renderedFilms: number;
  filmCount: number;
  filmList: Film[];
}

const mapStateToProps = ({renderedFilms}: State) => ({
  renderedFilms,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & ShowMoreButtonProps;

function ShowMoreButton({renderedFilms, filmCount, filmList}:  ConnectedComponentProps):JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => {renderedFilms < filmCount ? renderedFilms += FILM_CARD_COUNT_PER_STEP: renderedFilms=filmCount;}}>Show more</button>
      <FilmsListComponent films={filmList.slice(0, renderedFilms)} />
    </div>
  );
}

export {ShowMoreButton};
export default connector(ShowMoreButton);
