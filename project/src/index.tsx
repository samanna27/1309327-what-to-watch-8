import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
// import {bindActionCreators, Dispatch} from 'redux';
// import {connect} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
// import { films } from './mocks/films';
import {reducer} from './store/reducer';
import { requireAuthorization} from './store/action';
// import {provideFilmList, requireAuthorization} from './store/action';
import {fetchFilmAction, checkAuthAction} from './store/api-actions';
import {ThunkAppDispatch} from './types/action';
import {AuthorizationStatus} from './const';
import {redirect} from './store/middlewares/redirect';
// import {State} from './types/state';
// import {Actions} from './types/action';
// import { Film } from './types/film';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const PromoFilmData = {
  PROMO_FILM_TITLE: 'The Grand Budapest Hotel',
  PROMO_FILM_GENRE: 'Drama',
  PROMO_FILM_DATE: 2014,
};

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchFilmAction());

// const mapStateToProps = ({films}: State) => ({
//   films,
// });

// const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
//   films: provideFilmList,
// }, dispatch);

// const connector = connect(mapStateToProps, mapDispatchToProps);
// const Container = connect(mapStateToProps,mapDispatchToProps)(appRendering);
// function appRendering(films: Film[]){
//   return(
//     <App
//       promoFilmTitle={films[0].title} promoFilmGenre={films[0].genre} promoFilmDate={films[0].releaseDate}
//       films={films}
//     />
//   );
// }

// type PropsFromRedux = ConnectedProps<typeof connector>;
// type ConnectedComponentProps = PropsFromRedux ;

// const films = function addingFilmsToprops ('All genres') {};
// const films= provideFilmList('All genres');

// store.dispatch(provideFilmList('All genres'));
// console.log(films);

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      {/* <Container /> */}
      <App
        promoFilmTitle={PromoFilmData.PROMO_FILM_TITLE} promoFilmGenre={PromoFilmData.PROMO_FILM_GENRE} promoFilmDate={PromoFilmData.PROMO_FILM_DATE}
        films={store.getState().films}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
