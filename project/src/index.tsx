import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const PromoFilmData = {
  PROMO_FILM_TITLE: 'The Grand Budapest Hotel',
  PROMO_FILM_GENRE: 'Drama',
  PROMO_FILM_DATE: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App promoFilmTitle={PromoFilmData.PROMO_FILM_TITLE} promoFilmGenre={PromoFilmData.PROMO_FILM_GENRE} promoFilmDate={PromoFilmData.PROMO_FILM_DATE} />
  </React.StrictMode>,
  document.getElementById('root'));
