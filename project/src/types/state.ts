import { Film, FilmReview } from './film';
import { AuthInfo } from './auth-data';
import {AuthorizationStatus} from '../const';

export type State = {
  genre: string,
  films: Film[],
  myListFilms: Film[] | null,
  currentFilm: Film | null,
  promoFilm: Film | null,
  currentId: number| null,
  similarFilms: Film[] | null,
  comments: FilmReview[],
  comment: FilmReview | null,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  renderedFilms: number,
  authInfo: AuthInfo | null,
  commentSubmitStatus: string,
};
