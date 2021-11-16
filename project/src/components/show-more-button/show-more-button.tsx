import { Film } from '../../types/film';
import { FILM_CARD_COUNT_PER_STEP } from '../../const';
import FilmsListComponent from '../films-list-component/films-list-component';
import {bindActionCreators, Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {loadFilmData} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';

type ShowMoreButtonProps = {
  renderedFilms: number;
  filmCount: number;
  filmList: Film[];
}

const mapStateToProps = ({film, similarFilms, comments, onSmallFilmCardClick }: State) => ({
  film,
  similarFilms,
  comments,
  onSmallFilmCardClick,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onSmallFilmCardClick: loadFilmData,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & ShowMoreButtonProps;

function ShowMoreButton({renderedFilms, filmCount, filmList, film, similarFilms, comments, onSmallFilmCardClick}:  ConnectedComponentProps):JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => {renderedFilms < filmCount ? renderedFilms += FILM_CARD_COUNT_PER_STEP: renderedFilms=filmCount;}}>Show more</button>
      <FilmsListComponent films={filmList.slice(0, renderedFilms)} film={film} similarFilms={similarFilms} comments={comments} onSmallFilmCardClick={onSmallFilmCardClick} />
    </div>
  );
}

export default ShowMoreButton;
