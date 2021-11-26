import Logo from '../logo/logo';
import {useRef, FormEvent} from 'react';
import {useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {loginAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import {store} from '../../index';
import SvgLogo from '../svg-logo/svg-logo';
import {toast} from 'react-toastify';

const connector = connect();

type PropsFromRedux = ConnectedProps<typeof connector>;

function SignInScreen(props: PropsFromRedux):JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [validPassword, setValidPassword] = useState(false);

  const checkPasswordValidity = (word: string) => {
    const passwordToCheck = word;
    if(passwordToCheck !== null) {
      if(passwordToCheck.match(/[A-Za-z]+\d+/) || passwordToCheck?.match(/\d+[A-Za-z]+/)) {
        setValidPassword(true);
      } else {
        toast.info('пароль должен состоять минимум из одной буквы и одной цифры');
        setValidPassword(false);
      }
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null && validPassword) {
      (store.dispatch as ThunkAppDispatch)(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };


  return (
    <>
      <SvgLogo />

      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form
            action=""
            className="sign-in__form"
            onSubmit={handleSubmit}
          >
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  ref={loginRef}
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  required
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  ref={passwordRef}
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  required
                  onChange={(e) => checkPasswordValidity(e.target.value)}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button
                className="sign-in__btn"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <Logo />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export {SignInScreen};
export default connector(SignInScreen);
