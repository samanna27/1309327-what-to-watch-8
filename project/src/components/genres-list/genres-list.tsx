import { Link } from 'react-router-dom';
import {bindActionCreators, Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {changeGenre} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import { useRef, useState} from 'react';

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
  const genreTab = useRef<HTMLLIElement>(null);
  const [isActiveGenre, setIsActiveGenre] = useState('All genres');

  return (
    <ul className="catalog__genres-list">
      {['All genres',...genres].map((genre) => (
        <li key={genre}
          ref={genreTab}
          className={genre === isActiveGenre? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'}
        >
          <Link to="#" className="catalog__genres-link" onClick={(event) => {
            setIsActiveGenre(genre);
            onGenreClick(genre);
          }}
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export {GenresList};
export default connector(GenresList);
