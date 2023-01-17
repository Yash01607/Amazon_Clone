import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signIn } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import socketIOClient from 'socket.io-client';
import { ENDPOINT } from '../utils';

const SignInScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignIn = useSelector((state) => state.userSignIn);

  const { loading, userInfo, error } = userSignIn;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  useEffect(() => {
    if (userInfo) {
      const sk = socketIOClient(ENDPOINT);
      sk.emit('onLogin', {
        _id: userInfo.id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(signIn(email, password));
  };

  return (
    <div className="main-pad">
      <form onSubmit={onSubmitHandler} className="form">
        <div>
          <h1 className="heading">Sign-In</h1>
        </div>
        <div>
          {loading && <div className="loading">Loading...</div>}
          {error && (
            <MessageBox variant="danger">
              {'Either Email or Password is Incorrect'}
            </MessageBox>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            key="email"
            placeholder="Enter E-mail"
            required={true}
            onChange={emailChangeHandler}
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            key="password"
            placeholder="Enter Password"
            required={true}
            onChange={passwordChangeHandler}
          ></input>
        </div>
        <div>
          <button type="submit" className="block primary">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New Here?{'  '}
            <a
              href={
                redirect === '/' ? 'register' : 'register?redirect=' + redirect
              }
            >
              Create your Account.
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInScreen;
