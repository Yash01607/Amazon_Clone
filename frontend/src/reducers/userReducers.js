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
    case "USER_DETAILS_RESET":
      return { loading: true };
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

const userListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "USER_LIST_REQUEST":
      return { loading: true };
    case "USER_LIST_SUCCESS":
      return { loading: false, users: action.payload };
    case "USER_LIST_FAILED":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_DELETE_REQUEST":
      return { loading: true };
    case "USER_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "USER_DELETE_FAILED":
      return { loading: false, error: action.payload };
    case "USER_DELETE_RESET":
      return {};
    default:
      return state;
  }
};

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return { loading: true };
    case "USER_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "USER_UPDATE_FAILED":
      return { loading: false, error: action.payload };
    case "USER_UPDATE_RESET":
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
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
};
