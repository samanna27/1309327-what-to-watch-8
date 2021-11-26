export enum AppRoute {
  AddReview = '/films/:id/review',
  Film = '/films/:id',
  Main = '/',
  MyList = '/mylist',
  Player = '/player/:id',
  SignIn = '/login',
}

export enum CommentSubmitStatus {
  NotSubmitted = 'NotSubmitted',
  Submitted = 'Submitted',
  HappyProcessed = 'HappyProcessed',
  Failed = 'Failed',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  Promo = 'GET/promo',
  Film = 'GET/films/:id',
  SimilarFilms = 'GET/films/:id/similar',
  Comments = '/comments/:filmId',
  Login = '/login',
  Logout = '/logout',
}

export const FILM_CARD_COUNT_PER_STEP = 8;

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 400;

export const PLAY_TIMEOUT = 1000;

export const OK_CODE = 200;
