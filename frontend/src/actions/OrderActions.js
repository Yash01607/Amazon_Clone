import axios from "axios";
import Cookies from "js-cookie";

const createOrder = (order) => async (dispatch) => {
  dispatch({ type: "ORDER_CREATE_REQUEST", payload: order });
  try {
    let userInfo = {};
    if (Cookies.get("userInfo")) {
      userInfo = JSON.parse(Cookies.get("userInfo"));
    }
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer${userInfo.token}`,
      },
    });

    dispatch({ type: "ORDER_CREATE_SUCCESS", payload: data.order });
    dispatch({ type: "CART_EMPTY", payload: data.order });
    Cookies.remove("cartItems");
  } catch (error) {
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const detailsOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "ORDER_DETAIL_REQUEST", payload: orderId });
  try {
    let userInfo = {};
    if (Cookies.get("userInfo")) {
      userInfo = JSON.parse(Cookies.get("userInfo"));
    }
    // console.log(userInfo);
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer${userInfo.token}`,
      },
    });
    dispatch({ type: "ORDER_DETAIL_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "ORDER_DETAILS_FAILED", payload: message });
  }
};

const listOrderMine = () => async (dispatch) => {
  dispatch({ type: "ORDER_MINE_LIST_REQUEST" });
  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }
  try {
    const { data } = await axios.get("/api/orders/mine", {
      headers: {
        Authorization: `Bearer${userInfo.token}`,
      },
    });
    // console.log(data);
    dispatch({ type: "ORDER_MINE_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "ORDER_MINE_LIST_FAIL", payload: message });
  }
};

const listOrders = () => async (dispatch) => {
  dispatch({ type: "ORDER_LIST_REQUEST" });
  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }
  try {
    const { data } = await axios.get("/api/orders", {
      headers: {
        Authorization: `Bearer${userInfo.token}`,
      },
    });
    dispatch({ type: "ORDER_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "ORDER_LIST_FAIL", payload: message });
  }
};

const deletedOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "ORDER_DELETE_REQUEST", payload: orderId });
  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }
  try {
    const { data } = await axios.delete(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer${userInfo.token}`,
      },
    });
    dispatch({ type: "ORDER_DELETE_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "ORDER_DELETE_FAIL", payload: message });
  }
};

const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: "ORDER_DELIVER_REQUEST", payload: orderId });
  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }
  try {
    const { data } = await axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer${userInfo.token}` },
      }
    );
    // console.log(data.order);
    dispatch({ type: "ORDER_DELIVER_SUCCESS", payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "ORDER_DELIVER_FAIL", payload: message });
  }
};

const packOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "ORDER_PACK_REQUEST", payload: orderId });
  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }
  try {
    const { data } = await axios.put(
      `/api/orders/${orderId}/pack`,
      {},
      {
        headers: { Authorization: `Bearer${userInfo.token}` },
      }
    );
    // console.log(data.order);
    dispatch({ type: "ORDER_PACK_SUCCESS", payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "ORDER_PACK_FAIL", payload: message });
  }
};

const dispatchOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "ORDER_DISPATCH_REQUEST", payload: orderId });
  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }
  try {
    const { data } = await axios.put(
      `/api/orders/${orderId}/dispatch`,
      {},
      {
        headers: { Authorization: `Bearer${userInfo.token}` },
      }
    );
    // console.log(data.order);
    dispatch({ type: "ORDER_DISPATCH_SUCCESS", payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "ORDER_DISPATCH_FAIL", payload: message });
  }
};

const payOrder = (order, paymentResult) => (dispatch) => {
  dispatch({ type: "ORDER_PAY_REQUEST", payload: { order, paymentResult } });
  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }
  try {
    // console.log(`in Order Pay ACtion ${order}`);
    const { data } = axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer${userInfo.token}` },
    });
    dispatch({ type: "ORDER_PAY_SUCCESS", payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // console.log(error);
    dispatch({ type: "ORDER_PAY_FAIL", payload: message });
  }
};
export {
  createOrder,
  detailsOrder,
  listOrderMine,
  listOrders,
  deletedOrder,
  payOrder,
  deliverOrder,
  packOrder,
  dispatchOrder,
};
