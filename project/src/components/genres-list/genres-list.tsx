import { Link } from 'react-router-dom';
import {bindActionCreators, Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {changeGenre} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';

const mapStateToProps = ({ films}: State) => ({
  films,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onGenreClick: changeGenre,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function GenresList({films, onGenreClick}: ConnectedComponentProps):JSX.Element {
  const genres = new Set(films.map((film)=>film.genre));
  /* {document.querySelector('.catalog__genres-item')? null: document.querySelector('.catalog__genres-item').classList.add('catalog__genres-item--active')} */

  return (
    <ul className="catalog__genres-list">
      {['All genres',...genres].map((genre) => (
        <li key={genre} className="catalog__genres-item">
          <Link to="#" className="catalog__genres-link" onClick={() => {onGenreClick(genre);}}>
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export {GenresList};
export default connector(GenresList);
