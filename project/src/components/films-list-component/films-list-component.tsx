import SmallFilmCard from '../small-film-card/small-film-card';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';

const mapStateToProps = ({ films, renderedFilms}: State) => ({
  films,
  renderedFilms,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function FilmsListComponent({films, renderedFilms}: ConnectedComponentProps): JSX.Element {

  return (
    <div className="catalog__films-list">
      {
        films.slice(0, Math.min(films.length, renderedFilms)).map((film) => (
          <SmallFilmCard key={film.id} film={film} />
        ))
      }
    </div>
  );
}

export {FilmsListComponent};
export default connector(FilmsListComponent);
