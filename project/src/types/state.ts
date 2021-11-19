import { Film, FilmReview } from './film';
import {AuthorizationStatus} from '../const';

export type State = {
  genre: string,
  films: Film[],
  currentFilm: Film | null,
  similarFilms: Film[],
  comments: FilmReview[],
  comment: FilmReview,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  renderedFilms: number,
};
