// import { ReviewStarRating } from '../../types/film';
import {Link} from 'react-router-dom';
import {useState, FormEvent, ChangeEvent, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {fetchPostCommentAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import {AppRoute} from '../../const';
// import {State} from '../../types/state';
// import {addComment} from '../../store/action';
// import {Actions} from '../../types/action';
import {Film} from '../../types/film';
// import {State} from '../../types/state';
import {logoutAction} from '../../store/api-actions';

type AddReviewScreenProps = {
  film: Film ,
  // onReviewInput: (rate: ReviewStarRating, text: string) => void;
}

// const mapStateToProps = ({filmscurrentFilm}: State) => ({
//   currentFilm,
// });


const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  requireLogout() {
    dispatch(logoutAction());
  },
  // onReviewInput: (rate: ReviewStarRating, text: string) => {
  //   dispatch(fetchPostCommentAction(Comment));
  //   dispatch(addComment(Comment));
  // },
  onSubmit(commentData: {rating: number, text: string}) {
    dispatch(fetchPostCommentAction(commentData));
  },
});

const connector = connect(mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AddReviewScreenProps;

function AddReviewScreen(props: ConnectedComponentProps):JSX.Element {
  const {film, requireLogout} = props;
  const { bigPoster, poster, title } = film;
  const {onSubmit} = props;

  const starRatingRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);

  const history = useHistory();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (starRatingRef.current !== null && textRef.current !== null) {
      onSubmit({
        rating: +starRatingRef.current.value,
        text: textRef.current.value,
      });
    }
  };

  const text = '';
  let starRatingCount = 10;
  const starRating =  new Array(10).fill('').map((index) => {
    index=starRatingCount;
    starRatingCount--;

    return index;
  });
  const [rating, setRating] = useState([false, false, false, false, false, false, false, false, false, false]);

  return (
    <>
      <div className="visually-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <symbol id="add" viewBox="0 0 19 20">
            <title>+</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"/>
            </g>
          </symbol>
          <symbol id="full-screen" viewBox="0 0 27 27">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
          </symbol>
          <symbol id="in-list" viewBox="0 0 18 14">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5"/>
          </symbol>
          <symbol id="pause" viewBox="0 0 14 21">
            <title>Artboard</title>
            <desc>Created with Sketch.</desc>
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"/>
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"/>
            </g>
          </symbol>
        </svg>
      </div>

      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={bigPoster} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="film-page.html" className="breadcrumbs__link">{title}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a href="#" className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <Link
                  className="user-block__link"
                  onClick={(evt) => {
                    evt.preventDefault();
                    requireLogout();
                  }}
                  to='/'
                >
                  Sign out
                </Link>
              </li>
            </ul>
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
            // onSubmit={(evt: FormEvent<HTMLFormElement>) => {
            //   evt.preventDefault();
            //   onReviewInput(starRating, text);
            // }}
          >
            <div className="rating">
              <div className="rating__stars">
                {starRating.map((star, id) => {
                  const keyValue = `${id}`;
                  return(
                    <>
                      <input
                        ref={starRatingRef}
                        key={keyValue} className="rating__input" id={`star-${star}`} type="radio" name="rating" value={`star-${star}`}
                        // checked={rating[id]}
                        onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                          const value = target.checked;
                          setRating([...rating.slice(0, id), value, ...rating.slice(id + 1)]);
                        }}
                      />
                      <label className="rating__label" htmlFor={`star-${star}`}>Rating {star}</label>
                    </>
                  );
                })}
              </div>
            </div>

            <div className="add-review__text">
              <input>
                ref={textRef}
                <textarea
                  className="add-review__textarea"
                  name="review-text"
                  id="review-text"
                  placeholder="Review text"
                  minLength={50}
                  maxLength={400}
                >
                  {text}
                </textarea>
              </input>
              <div className="add-review__submit">
                <button
                  onClick={() => history.push(AppRoute.Film)}
                  className="add-review__btn"
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
