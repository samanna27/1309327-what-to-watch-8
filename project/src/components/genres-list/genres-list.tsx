import { Film } from '../../types/film';
import { GENRES } from '../../const';
// import { useState } from 'react';
import FilmsListComponent from '../films-list-component/films-list-component';
import {bindActionCreators, Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {provideFilmList} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';


type GenresListProps = {
  films: Film[];
}

const mapStateToProps = ({genre, filmList}: State) => ({
  genre,
  filmList,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onGenreClick: provideFilmList,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & GenresListProps;

function GenresList(props: ConnectedComponentProps):JSX.Element {
  const { filmList, onGenreClick} = props;
  // const [isInitialFilmList, setInitialFilmList] = useState(true);
  // const [isFilteredFilmList, setFilteredFilmList] = useState(false);
  // let filteredFilms = films.slice();

  // const renderFilteredFilms = (value: number)=>{
  //   document.querySelectorAll('.catalog__genres-item').forEach((element) => element.classList.remove('catalog__genres-item--active'));
  //   document.querySelectorAll('.catalog__genres-item')[value].classList.add('catalog__genres-item--active');
  //   if(value===0) {
  //     setInitialFilmList((prevState) => true);
  //     setFilteredFilmList((prevState) => false);
  //   } else {
  //     setInitialFilmList((prevState) => false);
  //     setFilteredFilmList((prevState) => true);
  //     filteredFilms = films.slice().filter((film) => film.genre === GENRES[value]);
  //   }};

  return (
    <>
      <ul className="catalog__genres-list">

        {GENRES.map((genre)=>(
          <li key={genre} className="catalog__genres-item">
            <a href="#" className="catalog__genres-link" onClick={() => onGenreClick(GENRES.indexOf(genre))}>{genre}</a>
          </li>
        ))}
      </ul>

      {/* {isInitialFilmList && <FilmsListComponent films={films} />} */}
      {/* {isFilteredFilmList && <FilmsListComponent films={filmList} />} */}
      <FilmsListComponent films={filmList} />
      {/* {document.querySelector('.catalog__genres-item')? null: document.querySelector('.catalog__genres-item').classList.add('catalog__genres-item--active')} */}
    </>
  );
}

export {GenresList};
export default connector(GenresList);
