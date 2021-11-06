import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import { films } from '../mocks/films';

const initialState = {
  genre: 'All genres',
  filmList: films,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.GenreChange:
      return {...state };
    case ActionType.FilmList:{
      const {genre} = action.payload;
      if (genre==='All genres') {
        return {
          ...initialState,
        };
      }
      const filmList = state.filmList.slice().filter((film) => film.genre === genre);
      return {...state, filmList};
    }
  //   case ActionType.ResetFilmList:
  //     return {...initialState};
  //   default:
  //     return state;
  }
};

export {reducer};
