import { useState } from 'react';
import { RATING_STARS, REVIEW_MAX_LENGTH, REVIEW_MIN_LENGTH } from '../../const';
import Star from '../star/star';

const ReviewForm = () => {
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {
            Array.from({length: RATING_STARS}, (_, i) => i + 1)
              .reverse()
              .map((el) => <Star key={el} star={el} setRating={setRating} />)
          }
        </div>
      </div>

      <div className="add-review__text" style={{backgroundColor: '#f9f9f9'}}>
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={value.length < REVIEW_MIN_LENGTH || value.length > REVIEW_MAX_LENGTH || !rating}
          >
            Post
          </button>
        </div>

      </div>
    </form>
  );
};

export default ReviewForm;
