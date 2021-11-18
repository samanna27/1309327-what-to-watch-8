import { useEffect, useRef } from 'react';
import { Film } from '../../types/film';
import {useHistory} from 'react-router-dom';
import {AppRoute} from '../../const';

type VideoPlayerProps = {
  isPlaying: boolean;
  film: Film;
  onFilmCardFocus: () => void;
  onFilmCardBlur: () => void;
}

function VideoPlayer({isPlaying, film, onFilmCardFocus, onFilmCardBlur}: VideoPlayerProps): JSX.Element {
  const { title, previewImage, previewVideoLink} = film;
  const history = useHistory();
  // const [isFocus, setIsFocus] = useState(false);
  // const [isBlur, setIsBlur] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying ) {
      videoRef.current.play();
    }
  }, [isPlaying]);

  return (
    <div className="small-film-card__image">
      <img src={previewImage} alt={title} width="280" height="175"
        onFocus={onFilmCardFocus}
        onBlur={onFilmCardBlur}
        onClick={()=>history.push(AppRoute.Film)}
      />
      <video
        src={previewVideoLink}
        ref={videoRef}
        width="280"
        controls
        muted
        poster={previewImage}
        preload="auto"
      />
    </div>
  );
}

export default VideoPlayer;
