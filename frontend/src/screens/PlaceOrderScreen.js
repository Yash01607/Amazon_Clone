import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/OrderActions";
import MessageBox from "../components/MessageBox";
import { Image } from "cloudinary-react";

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cartDetails);
  // console.log(cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);

  let loading, success, error, order;
  if (orderCreate) {
    ({ loading, success, error, order } = orderCreate);
  }

  // console.log(shipping);
  if (shippingAddress && !shippingAddress.address) {
    props.history.push("/shipping");
  } else if (paymentMethod && !paymentMethod.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  cart.itemsPrice = itemsPrice;
  cart.taxPrice = taxPrice;
  cart.shippingPrice = shippingPrice;
  cart.totalPrice = totalPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/orders/${order._id}`);
      dispatch({ type: "ORDER_CREATE_RESET" });
    }
  }, [success, dispatch, order, props.history]);

  return (
    <div className="main-pad">
      <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card-1 card-body">
                <h3>Shipping</h3>
                <p>
                  <strong>Name: </strong>
                  {shippingAddress.fullName}
                </p>
                <p>
                  <strong>Address: </strong>
                  {shippingAddress.address},{shippingAddress.city},
                  {shippingAddress.postalCode},{shippingAddress.state},
                  {shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card-1 card-body">
                <h3>Payment</h3>
                <p>
                  <strong>Method: </strong>
                  {cart.paymentMethod.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card-1 card-body">
                <h1>Order Items</h1>
                <table className="table">
                  <thead>
                    <th>ITEM</th>
                    <th> </th>
                    <th>PRICE</th>
                    <th>Quantity</th>
                    <th>TOTAL</th>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr>
                        <td>
                          <Link
                            to={"/product/" + item.product}
                            className="name"
                          >
                            {item && item.image && item.image.data && (
                              <Image
                                cloudName="df7lcoica"
                                publicId={item.image.data.public_id}
                                crop="scale"
                                width="300"
                              ></Image>
                            )}
                          </Link>
                        </td>
                        <td className="table-name">
                          <Link
                            to={"/product/" + item.product}
                            className="name"
                          >
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
                        <td>{item.qty}</td>
                        <td>
                          <b>
                            <h2>
                              <i className="fa fa-inr"></i>
                              {item.qty * item.price}
                            </h2>
                          </b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card-1 card-body">
            <ul>
              <li>
                <h3>Order Summary</h3>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>
                    <i className="fa fa-inr"></i>
                    {itemsPrice}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>
                    <i className="fa fa-inr"></i>
                    {shippingPrice}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>
                    <i className="fa fa-inr"></i>
                    {taxPrice}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>
                      <i className="fa fa-inr"></i>
                      {totalPrice}
                    </strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className=" primary block"
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <p>Loading...</p>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
