function userSignInReducer(state = {}, action) {
  switch (action.type) {
    case "USER_SIGNIN_REQUEST":
      return { loading: true };
    case "USER_SIGNIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_SIGNIN_FAILED":
      return { loading: false, error: action.payload };
    case "USER_SIGNOUT":
      return {};
    default:
      return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAILED":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { loading: true };
    case "USER_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_DETAILS_FAILED":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_PROFILE_REQUEST":
      return { loading: true };
    case "USER_UPDATE_PROFILE_SUCCESS":
      return { loading: false, success: true };
    case "USER_UPDATE_PROFILE_FAILED":
      return { loading: false, error: action.payload };
    case "USER_UPDATE_PROFILE_RESET":
      return {};
    default:
      return state;
  }
};

export {
  userSignInReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
};
