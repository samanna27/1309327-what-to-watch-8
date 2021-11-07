import { Film } from '../../types/film';

type ShowMoreButtonProps = {
  films: Film[];
}

function ShowMoreButton({films}:  ShowMoreButtonProps):JSX.Element {

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" >Show more</button>
      {/* <button className="catalog__button" type="button" onClick={() => {}} >Show more</button> */}
    </div>
  );
}

export default ShowMoreButton;
