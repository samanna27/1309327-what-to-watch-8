import { Film } from '../../types/film';
import { FILM_CARD_COUNT_PER_STEP } from '../../const';
import FilmsListComponent from '../films-list-component/films-list-component';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {bindActionCreators, Dispatch} from 'redux';
import {changeRenderedFilms} from '../../store/action';
import {Actions} from '../../types/action';

type ShowMoreButtonProps = {
  filmCount: number;
  filmList: Film[];
}

const mapStateToProps = ({renderedFilms}: State) => ({
  renderedFilms,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onShowMoreButtonClick: changeRenderedFilms,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & ShowMoreButtonProps;

function ShowMoreButton({renderedFilms, filmCount, filmList, onShowMoreButtonClick}:  ConnectedComponentProps):JSX.Element {
  const addMoreFilms = (movies: Film[]) => {
    if(renderedFilms < filmCount) {
      renderedFilms += FILM_CARD_COUNT_PER_STEP;
    } else {
      renderedFilms=filmCount;}
    <FilmsListComponent films={filmList.slice(0, renderedFilms)} />;
  };
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => {
        addMoreFilms(filmList);
        onShowMoreButtonClick(renderedFilms);
      }}
      >Show more
      </button>
    </div>
  );
}

export {ShowMoreButton};
export default connector(ShowMoreButton);
