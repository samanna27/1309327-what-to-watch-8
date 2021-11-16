import { Film } from '../../types/film';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import { useState } from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {loadFilmData} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import {store} from '../../index';
import {fetchFilmDataAction, fetchSimilarFilmsAction, fetchCommentsAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';

type SmallFilmCardProps = {
  film: Film;
}

(store.dispatch as ThunkAppDispatch)(fetchFilmDataAction());
(store.dispatch as ThunkAppDispatch)(fetchSimilarFilmsAction());
(store.dispatch as ThunkAppDispatch)(fetchCommentsAction());
// TODO!!! вот отсюда все началось. Я хотела по клику в этом компоненте загрузить данные по similarFilms, comments и отдать в FilmScreen компонент для дальнейшей отрисовки. Добавила соответствующие пропсы в mapStateToProps
// После этого eslint начал ругаться на эти типы и их протаскивание через компоненты.

const mapStateToProps = ({film, similarFilms, comments}: State) => ({
  film,
  similarFilms,
  comments,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onSmallFilmCardClick: loadFilmData,
}, dispatch);
// TODO!!! этот обработчик хочу вообще удалить, мне не нужна инфа по отдельному фильму, она вся у меня в массиве фильмов содержится. А загрузку similarFilms данных лучше сделать в Film-screen компоненте, а комментариев вообще в film-review.

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & SmallFilmCardProps;

function SmallFilmCard({film, onSmallFilmCardClick}: ConnectedComponentProps):JSX.Element {
  const { id, title } = film;
  const [isPlaying, setIsPlaying] = useState(true);
  return (
    <article className="small-film-card catalog__films-card">
      <VideoPlayer
        isPlaying={isPlaying}
        film={film}
        onFilmCardFocus={() => setIsPlaying(isPlaying)}
        onFilmCardBlur={() => setIsPlaying(!isPlaying)}
      />
      {/* TODO!!! задание у меня по видео-плееру приняли, но когда я навожу мышку на постер, у меня почему-то не проигрывается превью... */}
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link" onClick={()=>(onSmallFilmCardClick(film))}>{title}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
