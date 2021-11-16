import { Film, FilmReview } from './film';
import {AuthorizationStatus} from '../const';
import { ActionType } from './action';

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
  onSmallFilmCardClick: (film: Film) => {
    type: ActionType.LoadFilmData,
    payload: {film:Film}
  },
};
