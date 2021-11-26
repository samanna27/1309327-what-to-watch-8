import {Link} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {logoutAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import {AppRoute, AuthorizationStatus} from '../../const';
import {State} from '../../types/state';

const mapStateToProps = ({authorizationStatus, authInfo}: State) => ({
  authorizationStatus,
  authInfo,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  requireLogout() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function LoginLogout(props: ConnectedComponentProps):JSX.Element {
  const {authorizationStatus, requireLogout, authInfo} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ?
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <Link to={AppRoute.MyList} >
              <img src={authInfo?.avatarUrl ? authInfo.avatarUrl : authInfo?.email} alt="User avatar" width="63" height="63" />
            </Link>
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
      :
      <div className="user-block">
        <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
      </div>

  );
}

export {LoginLogout};
export default connector(LoginLogout);
