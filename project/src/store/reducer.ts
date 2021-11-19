import {Actions, ActionType} from '../types/action';
import {State} from '../types/state';
import {AuthorizationStatus} from '../const';
import {FilmReview} from '../types/film';

const movieComment = {} as FilmReview;

const initialState = {
  genre: 'All genres',
  films: [],
  currentFilm: null,
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
      const renderedFilms = 8;
      return {...state, genre, renderedFilms };
    }
    case ActionType.ChangeRenderedFilms:{
      const renderedFilms = action.payload;
      return {...state, renderedFilms };
    }
    case ActionType.LoadFilms: {
      const {films} = action.payload;
      return {...state, films};
    }
    case ActionType.LoadFilmData: {
      const {currentFilm} = action.payload;
      return {...state, currentFilm};
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
