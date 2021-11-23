type ReviewRatingStarProps = {
  rating: number,
  setRating: (evt: React.ChangeEvent<HTMLInputElement>, rating: number) => void,
}

function ReviewRatingStar(props: ReviewRatingStarProps): JSX.Element {
  const {rating, setRating} = props;
  return (
    <>
      <input
        className="rating__input" type="radio" name="rating" value={`star-${rating}`}
        id={`star-${rating}`}
        onChange={(evt) => {setRating(evt, rating);}}
      />
      <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
    </>
  );
}

export default ReviewRatingStar;
