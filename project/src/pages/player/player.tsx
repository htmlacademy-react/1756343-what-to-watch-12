import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDuration } from '../../helpers/get-duration';
import { useAppSelector } from '../../hooks/use-redux';
import { filmsSelector } from '../../store/selectors';

const Player = () => {
  const {id} = useParams();
  const {data} = useAppSelector(filmsSelector);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressPercents, setProgressPercents] = useState(0);

  const film = data.find((f) => f.id === Number(id));

  const handlePlayMovie = () => {
    if (videoRef.current) {
      if (!isPlay) {
        videoRef.current.play();
        setIsPlay((prev) => !prev);
      } else {
        videoRef.current.pause();
        setIsPlay((prev) => !prev);
      }
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = Math.round(videoRef.current.duration - videoRef.current.currentTime);
      const timeInPercents = 100 - Math.trunc((time / videoRef.current.duration) * 100);
      setProgress(time);
      setProgressPercents(timeInPercents);
    }
  };

  return (
    <div className="player">
      <video
        ref={videoRef}
        src={film?.videoLink}
        className="player__video"
        poster={film?.backgroundImage}
        onTimeUpdate={handleTimeUpdate}
      />

      <button type="button" className="player__exit" onClick={handleClose}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progressPercents}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getDuration(progress)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayMovie}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
