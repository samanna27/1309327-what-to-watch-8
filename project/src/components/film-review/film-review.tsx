import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import dayjs from 'dayjs';

const mapStateToProps = ({currentFilm, comments}: State) => ({
  currentFilm,
  comments,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function FilmReview({comments}: ConnectedComponentProps):JSX.Element {

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.map((comment) => (
          <div key={comment.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user?.name}</cite>
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
