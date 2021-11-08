import { Film } from './film';
import {AuthorizationStatus} from '../const';

export type State = {
  genre: string,
  filmList: Film[],
  films: Film[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  renderedFilms: number,
};
