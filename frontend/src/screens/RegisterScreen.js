import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { register } from "../actions/userActions";
import MessageBox from "../components/MessageBox";

const RegisterScreen = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [password, setPassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, userInfo, error } = userRegister;

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

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const rePasswordChangeHandler = (event) => {
    setRePassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password === rePassword) {
      dispatch(register(name, email, password));
    } else {
      window.alert("Password and Re-enter Password must be identical.");
    }
  };

  return (
    <div className="main-pad">
      <form onSubmit={onSubmitHandler} className="form">
        <div>
          <h1 className="heading">Create Account</h1>
        </div>
        <div>
          {loading && <div className="loading">Loading...</div>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            name="name"
            id="name"
            key="name"
            placeholder="Enter Your Name"
            required="true"
            onChange={nameChangeHandler}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            key="email"
            required="true"
            placeholder="Enter Your E-Mail"
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
            placeholder="Enter Your Password"
            required="true"
            onChange={passwordChangeHandler}
          ></input>
        </div>
        <div>
          <label htmlFor="repassword">Re-enter Password</label>
          <input
            type="password"
            name="repassword"
            id="repassword"
            key="repassword"
            placeholder="Re-Enter Your Password"
            onChange={rePasswordChangeHandler}
            required="true"
          ></input>
        </div>
        <div>
          <button type="submit" className="block primary">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{" "}
            <Link
              to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
            >
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
