import { formatDate, getFullMonthAndYear } from '../../helpers/format-date';
import { useAppSelector } from '../../hooks/use-redux';
import { reviewsSelector } from '../../store/selectors';

const Reviews = () => {
  const {reviews} = useAppSelector(reviewsSelector);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review, i) => ( i < 3 && (
          <div className="review" key={review.id}>
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime={formatDate(review.date)}>
                  {getFullMonthAndYear(review.date)}
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">{review.rating}</div>
          </div>
        )))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.map((review, i) => ( i >= 3 && (
          <div className="review" key={review.id}>
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime={formatDate(review.date)}>
                  {getFullMonthAndYear(review.date)}
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">{review.rating}</div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default Reviews;
