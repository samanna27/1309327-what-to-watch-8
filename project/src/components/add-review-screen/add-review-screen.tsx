import Logo from '../logo/logo';
import {useHistory} from 'react-router-dom';
import {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {fetchPostCommentAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import {MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH} from '../../const';
import {Film} from '../../types/film';
import ReviewRatingStar from './review-rating-star';
import LoginLogout from '../login-logout/login-logout';
import SvgLogo from '../svg-logo/svg-logo';
import {Link} from 'react-router-dom';
import {store} from '../../index';

type AddReviewScreenProps = {
  film: Film,
}

const connector = connect();

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AddReviewScreenProps;

function AddReviewScreen(props: ConnectedComponentProps):JSX.Element {
  const {film} = props;
  const { id, bigPoster, poster, title } = film;

  const textRef = useRef<HTMLTextAreaElement>(null);

  const history = useHistory();

  let starRatingCount = 10;
  const stars =  new Array(10).fill('').map((index) => {
    index=starRatingCount;
    starRatingCount--;

    return index;
  });

  const [rating, setRating] = useState<number>(0);
  const handleInputAreaChange = (evt: ChangeEvent<HTMLInputElement>, ratingToSet: number) => {
    setRating(ratingToSet);
    if(ratingToSet === 0) {
      evt.target.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
    }

    evt.target.reportValidity();
  };

  const [newComment, setNewComment] = useState<string>('');
  const handleTextAreaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(evt.target.value);
    if (newComment !== null) {
      const newCommentLength = newComment.length;

      if (newCommentLength > 0 && newCommentLength < MIN_COMMENT_LENGTH) {
        evt.target.setCustomValidity(
          `Комментарий должен состоять минимум из 50 символов${'.'} Осталось ещё ${
            MIN_COMMENT_LENGTH - newCommentLength
          } симв.`    );
      } else if (newCommentLength > MAX_COMMENT_LENGTH) {
        evt.target.setCustomValidity(
          `Заголовок не должен превышать 400 символов${'.'} Удалите лишние ${
            newCommentLength - MAX_COMMENT_LENGTH
          } симв.`    );
      } else if (newCommentLength === 0) {
        evt.target.setCustomValidity('Обязательное поле');
      } else {
        evt.target.setCustomValidity('');
      }

      evt.target.reportValidity();
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    (store.dispatch as ThunkAppDispatch)(fetchPostCommentAction(
      {rating: rating,
        comment: newComment},
      id));

    history.push(`/films/${id}`);
  };

  const isFormValid = (rating !== 0 && newComment.length>50 && newComment.length<400);
  //eslint-disable-next-line
  console.log(isFormValid);

  return (
    <>
      <SvgLogo />

      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={bigPoster} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo />

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="film-page.html" className="breadcrumbs__link">{title}</a>
                </li>
                <li className="breadcrumbs__item">
                  <Link to={`/films/${id}/review`} className="breadcrumbs__link">Add review</Link>
                </li>
              </ul>
            </nav>
            <LoginLogout />
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={poster} alt={title} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form
            action="#"
            className="add-review__form"
            onSubmit={handleSubmit}
          >
            <div className="rating">
              <div className="rating__stars" >
                {stars.map((star) => <ReviewRatingStar key={star} rating={star} setRating={handleInputAreaChange}/>)}
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                ref={textRef}
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
                minLength={MIN_COMMENT_LENGTH}
                maxLength={MAX_COMMENT_LENGTH}
                value={newComment}
                onChange={handleTextAreaChange}
              >
              </textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  { ...isFormValid===true ? '' : 'disabled'}
                  type="submit"
                >
                  Post
                </button>
              </div>

            </div>
          </form>
        </div>

      </section>
    </>
  );
}

export {AddReviewScreen};
export default connector(AddReviewScreen);
