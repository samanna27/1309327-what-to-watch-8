import { Film } from '../../types/film';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import { useState } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';

type SmallFilmCardProps = {
  film: Film;
}

const mapStateToProps = ({film}: State) => ({
  film,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & SmallFilmCardProps;

function SmallFilmCard({film}: ConnectedComponentProps):JSX.Element {
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
      {/* TODO!!! задание у меня по видео-плееру приняли, но когда я навожу мышку на постер, у меня почему-то не проигрывается превью... */}
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link" >{title}</Link>
      </h3>
    </article>
  );
}

export {SmallFilmCard};
export default connector(SmallFilmCard);
