import { Film, FilmReview } from './film';
import {AuthorizationStatus} from '../const';

export type State = {
  genre: string,
  films: Film[],
  currentFilm: Film | null,
  promoFilm: Film | null,
  currentId: number,
  similarFilms: Film[] | null,
  comments: FilmReview[],
  comment: FilmReview | null,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  renderedFilms: number,
  userEmail: string,
};
