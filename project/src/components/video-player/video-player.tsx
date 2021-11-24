import {useEffect, useRef} from 'react';
import {Film} from '../../types/film';
import {useHistory} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';

type VideoPlayerProps = {
  film: Film;
  isPlaying: boolean,
}

function VideoPlayer({film, isPlaying}: VideoPlayerProps): JSX.Element {
  const {id, title, previewImage, previewVideoLink} = film;
  const history = useHistory();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      setTimeout(() => {
        if (videoRef.current !== null) {
          videoRef.current.play();
        }
      }, 1000);
    }
  }, [isPlaying]);

  return (
    <Link to={`/films/${id}`} >
      <div className="small-film-card__image">
        {!isPlaying ?
          <img src={previewImage} alt={title} width="280" height="175"
            onClick={() => history.push(AppRoute.Film)}
          />
          :
          <video
            src={previewVideoLink}
            ref={videoRef}
            width="280"
            muted
            poster={previewImage}
            preload="auto"
          />}
      </div>
    </Link>
  );
}

export default VideoPlayer;
