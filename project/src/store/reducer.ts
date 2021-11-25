import {Actions, ActionType} from '../types/action';
import {State} from '../types/state';
import {AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {store} from '../index';
import {fetchCommentsAction} from '../store/api-actions';
import {ThunkAppDispatch} from '../types/action';

const movies = [] as Film[];

const initialState = {
  genre: 'All genres',
  films: [],
  myListFilms: null,
  currentFilm: null,
  promoFilm: null,
  currentId: -1,
  similarFilms: movies,
  comments: [],
  comment: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  renderedFilms: 8,
  userEmail: '',
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
    case ActionType.LoadPromoFilmData: {
      const {promoFilm} = action.payload;
      return {...state, promoFilm};
    }
    case ActionType.LoadSimilarFilms: {
      const similarFilms = action.payload.similarFilms;
      const currentId = action.payload.currentId;
      return {...state, similarFilms, currentId};
    }
    case ActionType.LoadMyListFilms: {
      const {myListFilms} = action.payload;
      return {...state, myListFilms};
    }
    case ActionType.LoadComments: {
      const {comments} = action.payload;
      return {...state, comments};
    }
    case ActionType.AddComment: {
      const id = action.payload.id;
      (store.dispatch as ThunkAppDispatch)(fetchCommentsAction(id.toString()));
      return {...state};
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
    case ActionType.ChangeUserEmail: {
      const userEmail = action.payload;
      return {...state, userEmail};
    }
    case ActionType.UpdateFilmsData: {
      const updatedFilm = action.payload;
      const films = state.films.slice();
      const promoFilm = Object.assign({}, state.promoFilm);
      if(updatedFilm !== null) {
        const updatedFilmId = updatedFilm.id;
        const matchedFilm = films.find((film) => film.id === updatedFilmId);
        if (matchedFilm) {
          const idx = films.indexOf(matchedFilm);
          films.splice(idx,1,updatedFilm);
        }
        if (promoFilm?.id && promoFilm.id=== updatedFilmId) {
          promoFilm.addedToWatchList = updatedFilm.addedToWatchList;
        }
      }
      return {...state, films, promoFilm};
    }
    default:
      return state;
  }
};

export {reducer};
