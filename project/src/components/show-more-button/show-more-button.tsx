import { FILM_CARD_COUNT_PER_STEP } from '../../const';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {bindActionCreators, Dispatch} from 'redux';
import {changeRenderedFilms} from '../../store/action';
import {Actions} from '../../types/action';

const mapStateToProps = ({renderedFilms}: State) => ({
  renderedFilms,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onShowMoreButtonClick: changeRenderedFilms,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function ShowMoreButton({renderedFilms, onShowMoreButtonClick}:  ConnectedComponentProps):JSX.Element {

  return (
    <button className="catalog__button" type="button" onClick={() => {
      renderedFilms +=FILM_CARD_COUNT_PER_STEP;
      onShowMoreButtonClick(renderedFilms);
    }}
    >Show more
    </button>
  );
}

export {ShowMoreButton};
export default connector(ShowMoreButton);
