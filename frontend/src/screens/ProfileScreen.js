import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { detailsUser, UpdateUserProfile } from "../actions/userActions";
import MessageBox from "../components/MessageBox";

function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }
  //   console.log(userInfo);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
      dispatch(detailsUser(userInfo.id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo.id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password are not Matched.");
    } else {
      dispatch(UpdateUserProfile({ userId: user._id, name, email, password }));
    }
  };

  return (
    <div className="main-pad">
      <form className="form" onSubmit={submitHandler}>
        {loading ? (
          <p>Loading....</p>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <h1 className="heading">Hello {name}!</h1>
            </div>
            {loadingUpdate && <p>Loading...</p>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                User Profile updated Successfully
              </MessageBox>
            )}
            <div>
              {/* <label htmlFor="name">Name</label> */}
              <input
                id="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              {/* <label htmlFor="email">E-Mail</label> */}
              <input
                id="email"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              {/* <label htmlFor="password">Password</label> */}
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              {/* <label htmlFor="confirmPassword">confirm Password</label> */}
              <input
                id="confirmPassword"
                type="text"
                placeholder="Enter confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <button className="primary button" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProfileScreen;
