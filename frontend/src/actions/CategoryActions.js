import axios from "axios";
import Cookies from "js-cookie";

const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LIST_Request" });
    const { data } = await axios.get(`/api/category`);

    dispatch({ type: "CATEGORY_LIST_SUCCESS", payload: data });
    // console.log(data);
  } catch (error) {
    dispatch({ type: "CATEGORY_LIST_FAILED", payload: error.message });
  }
};

const saveCategory = (category) => async (dispatch) => {
  // console.log("In Action");
  try {
    dispatch({ type: "CATEGORY_SAVE_REQUEST", payload: category });

    let userInfo = {};
    if (Cookies.get("userInfo")) {
      userInfo = JSON.parse(Cookies.get("userInfo"));
    }
    const { data } = await axios.post("/api/category", category, {
      headers: {
        Authorization: "Bearer" + userInfo.token,
      },
    });
    dispatch({ type: "CATEGORY_SAVE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CATEGORY_SAVE_FAILED", payload: error.message });
  }
};

const deleteCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "CATEGORY_DELETE_REQUEST", payload: categoryId });
      let userInfo = {};
      if (Cookies.get("userInfo")) {
        userInfo = JSON.parse(Cookies.get("userInfo"));
      }
      const { data } = await axios.delete("/api/category/" + categoryId, {
        headers: {
          Authorization: "Bearer" + userInfo.token,
        },
      });

      dispatch({
        type: "CATEGORY_DELETE_SUCCESS",
        payload: data,
        success: true,
      });
    } catch (error) {
      dispatch({ type: "CATEGORY_DELETE_FAILED", payload: error.message });
    }
  };
};

export { saveCategory, listCategories, deleteCategory };
