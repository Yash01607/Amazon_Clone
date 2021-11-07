import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { signIn } from "../actions/userActions";
import MessageBox from "../components/MessageBox";

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignIn = useSelector((state) => state.userSignIn);

  const { loading, userInfo, error } = userSignIn;

  const dispatch = useDispatch();

  const history = props.history;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

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
    <form onSubmit={onSubmitHandler} className="form">
      <div>
        <h1 className="heading">Sign-In</h1>
      </div>
      <div>
        {loading && <div className="loading">Loading...</div>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
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
        <label htmlFor="password">Password</label>
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
          New to Ecommerce?{"  "}
          <Link
            to={redirect === "/" ? "register" : "register?redirect=" + redirect}
          >
            Create your Account.
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInScreen;
