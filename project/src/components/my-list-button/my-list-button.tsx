import {connect, ConnectedProps} from 'react-redux';
import React from 'react';
import {State} from '../../types/state';
import { AuthorizationStatus } from '../../const';
import {fetchToggleFavoriteAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import {store} from '../../index';
import { Film } from '../../types/film';

type MyListButtonProps = {
 film: Film | null;
}

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MyListButtonProps;

function MyListButton(props: ConnectedComponentProps):JSX.Element {
  const {authorizationStatus, film} = props;
  const handleClick = ()=>{
    if (film !== null) {
      (store.dispatch as ThunkAppDispatch)(fetchToggleFavoriteAction(film.id, Number(!film.addedToWatchList)));
    }};

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleClick}>
      {film?.addedToWatchList === true && authorizationStatus === AuthorizationStatus.Auth ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg> :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>}
      <span>
        My list
      </span>
    </button>
  );
}

export {MyListButton};
export default connector(MyListButton);
