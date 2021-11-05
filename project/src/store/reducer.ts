import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import { films } from '../mocks/films';

const initialState = {
  genre: 'All genres',
  filmList: [],
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.GenreChange:
      return {...state };
    case ActionType.FilmList:
      return {...state, filmList: films };
    default:
      return state;
  }
};

export {reducer};
