import {bindActionCreators, Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {loadFilmData} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import {fetchCommentsAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import {store} from '../../index';

(store.dispatch as ThunkAppDispatch)(fetchCommentsAction());

const mapStateToProps = ({comments}: State) => ({
  comments,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onSmallFilmCardClick: loadFilmData,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux ;

function FilmReview({comments}: ConnectedComponentProps):JSX.Element {

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.map((comment) => (
          <div key={comment.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime={comment.date}>{comment.date}</time>
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
