import {ActionType} from '../types/action';
import {Film, Genre, FilmReview} from '../types/film';
import {AppRoute, AuthorizationStatus} from '../const';

export const changeGenre = (genre: Genre) => ({
  type: ActionType.ChangeGenre,
  payload: genre,
} as const);

export const changeRenderedFilms = (renderedFilms: number) => ({
  type: ActionType.ChangeRenderedFilms,
  payload: renderedFilms,
} as const);

export const resetFilmList = () => ({
  type: ActionType.ResetFilmList,
} as const);

export const loadFilms = (films: Film[]) => ({
  type: ActionType.LoadFilms,
  payload: {
    films,
  },
} as const);

export const loadFilmData = (currentFilm: Film) => ({
  type: ActionType.LoadFilmData,
  payload: {
    currentFilm,
  },
} as const);

export const loadSimilarFilms = (similarFilms: Film[]) => ({
  type: ActionType.LoadSimilarFilms,
  payload: {
    similarFilms,
  },
} as const);

export const loadComments = (comments: FilmReview[]) => ({
  type: ActionType.LoadComments,
  payload: {
    comments,
  },
} as const);

export const addComment = (comment: FilmReview) => ({
  type: ActionType.AddComment,
  payload: {
    comment,
  },
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);
