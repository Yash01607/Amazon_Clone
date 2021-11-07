import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function AdminRoute({ component: Component, ...rest }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  let userInfo = null;
  if (userSignIn.userInfo) {
    ({ userInfo } = userSignIn);
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin"></Redirect>
        )
      }
    ></Route>
  );
}

export default AdminRoute;
