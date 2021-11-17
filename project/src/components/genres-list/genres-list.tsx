import { FILM_GENRES, GENRES, FILM_CARD_COUNT_PER_STEP } from '../../const';
import FilmsListComponent from '../films-list-component/films-list-component';
import { Link } from 'react-router-dom';
import {bindActionCreators, Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {provideFilmList} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import ShowMoreButton from '../show-more-button/show-more-button';
// import { adaptToClient } from '../../components/adaptor/adaptor';
// import { Film } from '../../types/film';

const mapStateToProps = ({genre, filmList, renderedFilms}: State) => ({
  genre,
  filmList,
  renderedFilms,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onGenreClick: provideFilmList,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function GenresList(props: ConnectedComponentProps):JSX.Element {
  const { filmList, onGenreClick} = props;
  let { renderedFilms } = props;
  const adaptedFilmList = Object.entries(filmList).map(([name, value]) => (value));

  const filmCount = adaptedFilmList.length;
  renderedFilms < filmCount? renderedFilms += FILM_CARD_COUNT_PER_STEP: renderedFilms=filmCount;

  return (
    <>
      <ul className="catalog__genres-list">

        {GENRES.map((genre)=>(
          <li key={genre} className="catalog__genres-item">
            <Link to="#" className="catalog__genres-link" onClick={() => {
              const index = Object.values(FILM_GENRES).indexOf(genre);
              const genreNotation = Object.keys(FILM_GENRES)[index];
              onGenreClick(genreNotation, adaptedFilmList);}}
              // TODO!!! здесь должен срабатывать Action на фильтрацию по жанру и копированию отфильтрованного массива фильмов в FilmList в Store. В дальнейшем FilmList должен обновляться в компоненте FilmList Component для отображения списка по выбранному жанру. Не работает.
            >
              {genre}
            </Link>
          </li>
        ))}
      </ul>
      {/* {document.querySelector('.catalog__genres-item')? null: document.querySelector('.catalog__genres-item').classList.add('catalog__genres-item--active')} */}
      {/* TODO!!! Ожидала, что код предыдущей строки будет добавлять класс в тег li, чтобы отображался стиль подчеркивания выбранного фильра по жанру, но код не работает. Пока что закоментировала. */}
      <FilmsListComponent films={adaptedFilmList.slice(0, renderedFilms)} />
      {renderedFilms === filmCount ? null: <ShowMoreButton filmCount={filmCount} filmList={adaptedFilmList} />}
    </>
  );
}

export {GenresList};
export default connector(GenresList);
