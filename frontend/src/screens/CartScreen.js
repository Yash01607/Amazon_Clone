import React from "react";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/CartActions";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";

const CartScreen = (props) => {
  const cart = useSelector((state) => state.cartDetails);
  let cartItems;
  if (cart) {
    ({ cartItems } = cart);
  }
  // console.log(cartItems);
  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const chechoutHandler = () => {
    props.history.push("signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1 className="cart-name">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            cart is empty. <Link to="/">Go Shopping.</Link>
          </MessageBox>
        ) : (
          <ul className="cart">
            {cartItems.map((item) => (
              <li key={item.key}>
                <div className="row">
                  <div>
                    <img
                      className="small"
                      src={item.image}
                      alt={item.image}
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={"/product/" + item.product} className="name">
                      {item.name}
                    </Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(event) => {
                        dispatch(addToCart(item.product, event.target.value));
                      }}
                    >
                      {Array.from(Array(item.countInStock), (e, i) => {
                        return (
                          <option value={i + 1} key={i}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Remove From Cart
                    </button>
                  </div>
                  <div>
                    <b>
                      <h2>INR.{item.price}</h2>
                    </b>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <div className="row">
            <h3>
              Subtotal: ({cartItems.reduce((a, c) => a + c.qty, 0)} items): INR.
              {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
          </div>
          <button
            onClick={chechoutHandler}
            className="primary block"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
