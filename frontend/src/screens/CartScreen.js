import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/CartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'cloudinary-react';
import MessageBox from '../components/MessageBox';

const CartScreen = (props) => {
  const cart = useSelector((state) => state.cartDetails);
  let cartItems;
  if (cart) {
    ({ cartItems } = cart);
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const chechoutHandler = () => {
    navigate('signin?redirect=shipping');
  };

  const addCouponHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="top main-pad">
      <div className="col-2">
        <h1 className="cart-name">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty.{' '}
            <Link
              to={`/search/category/all/name/all/min/0/max/99999/rating/0/order/newest`}
            >
              <button>Go Shopping.</button>
            </Link>
          </MessageBox>
        ) : (
          <>
            <Link
              to={`/search/category/all/name/all/min/0/max/99999/rating/0/order/newest`}
            >
              <button>Continue Shopping.</button>
            </Link>
            <table className="table">
              <thead>
                <th>ITEM</th>
                <th> </th>
                <th>PRICE</th>
                <th>Quantity</th>
                <th className="total">TOTAL</th>
                <th>REMOVE</th>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr>
                    <td>
                      <Link to={'/product/' + item.product} className="name">
                        {item && item.image && item.image.data && (
                          <Image
                            cloudName="df7lcoica"
                            publicId={item.image.data.public_id}
                          ></Image>
                        )}
                      </Link>
                    </td>
                    <td className="table-name">
                      <Link to={'/product/' + item.product} className="name">
                        {item.name}
                      </Link>
                    </td>
                    <td>
                      <b>
                        <h2>
                          <i className="fa fa-inr"></i>
                          {item.price}
                        </h2>
                      </b>
                    </td>
                    <td>
                      <input
                        value={item.qty}
                        onChange={(event) => {
                          dispatch(addToCart(item.product, event.target.value));
                        }}
                        type={'number'}
                        min={0}
                        max={item.countInStock}
                      ></input>
                    </td>
                    <td className="total">
                      <b>
                        <h2>
                          <i className="fa fa-inr"></i>
                          {item.qty * item.price}
                        </h2>
                      </b>
                    </td>
                    <td>
                      <button
                        className="delete"
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      {cartItems.length !== 0 && (
        <div className="row">
          <div>
            <form className="Coupon-Form" onSubmit={addCouponHandler}>
              <input
                type="text"
                id="Coupon"
                label="Enter Coupon Code"
                placeholder="Enter Coupon Code"
              ></input>
              <button type="submit">Apply Coupon</button>
            </form>
          </div>
          <div>
            <div className="row">
              <h3>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items):{' '}
                <i className="fa fa-inr"></i>
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h3>
            </div>
          </div>
        </div>
      )}
      {cartItems.length !== 0 && (
        <div>
          <button
            onClick={chechoutHandler}
            className="primary block"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
