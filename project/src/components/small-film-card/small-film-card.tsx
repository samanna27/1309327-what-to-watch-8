import { Film } from '../../types/film';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import { useState } from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {loadFilmData} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import {store} from '../../index';
import {fetchFilmDataAction, fetchSimilarFilmsAction, fetchCommentsAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';

type SmallFilmCardProps = {
  film: Film;
}

(store.dispatch as ThunkAppDispatch)(fetchFilmDataAction());
(store.dispatch as ThunkAppDispatch)(fetchSimilarFilmsAction());
(store.dispatch as ThunkAppDispatch)(fetchCommentsAction());

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
type ConnectedComponentProps = PropsFromRedux & SmallFilmCardProps;

function SmallFilmCard({film, onSmallFilmCardClick}: ConnectedComponentProps):JSX.Element {
  const { id, title } = film;
  const [isPlaying, setIsPlaying] = useState(true);
  return (
    <article className="small-film-card catalog__films-card">
      <VideoPlayer
        isPlaying={isPlaying}
        film={film}
        onFilmCardFocus={() => setIsPlaying(isPlaying)}
        onFilmCardBlur={() => setIsPlaying(!isPlaying)}
      />
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link" onClick={()=>(onSmallFilmCardClick(film))}>{title}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
