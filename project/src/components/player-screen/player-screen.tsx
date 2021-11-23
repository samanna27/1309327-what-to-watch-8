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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  let timer = '';

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

  const setTime = function (duration: string) {
    const hours = Math.floor(+duration / 60);
    const minutes = Math.floor(+duration - hours * 60);
    const seconds = Math.floor(+duration - hours*360 - minutes * 60);
    let hourValue;
    let minuteValue;
    let secondValue;

    if (hours < 10) {
      hourValue = `0 + ${hours}`;
    } else {
      hourValue = hours;
    }

    if (minutes < 10) {
      minuteValue = `0 + ${minutes}`;
    } else {
      minuteValue = minutes;
    }

    if (seconds < 10) {
      secondValue = `0 + ${seconds}`;
    } else {
      secondValue = seconds;
    }

    const mediaTime = `${hourValue} + ':' + ${minuteValue} + ':' + ${secondValue}`;
    return timer = mediaTime;

  // let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
  // timerBar.style.width = barLength + 'px';
  };

  // videoRef.current?.addEventListener('timeupdate', setTime);

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
            onTimeUpdate={() => setTime(film?.duration ? film?.duration : '0')}
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
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
            </div>
            <div className="player__time-value">{film?.duration ? timer : ''}</div>
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
                onClick={()=>{setIsPlaying(!isPlaying);}}
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
