import { Film, FilmReview } from './film';
import {AuthorizationStatus} from '../const';

export type State = {
  genre: string,
  filmList: Film[],
  films: Film[],
  film: Film,
  similarFilms: Film[],
  comments: FilmReview[],
  comment: FilmReview,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  renderedFilms: number,
};
