import {
  ActionType,
  GenreChangeAction,
  ProvideFilmListAction,
  ResetFilmListAction
} from '../types/action';

export const genreChange = (genre: string): GenreChangeAction => ({
  type: ActionType.GenreChange,
  payload: genre,
});

export const provideFilmList = (): ProvideFilmListAction => ({
  type: ActionType.ProvideFilmList,
  payload: genre,
});

export const resetFilmList = (): ResetFilmListAction => ({
  type: ActionType.ResetFilmList,
});
