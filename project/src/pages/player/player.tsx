import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import { AppRoutes } from '../../const';
import { getDuration } from '../../helpers/get-duration';
import { useAppSelector } from '../../hooks/use-redux';
import { filmsSelector } from '../../store/selectors';

const Player = () => {
  const {id} = useParams();
  const {data} = useAppSelector(filmsSelector);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlay, setIsPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressPercents, setProgressPercents] = useState(0);
  const [loading, setLoading] = useState(true);

  const film = data.find((f) => f.id === Number(id));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
    if (id) {
      navigate(`/films/${id}`);
    } else {
      navigate(AppRoutes.Main);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = Math.round(videoRef.current.duration - videoRef.current.currentTime);
      const timeInPercents = 100 - Math.trunc((time / videoRef.current.duration) * 100);
      setProgress(time);
      setProgressPercents(timeInPercents);
      if (timeInPercents === 100) {
        setIsPlay(false);
      }
    }
  };

  return (
    <div className="player">
      {loading ?
        <Loader /> : (
          <>
            <video
              ref={videoRef}
              src={film?.videoLink}
              className="player__video"
              poster={film?.backgroundImage}
              onTimeUpdate={handleTimeUpdate}
              autoPlay
              muted
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
                  {isPlay ? (
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                  ) : (
                    <svg width="14px" height="21px" viewBox="0 0 14 21" version="1.1">
                      <title>Artboard</title>
                      <desc>Created with Sketch.</desc>
                      <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"></polygon>
                        <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"></polygon>
                      </g>
                    </svg>
                  )}
                  <span>{isPlay ? 'Play' : 'Pause'}</span>
                </button>
                <div className="player__name">{film?.name}</div>

                <button type="button" className="player__full-screen" onClick={handleFullScreen}>
                  <svg viewBox="0 0 27 27" width="27" height="27">
                    <use xlinkHref="#full-screen"></use>
                  </svg>
                  <span>Full screen</span>
                </button>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default Player;
