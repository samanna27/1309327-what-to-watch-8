import {connect, ConnectedProps} from 'react-redux';
import React from 'react';
import {State} from '../../types/state';
import { AuthorizationStatus } from '../../const';

const mapStateToProps = ({promoFilm, authorizationStatus}: State) => ({
  promoFilm,
  authorizationStatus,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function MyListButton(props: ConnectedComponentProps):JSX.Element {
  const {authorizationStatus, promoFilm} = props;
  //eslint-disable-next-line
  console.log('mylistbuttoncomponent', promoFilm);

  return (
    promoFilm?.addedToWatchList === true && authorizationStatus === AuthorizationStatus.Auth ?
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#in-list"></use>
      </svg> :
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
  );
}

export {MyListButton};
export default connector(MyListButton);
