export enum ActionType {
  GenreChange = 'main/genreChange',
  FilmList = 'main/FilmList',
}

export type GenreChangeAction = {
  type: ActionType.GenreChange;
  payload: string;
};

export type FilmListAction = {
  type: ActionType.FilmList;
};

export type Actions = GenreChangeAction | FilmListAction;
