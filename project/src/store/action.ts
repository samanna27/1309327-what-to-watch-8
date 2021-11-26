import {ActionType} from '../types/action';
import {Film, Genre, FilmReview} from '../types/film';
import {AuthInfo} from '../types/auth-data';
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

export const loadPromoFilmData = (promoFilm: Film) => ({
  type: ActionType.LoadPromoFilmData,
  payload: {
    promoFilm,
  },
} as const);

export const loadSimilarFilms = (similarFilms: Film[] | null, currentId: number | null) => ({
  type: ActionType.LoadSimilarFilms,
  payload: {
    similarFilms, currentId,
  },
} as const);

export const loadMyListFilms = (myListFilms: Film[] | null) => ({
  type: ActionType.LoadMyListFilms,
  payload: {
    myListFilms,
  },
} as const);

export const loadComments = (comments: FilmReview[]) => ({
  type: ActionType.LoadComments,
  payload: {
    comments,
  },
} as const);

export const addComment = (comment: FilmReview, id: number) => ({
  type: ActionType.AddComment,
  payload: {
    comment,
    id,
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

export const updateFilmsData = (film: Film) => ({
  type: ActionType.UpdateFilmsData,
  payload: film,
} as const);

export const updateUserData = (authInfo: AuthInfo) => ({
  type: ActionType.UpdateUserData,
  payload: authInfo,
} as const);

export const submitCommentProcessingStatus = (status: string) => ({
  type: ActionType.SubmitCommentProcessingStatus,
  payload: status,
} as const);
