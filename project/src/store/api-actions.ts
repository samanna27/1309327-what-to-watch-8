import {ThunkActionResult} from '../types/action';
import {loadFilms, loadFilmData, loadPromoFilmData, loadSimilarFilms, loadComments, addComment, redirectToRoute, requireAuthorization, requireLogout} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {Film, FilmReview} from '../types/film';
import {AuthData} from '../types/auth-data';
import {adaptToClient} from '../components/adaptor/adaptor';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(loadFilms(data.map(adaptToClient)));
  };

export const fetchFilmDataAction = (filmId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film>(`/films/${filmId}`);
    dispatch(loadFilmData(adaptToClient(data)));
  };

export const fetchPromoFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film>('/promo');
    dispatch(loadPromoFilmData(adaptToClient(data)));
  };

export const fetchSimilarFilmsAction = (filmId: string, currentId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(`/films/${filmId}/similar`);
    dispatch(loadSimilarFilms(data.map(adaptToClient), currentId));
  };

export const fetchCommentsAction = (filmId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<FilmReview[]>(`/comments/${filmId}`);
    dispatch(loadComments(data));
  };

export const fetchPostCommentAction = (comment: {rating: number, text: string}): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Comments, comment);
    saveToken(token);
    dispatch(addComment(comment));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(redirectToRoute(AppRoute.Main));
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
