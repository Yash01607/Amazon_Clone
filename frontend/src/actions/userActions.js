import axios from "axios";
import Axios from "axios";
import Cookies from "js-cookie";

const signIn = (email, password) => async (dispatch) => {
  dispatch({ type: "USER_SIGNIN_REQUEST", payload: { email, password } });

  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });

    dispatch({ type: "USER_SIGNIN_SUCCESS", payload: data });

    Cookies.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: "USER_SIGNIN_FAILED", payload: error.message });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: "USER_REGISTER_REQUEST",
    payload: { name, email, password },
  });

  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });

    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
    console.log("In cartaction");
    console.log(data);

    Cookies.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error.message });
  }
};

const signout = () => (dispatch) => {
  Cookies.remove("userInfo");
  Cookies.remove("cartItems");
  Cookies.remove("shippingAddress");
  dispatch({ type: "USER_SIGNOUT" });
  document.location.href = "/signin";
};

const detailsUser = (userId) => async (dispatch) => {
  dispatch({ type: "USER_DETAILS_REQUEST", payload: userId });
  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }
  try {
    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer${userInfo.token}`,
      },
    });
    dispatch({ type: "USER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "USER_DETAILS_FAILED", payload: message });
  }
};

const UpdateUserProfile = (user) => async (dispatch) => {
  dispatch({ type: "USER_UPDATE_PROFILE_REQUEST", payload: user });
  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }
  try {
    const { data } = await axios.put(
      "/api/users/profile",
      { email: user.email, name: user.name, password: user.password },
      {
        headers: {
          Authorization: `Bearer${userInfo.token}`,
        },
      }
    );

    dispatch({ type: "USER_UPDATE_PROFILE_SUCCESS", payload: data });
    dispatch({ type: "USER_SIGNIN_SUCCESS", payload: data });
    Cookies.set("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "USER_UPDATE_PROFILE_FAILED", payload: message });
  }
};
export { signIn, register, detailsUser, UpdateUserProfile, signout };
