import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import {State} from '../types/state';
import {
  changeGenre,
  changeRenderedFilms,
  resetFilmList,
  loadFilms,
  loadFilmData,
  loadPromoFilmData,
  loadSimilarFilms,
  loadMyListFilms,
  loadComments,
  addComment,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  updateFilmsData,
  updateUserData
} from '../store/action';

export enum ActionType {
  ChangeGenre = 'main/changeGenre',
  ChangeRenderedFilms = 'main/changeRenderedFilms',
  ResetFilmList = 'main/ResetFilmList',
  LoadFilms = 'data/loadFilms',
  LoadFilmData = 'data/loadFilmData',
  LoadPromoFilmData = 'data/loadPromoFilmData',
  LoadSimilarFilms = 'data/loadSimilarFilms',
  LoadMyListFilms = 'data/loadMyListFilms',
  LoadComments = 'data/loadComments',
  AddComment = 'data/addComment',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute',
  UpdateFilmsData = 'data/updateFilmsData',
  UpdateUserData = 'user/updateUserData'
}

export type Actions =
 | ReturnType<typeof changeGenre>
 | ReturnType<typeof changeRenderedFilms>
 | ReturnType<typeof resetFilmList>
 | ReturnType<typeof loadFilms>
 | ReturnType<typeof loadFilmData>
 | ReturnType<typeof loadPromoFilmData>
 | ReturnType<typeof loadSimilarFilms>
 | ReturnType<typeof loadMyListFilms>
 | ReturnType<typeof loadComments>
 | ReturnType<typeof addComment>
 | ReturnType<typeof requireAuthorization>
 | ReturnType<typeof requireLogout>
 | ReturnType<typeof redirectToRoute>
 | ReturnType<typeof updateFilmsData>
 | ReturnType<typeof updateUserData>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

