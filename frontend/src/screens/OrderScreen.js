import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder, deliverOrder, payOrder } from "../actions/OrderActions";
import Cookies from "js-cookie";
import MessageBox from "../components/MessageBox";
import { Image } from "cloudinary-react";

const OrderScreen = (props) => {
  const [paymentResult, setpaymentResult] = useState(false);

  const orderId = props.match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, loading, error } = orderDetails;

  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }

  // console.log("orderScreen");

  const orderDeliver = useSelector((state) => state.orderDeliver);
  // let successDeliver = false;
  // let loadingDeliver;
  // let errorDeliver;
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay);

  const { loading: loadingPay, success: successPay } = orderPay;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!order || successPay || (order && order._id !== orderId)) {
      if (!order || successDeliver || (order && order._id !== orderId)) {
        dispatch({ type: "ORDER_DELIVER_RESET" });
        dispatch({ type: "ORDER_PAY_RESET" });
        dispatch(detailsOrder(orderId));
      }
    }
  }, [dispatch, orderId, successDeliver, order, successPay]);

  // console.log(order);

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  const paymentHandler = () => {
    props.history.push("/pay");
  };

  const adminPaymentHandler = () => {
    if (order) {
      setpaymentResult(!paymentResult);
      dispatch(payOrder(order, paymentResult));
    }
  };

  return loading ? (
    <p className="loading">Loading...</p>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="main-pad">
      <h1 className="heading">Order# {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card-1 card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {order.shippingAddress.fullName}{" "}
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.state},{order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at: {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card-1 card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Payment Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at: {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card-1 card-body">
                <h2>Order Items</h2>
                <table className="table">
                  <thead>
                    <th>ITEM</th>
                    <th> </th>
                    <th>PRICE</th>
                    <th>Quantity</th>
                    <th>TOTAL</th>
                  </thead>
                  <tbody>
                    {order.orderItems.length === 0 ? (
                      <div>cart is empty</div>
                    ) : (
                      order.orderItems.map((item) => (
                        <tr>
                          <td>
                            <Link to={"/product/" + item.product}>
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
                      ))
                    )}
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
                <div className="row">
                  <div>Items</div>
                  <div>
                    <i className="fa fa-inr"></i>
                    {order.itemsPrice}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>
                    <i className="fa fa-inr"></i>
                    {order.shippingPrice}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>
                    <i className="fa fa-inr"></i>
                    {order.taxPrice}
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
                      {order.totalPrice}
                    </strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  <button
                    type="button"
                    className="block primary"
                    onClick={paymentHandler}
                  >
                    Pay
                  </button>
                </li>
              )}
              {userInfo.isAdmin && !order.isDelivered && (
                <>
                  <li>
                    <button
                      type="button"
                      className="block primary"
                      onClick={deliverHandler}
                    >
                      Deliver
                    </button>
                  </li>
                  {loadingDeliver && <li>Loading...</li>}
                  {errorDeliver && (
                    <li>
                      <MessageBox variant="danger">{errorDeliver}</MessageBox>
                    </li>
                  )}
                </>
              )}
              {userInfo.isAdmin && !order.isPaid && (
                <>
                  <li>
                    <button
                      type="button"
                      className="block primary"
                      onClick={adminPaymentHandler}
                    >
                      Set order to paid.
                    </button>
                  </li>
                  {loadingPay && <li>Loading...</li>}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
