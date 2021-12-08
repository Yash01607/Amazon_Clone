import axios from "axios";
import Cookies from "js-cookie";

const listPoducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_LIST_Request" });
      const { data } = await axios.get("/api/products");

      dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "PRODUCT_LIST_FAILED", payload: error.message });
    }
  };
};

const saveProduct = (product) => async (dispatch, getState) => {
  // console.log("In Action");
  try {
    dispatch({ type: "PRODUCT_SAVE_REQUEST", payload: product });

    let userInfo = {};
    if (Cookies.get("userInfo")) {
      userInfo = JSON.parse(Cookies.get("userInfo"));
    }
    if (!product._id) {
      const { data } = await axios.post("/api/products", product, {
        headers: {
          Authorization: "Bearer" + userInfo.token,
        },
      });
      dispatch({ type: "PRODUCT_SAVE_SUCCESS", payload: data });
    } else {
      const { data } = await axios.put(
        "/api/products/" + product._id,
        product,
        {
          headers: {
            Authorization: "Bearer" + userInfo.token,
          },
        }
      );
      dispatch({ type: "PRODUCT_SAVE_SUCCESS", payload: data });
    }
  } catch (error) {
    dispatch({ type: "PRODUCT_SAVE_FAILED", payload: error.message });
  }
};

const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_DELETE_REQUEST", payload: productId });
      let userInfo = {};
      if (Cookies.get("userInfo")) {
        userInfo = JSON.parse(Cookies.get("userInfo"));
      }
      const { data } = await axios.delete("/api/products/" + productId, {
        headers: {
          Authorization: "Bearer" + userInfo.token,
        },
      });

      dispatch({
        type: "PRODUCT_DELETE_SUCCESS",
        payload: data,
        success: true,
      });
    } catch (error) {
      dispatch({ type: "PRODUCT_DELETE_FAILED", payload: error.message });
    }
  };
};

const detailsProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_DETAILS_REQUEST", payload: productId });
      const { data } = await axios.get(
        "/api/products/" + productId
      );
      // console.log(data);

      dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "PRODUCT_DETAILS_FAILED", payload: error.message });
    }
  };
};

export { listPoducts, detailsProduct, saveProduct, deleteProduct };
