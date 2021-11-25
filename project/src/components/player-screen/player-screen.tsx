import { Film } from '../../types/film';
import {useEffect, useRef} from 'react';
import SvgLogo from '../svg-logo/svg-logo';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';

type PlayerScreenProps = {
  film: Film | null;
}

function PlayerScreen({film}: PlayerScreenProps):JSX.Element {
  const duration = film ? film.duration : 0;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

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

  const toggleFullscreen = function () {

    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen().catch((err) => {
        <LoadingScreen />;
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    videoRef.current ?
      setRemainingTime(+(duration) - videoRef.current?.currentTime) :
      setRemainingTime(0);
  };

  const formattingTime = function (timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 360);
    const minutes = Math.floor(timeInSeconds / 60 - hours * 60);
    const seconds = Math.floor(timeInSeconds - hours*360 - minutes * 60);
    const hourValue=`${hours<10 ? '0' : ''}${hours}`;
    const minuteValue=`${minutes<10 ? '0' : ''}${minutes}`;
    const secondValue=`${seconds<10 ? '0' : ''}${seconds}`;

    const mediaTime = `${hourValue}:${minuteValue}:${secondValue}`;
    return mediaTime;
  };

  const formattingTimeBarPercentage = function(timeInSeconds: number) {
    const percentage = Math.floor((+duration - timeInSeconds) *100 / +duration);
    return percentage;
  };


  return (
    <>
      <SvgLogo />

      <div className="player">
        {isPlaying ?
          <video
            src={film?.videoSrc}
            className="player__video"
            poster="img/player-poster.jpg"
            ref={videoRef}
            muted
            preload="auto"
            controls
            onTimeUpdate={(event)=> {
              handleTimeUpdate();
            }}
          >
          </video> :
          <video
            src="#"
            className="player__video"
            poster="img/player-poster.jpg"
            ref={videoRef}
            muted
            preload="auto"
          >
          </video>}

        <Link to={AppRoute.Main}>
          <button type="button" className="player__exit">Exit</button>
        </Link>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={formattingTimeBarPercentage(remainingTime)} max="100"></progress>
              <div className="player__toggler" style={{left: `${formattingTimeBarPercentage(remainingTime)}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{formattingTime(remainingTime)}</div>
          </div>

          <div className="player__controls-row">
            {isPlaying ?
              <button type="button" className="player__play"
                onClick={()=>{setIsPlaying(!isPlaying);}}
              >
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button> :
              <button type="button" className="player__play"
                onClick={()=>{
                  setIsPlaying(!isPlaying);
                }}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>}
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen"
              onClick={()=>toggleFullscreen()}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerScreen;
