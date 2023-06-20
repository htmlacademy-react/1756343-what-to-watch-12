import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type CardProp = {
  image: string;
  title: string;
  id: number;
  video: string;
};

const Card = ({image, title, id, video}: CardProp) => {
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout>>();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 1000);
      setTimerId(timer);
    } else {
      if (timerId) {
        clearTimeout(timerId);
      }
      if (videoRef.current) {
        videoRef.current.load();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, active]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => navigate(`/films/${id}`)}
    >
      <div className="small-film-card__image">
        <video
          ref={videoRef}
          className="player__video"
          poster={image}
          muted
          loop
          src={video}
        >
        </video>
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">{title}</Link>
      </h3>
    </article>
  );
};

export default Card;
