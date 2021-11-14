import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import {State} from '../types/state';
import {
  genreChange,
  provideFilmList,
  resetFilmList,
  loadFilms,
  requireAuthorization,
  requireLogout,
  redirectToRoute
} from '../store/action';

export enum ActionType {
  GenreChange = 'main/genreChange',
  ProvideFilmList = 'main/ProvideFilmList',
  ResetFilmList = 'main/ResetFilmList',
  LoadFilms = 'data/loadFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute'
}

export type Actions =
 | ReturnType<typeof genreChange>
 | ReturnType<typeof provideFilmList>
 | ReturnType<typeof resetFilmList>
 | ReturnType<typeof loadFilms>
 | ReturnType<typeof requireAuthorization>
 | ReturnType<typeof requireLogout>
 | ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

