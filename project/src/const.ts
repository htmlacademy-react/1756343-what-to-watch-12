export const AppRoutes = {
  Main: '/',
  Login: '/login',
  MyList: '/mylist',
  Film: '/films/:id',
  Review: '/films/:id/review',
  Player: '/player/:id',
  NotFound: '*',
} as const;

export const RATING_STARS = 10;
export const REVIEW_MIN_LENGTH = 50;
export const REVIEW_MAX_LENGTH = 400;
export const NUMBER_OF_MOVIES_ON_HOMEPAGE = 8;
export const NUMBER_OF_SIMILAR_MOVIES = 4;

export const FILM_NAV = ['Overview', 'Details', 'Reviews'];

export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
