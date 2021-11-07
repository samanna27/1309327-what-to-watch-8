import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
// import { films } from '../mocks/films';
import {AuthorizationStatus} from '../const';

const initialState = {
  genre: 'All genres',
  filmList: [],
  films: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.GenreChange:
      return {...state };
    case ActionType.ProvideFilmList:{
      const genre = state.genre;
      if (genre==='All genres') {
        return {
          ...initialState,
        };
      }
      const filmList = state.filmList.slice().filter((film) => film.genre === genre);
      return {...state, filmList};
    }
    case ActionType.LoadFilms: {
      const {films} = action.payload;
      return {...state, films};
    }
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.ResetFilmList:
      return {...initialState};
    default:
      return state;
  }
};

export {reducer};
