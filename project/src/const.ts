export const AppRoutes = {
  Main: '/',
  Login: '/login',
  MyList: '/mylist',
  Film: '/films/:id',
  Review: '/films/:id/review',
  Player: '/player/:id',
  NotFound: '*',
} as const;
