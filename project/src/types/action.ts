export enum ActionType {
  GenreChange = 'main/genreChange',
  FilmList = 'main/FilmList',
  ResetFilmList = 'main/ResetFilmList',
}

export type GenreChangeAction = {
  type: ActionType.GenreChange;
  payload: string;
};

export type FilmListAction = {
  type: ActionType.FilmList;
};

export type ResetFilmListAction = {
  type: ActionType.ResetFilmList;
};

export type Actions = GenreChangeAction | FilmListAction | ResetFilmListAction;
