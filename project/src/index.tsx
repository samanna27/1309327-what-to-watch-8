import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import { films } from './mocks/films';
import {reducer} from './store/reducer';
import {requireAuthorization} from './store/action';
import {fetchFilmAction, checkAuthAction} from './store/api-actions';
import {ThunkAppDispatch} from './types/action';
import {AuthorizationStatus} from './const';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const PromoFilmData = {
  PROMO_FILM_TITLE: 'The Grand Budapest Hotel',
  PROMO_FILM_GENRE: 'Drama',
  PROMO_FILM_DATE: 2014,
};

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchFilmAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        promoFilmTitle={PromoFilmData.PROMO_FILM_TITLE} promoFilmGenre={PromoFilmData.PROMO_FILM_GENRE} promoFilmDate={PromoFilmData.PROMO_FILM_DATE}
        films={films}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
