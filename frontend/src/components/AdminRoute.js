import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  let userInfo = null;
  if (userSignIn.userInfo) {
    ({ userInfo } = userSignIn);
  }

  return userInfo && userInfo.isAdmin ? children : <Navigate to="signin" />;
}

export default AdminRoute;
