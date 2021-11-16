import SmallFilmCard from '../small-film-card/small-film-card';
import { Film } from '../../types/film';
import {bindActionCreators, Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {loadFilmData} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';

type FilmListProps = {
  films: Film[];
}

const mapStateToProps = ({film, similarFilms, comments}: State) => ({
  film,
  similarFilms,
  comments,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onSmallFilmCardClick: loadFilmData,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FilmListProps;

function FilmsListComponent({films, similarFilms, comments, onSmallFilmCardClick}: ConnectedComponentProps): JSX.Element {

  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <SmallFilmCard key={film.id} film={film} similarFilms={similarFilms} comments={comments} onSmallFilmCardClick={onSmallFilmCardClick}/>
        ))
      }
    </div>
  );
}

export default FilmsListComponent;
