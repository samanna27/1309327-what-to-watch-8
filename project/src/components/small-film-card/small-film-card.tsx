import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import {useState} from 'react';

type SmallFilmCardProps = {
  film: Film;
}

function SmallFilmCard({film}: SmallFilmCardProps):JSX.Element {
  const { id, title } = film;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver={() => {
        setIsPlaying(true);}}
      onMouseLeave={() => {
        setIsPlaying(false);}}
    >
      <VideoPlayer film={film} isPlaying={isPlaying} />
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className='small-film-card__link' >
          {title}
        </Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
