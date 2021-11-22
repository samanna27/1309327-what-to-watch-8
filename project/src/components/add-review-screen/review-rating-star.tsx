type ReviewRatingStarProps = {
  rating: number
}

function ReviewRatingStar(props: ReviewRatingStarProps): JSX.Element {
  const {rating} = props;
  return (
    <>
      <input className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={`star-${rating}`}/>
      <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
    </>
  );
}

export default ReviewRatingStar;
