import axios from "axios";
import Cookies from 'js-cookie';

const addToCart = (productId, qty) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://127.0.0.1:5000/api/products/" + productId
    );
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        key: data._id,
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: +qty,
      },
    });
  } catch (error) {}
};

const removeFromCart = (productId) => async (dispatch) => {
  dispatch({ type: "CART_REMOVE_ITEM", payload: productId });
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_SHIPPING", payload: data });
  Cookies.set("shippingAddress",JSON.stringify(data));
};

const savePayment = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_PAYMENT", payload: data });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
