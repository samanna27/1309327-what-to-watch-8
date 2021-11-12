export enum AppRoute {
  AddReview = '/films/:id/review',
  Film = '/films/:id',
  Main = '/',
  MyList = '/mylist',
  Player = '/player/:id',
  SignIn = '/login'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

// export const GENRES = [
//   AllGenres: 'All genres',
//   Comedies: 'Comedy',
//   Crime: 'Crime',
//   Documentary: 'Documentary',
//   Dramas: 'Drama',
//   Horror: 'Horror',
//   KidsAndFamily: 'Kids & Family',
//   Romance: 'Romance',
//   SciFi: 'Sci-Fi',
//   Thrillers: 'Thriller',
// ];

export const GENRES = [
  'All genres',
  'Comedies',
  'Crime',
  'Documentary',
  'Dramas',
  'Horror',
  'Kids & Family',
  'Romance',
  'Sci-Fi',
  'Thrillers',
];

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
}

export const FILM_CARD_COUNT_PER_STEP = 8;
