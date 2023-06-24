import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RATING_STARS, REVIEW_MAX_LENGTH, REVIEW_MIN_LENGTH, STATUS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { reviewsSelector } from '../../store/selectors';
import { changeStatus, sendReview } from '../../store/slice-reviews';
import Star from '../star/star';

const ReviewForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {status} = useAppSelector(reviewsSelector);
  const {id = ''} = useParams();
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmitComment = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendReview({
      comment: value,
      rating: rating || 1,
      hotelId: id,
    }));
  };

  useEffect(() => {
    if (status === STATUS.Success) {
      setValue('');
      setRating(0);
      navigate(`/films/${id}`);
      dispatch(changeStatus());
    }
  }, [status, id, navigate, dispatch]);

  return (
    <form action="#" className="add-review__form" onSubmit={(e) => handleSubmitComment(e)}>
      <div className="rating">
        <div className="rating__stars">
          {
            Array.from({length: RATING_STARS}, (_, i) => i + 1)
              .reverse()
              .map((el) => (
                <Star
                  key={el}
                  star={el}
                  setRating={setRating}
                  disabled={status === STATUS.Loading}
                />))
          }
        </div>
      </div>
      {status === STATUS.Error && <p>Something went wrong, try again</p>}
      <div className="add-review__text" style={{backgroundColor: '#f9f9f9'}}>
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status === STATUS.Loading}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={value.length < REVIEW_MIN_LENGTH || value.length > REVIEW_MAX_LENGTH || !rating || status === STATUS.Loading}
          >
            Post
          </button>
        </div>

      </div>
    </form>
  );
};

export default ReviewForm;
