import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import {AuthorizationStatus} from '../const';
import { Film, FilmReview } from '../types/film';

const movie = {} as Film;
const movieComment = {} as FilmReview;

const initialState = {
  genre: 'All genres',
  films: [],
  film: movie,
  similarFilms: [],
  comments: [],
  comment: movieComment,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  renderedFilms: 8,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:{
      const genre = action.payload;
      return {...state, genre };
    }
    case ActionType.LoadFilms: {
      const {films} = action.payload;
      return {...state, films};
    }
    case ActionType.LoadFilmData: {
      const {film} = action.payload;
      return {...state, film};
    }
    case ActionType.LoadSimilarFilms: {
      const {similarFilms} = action.payload;
      return {...state, similarFilms};
    }
    case ActionType.LoadComments: {
      const {comments} = action.payload;
      return {...state, comments};
    }
    case ActionType.AddComment: {
      const {comment} = action.payload;
      return {...state, comment};
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
