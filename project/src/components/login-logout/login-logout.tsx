import {Link} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {logoutAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import {AppRoute, AuthorizationStatus} from '../../const';
import {State} from '../../types/state';

const mapStateToProps = ({authorizationStatus, userEmail}: State) => ({
  authorizationStatus,
  userEmail,
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
  const {authorizationStatus, userEmail, requireLogout} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ?
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <Link to={AppRoute.MyList} >
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </Link>
          </div>
          <p>{userEmail}</p>
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
