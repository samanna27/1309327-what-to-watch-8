import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';
import { Film } from '../../types/film';

type PlayButtonProps = {
  film: Film | null;
 }

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PlayButtonProps;

function PlayButton(props: ConnectedComponentProps):JSX.Element {
  const {film} = props;

  return (
    <Link to={`/player/${film?.id}`} className="film-card__button">
      <button
        className="btn btn--play film-card__button"
        type="button"
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>
          Play
        </span>
      </button>
    </Link>
  );
}

export {PlayButton};
export default connector(PlayButton);
