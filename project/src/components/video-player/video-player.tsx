import { useEffect, useRef } from 'react';
import { Film } from '../../types/film';


type VideoPlayerProps = {
  isPlaying: boolean;
  film: Film;
  onFilmCardFocus: () => void;
  onFilmCardBlur: () => void;
}

function VideoPlayer({isPlaying, film, onFilmCardFocus, onFilmCardBlur}: VideoPlayerProps): JSX.Element {
  const {poster, videoSrc} = film;
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
      <img src={poster} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175"
        onFocus={onFilmCardFocus}
        onBlur={onFilmCardBlur}
      />
      <video
        src={videoSrc}
        ref={videoRef}
        width="280"
        controls
        muted
        poster={poster}
        preload="auto"
      />
    </div>
  );
}

export default VideoPlayer;
