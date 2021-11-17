// import { Film } from '../../types/film';
import { FILM_GENRES, GENRES, FILM_CARD_COUNT_PER_STEP } from '../../const';
import FilmsListComponent from '../films-list-component/films-list-component';
import { Link } from 'react-router-dom';
import {bindActionCreators, Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {loadFilmData, provideFilmList} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import ShowMoreButton from '../show-more-button/show-more-button';

type GenresListProps = {
  // films: Film[];
}

const mapStateToProps = ({genre, filmList, films, renderedFilms}: State) => ({
  genre,
  filmList,
  films,
  renderedFilms,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onGenreClick: provideFilmList,
  onSmallFilmCardClick: loadFilmData,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & GenresListProps;

function GenresList(props: ConnectedComponentProps):JSX.Element {
  const { filmList, films, onGenreClick} = props;
  const filmCount = films.length;
  let renderedFilms = 0;

  return (
    <>
      <ul className="catalog__genres-list">

        {GENRES.map((genre)=>(
          <li key={genre} className="catalog__genres-item">
            <Link to="#" className="catalog__genres-link" onClick={() => {
              const index = Object.values(FILM_GENRES).indexOf(genre);
              const genreNotation = Object.keys(FILM_GENRES)[index];
              onGenreClick(genreNotation);}}
              // TODO!!! здесь должен срабатывать Action на фильтрацию по жанру и копированию отфильтрованного массива фильмов в FilmList в Store. В дальнейшем FilmList должен обновляться в компоненте FilmList Component для отображения списка по выбранному жанру. Не работает.
            >
              {genre}
            </Link>
          </li>
        ))}
      </ul>
      {/* {document.querySelector('.catalog__genres-item')? null: document.querySelector('.catalog__genres-item').classList.add('catalog__genres-item--active')} */}
      {/* TODO!!! Ожидала, что код предыдущей строки будет добавлять класс в тег li, чтобы отображался стиль подчеркивания выбранного фильра по жанру, но код не работает. Пока что закоментировала. */}
      {renderedFilms < filmCount? renderedFilms += FILM_CARD_COUNT_PER_STEP: renderedFilms=filmCount}
      <FilmsListComponent films={filmList.slice(0, renderedFilms)} />
      {renderedFilms === filmCount ? null: <ShowMoreButton filmCount={filmCount} filmList={filmList}/>}
    </>
  );
}

export {GenresList};
export default connector(GenresList);
