import { RATING } from '../const';

export const setRating = (rating: number|undefined): string|undefined => {
  if (rating) {
    if (rating <= 3) {return RATING.Bad;}
    if (rating <= 5) {return RATING.Normal;}
    if (rating <= 8) {return RATING.Good;}
    if (rating <= 10) {return RATING.VeryGood;}
    return RATING.Awesome;
  }
};
