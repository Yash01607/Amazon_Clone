import Cookies from "js-cookie";

const cartReducer = (
  state = { cartItems: [], shipping: {}, payment: {} },
  action
) => {
  let updatedItems;
  switch (action.type) {
    case "CART_ADD_ITEM":
      const existingItem = state.cartItems.findIndex(
        (item) => item.product === action.payload.product
      );
      const existingCartItem = state.cartItems[existingItem];

      let updatedItem;
      if (existingItem >= 0) {
        updatedItem = {
          ...existingCartItem,
          qty: action.payload.qty,
        };
        updatedItems = [...state.cartItems];
        updatedItems[existingItem] = updatedItem;
      } else {
        updatedItems = state.cartItems.concat(action.payload);
      }

      Cookies.set("cartItems", JSON.stringify(updatedItems));
      return {
        cartItems: updatedItems,
      };

    case "CART_REMOVE_ITEM":
      updatedItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
      Cookies.set("cartItems", JSON.stringify(updatedItems));

      return {
        cartItems: updatedItems,
      };
    case "CART_SAVE_SHIPPING":
      return { ...state, shippingAddress: action.payload };
    case "CART_SAVE_PAYMENT":
      return { ...state, paymentMethod: action.payload };
    case "CART_EMPTY":
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

export default cartReducer;
