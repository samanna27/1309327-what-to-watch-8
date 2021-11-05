import {ActionType, GenreChangeAction, FilmListAction} from '../types/action';

export const genreChange = (genre: string): GenreChangeAction => ({
  type: ActionType.GenreChange,
  payload: genre,
});

export const filmList = (): FilmListAction => ({
  type: ActionType.FilmList,
});
