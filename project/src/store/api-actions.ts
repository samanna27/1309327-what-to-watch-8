import {ThunkActionResult} from '../types/action';
import {
  addComment,
  loadComments,
  loadFilmData,
  loadFilms,
  loadMyListFilms,
  loadPromoFilmData,
  loadSimilarFilms,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  submitCommentProcessingStatus,
  updateFilmsData,
  updateUserData
} from './action';
import {dropToken, saveToken} from '../services/token';
import {APIRoute, AppRoute, AuthorizationStatus, CommentSubmitStatus, OK_CODE} from '../const';
import {Film, FilmReview} from '../types/film';
import {AuthData, AuthInfo} from '../types/auth-data';
import {adaptAuthInfoToClient, adaptToClient} from '../components/adaptor/adaptor';
import {toast} from 'react-toastify';

const COMMENT_POST_FAIL_MESSAGE = 'Ваш комментарий не был отправлен. Попробуйте еще раз.';

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

export const fetchSimilarFilmsAction = (filmId: string, currentId: number | null): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Film[]>(`/films/${filmId}/similar`)
      .then((data) => {
        if(data.status === OK_CODE) {
          dispatch(loadSimilarFilms(data.data.map(adaptToClient), currentId));
        }
      });
  };

export const fetchMyListFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>('/favorite');
    dispatch(loadMyListFilms(data.map(adaptToClient)));
  };

export const fetchCommentsAction = (filmId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<FilmReview[]>(`/comments/${filmId}`);
    dispatch(loadComments(data));
  };

export const fetchPostCommentAction = (newComment: {rating: number, comment: string}, id: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(submitCommentProcessingStatus(CommentSubmitStatus.Submitted));
    try {
      const {rating, comment} = newComment;
      await api.post<FilmReview>(`/comments/${id}`, {rating, comment})
        .then((data) => {
          if(data.status === OK_CODE) {
            dispatch(addComment(data.data, id));
            dispatch(submitCommentProcessingStatus(CommentSubmitStatus.HappyProcessed));
          }
        });
    } catch {
      toast.info(COMMENT_POST_FAIL_MESSAGE);
      dispatch(submitCommentProcessingStatus(CommentSubmitStatus.Failed));
    }
  };

export const fetchToggleFavoriteAction = (filmId: number, status: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.post<Film>(`/favorite/${filmId}/${status}`)
      .then((data) => {
        if(data.status === OK_CODE) {
          dispatch(updateFilmsData(adaptToClient(data.data)));
        } else {
          dispatch(redirectToRoute(AppRoute.SignIn));
        }
      });
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {

    await api.get<AuthInfo>(APIRoute.Login)
      .then((data) => {
        if(data.status === OK_CODE) {
          dispatch(updateUserData(adaptAuthInfoToClient(data.data)));
          dispatch(requireAuthorization(AuthorizationStatus.Auth));
        } else {
          dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
        }
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.post<AuthInfo>(APIRoute.Login, {email, password})
      .then((response) => {
        dispatch(updateUserData(adaptAuthInfoToClient(response.data)));
        saveToken(response.data.token);
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(redirectToRoute(AppRoute.Main));
      });
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
    dispatch(redirectToRoute(AppRoute.Main));
  };
