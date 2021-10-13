import MainPage from '../main-page/main-page';

type AppScreenProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmDate: number;
}

function App({promoFilmTitle, promoFilmGenre, promoFilmDate}: AppScreenProps): JSX.Element {
  return (
    <MainPage promoFilmTitle = {promoFilmTitle} promoFilmGenre = {promoFilmGenre} promoFilmDate = {promoFilmDate} />
  );
}

export default App;
