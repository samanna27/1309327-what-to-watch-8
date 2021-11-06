export enum ActionType {
  GenreChange = 'main/genreChange',
  ProvideFilmList = 'main/ProvideFilmList',
  ResetFilmList = 'main/ResetFilmList',
}

export type GenreChangeAction = {
  type: ActionType.GenreChange;
  payload: string;
};

export type ProvideFilmListAction = {
  type: ActionType.ProvideFilmList;
};

export type ResetFilmListAction = {
  type: ActionType.ResetFilmList;
};

export type Actions = GenreChangeAction | ProvideFilmListAction | ResetFilmListAction;
