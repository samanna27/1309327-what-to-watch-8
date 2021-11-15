import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
// import { films } from '../mocks/films';
import {AuthorizationStatus} from '../const';
import { Film, FilmReview } from '../types/film';
import { adaptToClient } from '../components/adaptor/adaptor';

const movie = {} as Film;
const movieComment = {} as FilmReview;

const initialState = {
  genre: 'All genres',
  filmList: [],
  films: [],
  film: movie,
  similarFilms: [],
  comments: [],
  comment: movieComment,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  renderedFilms: 0,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.GenreChange:
      return {...state };
    case ActionType.ProvideFilmList:{
      const genre = action.payload;
      let renderedFilms = state.renderedFilms;
      let filmList = Array.from(state.films).map((film)=>adaptToClient(film));
      if (genre==='All genres') {
        return {
          ...state, filmList,
        };
      }
      filmList = state.filmList.slice().filter((film) => film.genre === genre);
      renderedFilms = 0;
      return {...state, filmList, renderedFilms};
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
