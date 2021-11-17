import { Film } from '../../types/film';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import { useState } from 'react';

type SmallFilmCardProps = {
  film: Film;
}

function SmallFilmCard({film}: SmallFilmCardProps):JSX.Element {
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

export default SmallFilmCard;
