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

export const FILM_NAV = ['Overview', 'Details', 'Reviews'];
