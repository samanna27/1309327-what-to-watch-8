import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
// import {fetchCommentsAction} from '../../store/api-actions';
// import {ThunkAppDispatch} from '../../types/action';
// import {store} from '../../index';
import { Film } from '../../types/film';
import dayjs from 'dayjs';

type FilmReviewProps = {
  film: Film | null,
}

const mapStateToProps = ({currentFilm, comments}: State) => ({
  currentFilm,
  comments,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FilmReviewProps ;

function FilmReview({currentFilm, comments, film}: ConnectedComponentProps):JSX.Element {
  // if (currentFilm) {
  //   const currentFilmId = currentFilm.id.toString();
  //   (store.dispatch as ThunkAppDispatch)(fetchCommentsAction(currentFilmId));}
  // if (film) {
  //   const filmId = film.id.toString();
  //   (store.dispatch as ThunkAppDispatch)(fetchCommentsAction(filmId));}

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.map((comment) => (
          <div key={comment.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime={comment.date}>{dayjs(comment.date).format('MMMM DD, YYYY')}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>))}
      </div>
    </div>
  );
}

export {FilmReview};
export default connector(FilmReview);
