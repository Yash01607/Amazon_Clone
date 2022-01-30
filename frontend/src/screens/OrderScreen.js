import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsOrder,
  deliverOrder,
  payOrder,
  packOrder,
  dispatchOrder,
} from "../actions/OrderActions";
import Cookies from "js-cookie";
import MessageBox from "../components/MessageBox";
import { Image } from "cloudinary-react";
import OrderStatus from "../components/OrderStatus";

const OrderScreen = (props) => {
  const orderId = props.match.params.id;

  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const orderPack = useSelector((state) => state.orderPack);
  const {
    loading: loadingPack,
    error: errorPack,
    success: successPack,
  } = orderPack;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = orderPay;

  const orderDispatch = useSelector((state) => state.orderDispatch);
  const {
    loading: loadingDispatch,
    success: successDispatch,
    error: errorDispatch,
  } = orderDispatch;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!order || successPay || (order && order._id !== orderId)) {
      if (!order || successDeliver || (order && order._id !== orderId)) {
        dispatch(detailsOrder(orderId));
      }
    }
  }, [dispatch, orderId, successDeliver, order, successPay]);

  // console.log(order);

  const paymentHandler = () => {
    props.history.push("/pay");
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  const packingHandler = () => {
    dispatch(packOrder(order._id));
  };

  const dispatchHandler = () => {
    dispatch(dispatchOrder(order._id));
  };

  const adminPaymentHandler = () => {
    // setpaymentResult(!paymentResult);
    dispatch(payOrder(order._id));
  };

  // console.log(order);

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
                    <tr>
                      <th>ITEM</th>
                      <th> </th>
                      <th>PRICE</th>
                      <th>Quantity</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.length === 0 ? (
                      <div>cart is empty</div>
                    ) : (
                      order.orderItems.map((item) => (
                        <tr key={item._id}>
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
            </ul>
          </div>
          <div className="card-1 card-body">
            <div className="order_status">
              <div className="row">
                <h2>Paid</h2>
                <OrderStatus status={order.isPaid} last={false} />
                {order.paidAt ? (
                  <p>
                    Paid At: <br></br> {order.paidAt.substring(0, 10)} (
                    {order.paidAt.substring(11, 19)})
                  </p>
                ) : (
                  <p>Not Paid</p>
                )}
              </div>
              <div className="row">
                <h2>Packed</h2>
                <OrderStatus status={order.isPacked} last={false}></OrderStatus>
                {order.packedAt ? (
                  <p>
                    Packed At: <br></br>
                    {order.packedAt.substring(0, 10)} (
                    {order.packedAt.substring(11, 19)})
                  </p>
                ) : (
                  <p>To be Packed.</p>
                )}
              </div>
              <div className="row">
                <h2>Dispatched</h2>
                <OrderStatus
                  status={order.isDispatched}
                  last={false}
                ></OrderStatus>
                {order.dispatchedAt ? (
                  <p>
                    Dispatched At: <br></br>
                    {order.dispatchedAt.substring(0, 10)} (
                    {order.dispatchedAt.substring(11, 19)})
                  </p>
                ) : (
                  <p>To be Dispatched </p>
                )}
              </div>
              <div className="row last">
                <h2>Delivered</h2>
                <OrderStatus
                  status={order.isDelivered}
                  last={true}
                ></OrderStatus>
                {order.deliveredAt ? (
                  <p>
                    Delivered At: <br></br>
                    {order.deliveredAt.substring(0, 10)} (
                    {order.deliveredAt.substring(11, 19)})
                  </p>
                ) : (
                  <p>To be Delivered.</p>
                )}
              </div>
            </div>
          </div>
          {userInfo.isAdmin && (
            <div>
              <div className="card-1 card-body">
                <div className="row">
                  <h2>Payment Status</h2>
                  <MessageBox variant={order.isPaid ? "success" : "danger"}>
                    {" "}
                    <p>{order.isPaid ? "Paid" : "Not Paid"}</p>
                  </MessageBox>
                  <button
                    type="button"
                    className={order.isPaid ? "delete" : "details"}
                    onClick={adminPaymentHandler}
                  >
                    Set {order.isPaid ? "Not Paid" : "Paid"}
                  </button>
                </div>
                <div>Updated by: {order.paidBy}</div>
                {loadingPay && <p>Loading...</p>}
                {errorPay && (
                  <MessageBox variant="success">
                    Payment Status updated successfully. Please Refresh to see
                    Changes
                  </MessageBox>
                )}
                {successPay && (
                  <MessageBox variant="success">
                    Payment Status updated successfully. Please Refresh to view
                    Changes
                  </MessageBox>
                )}
              </div>

              <div className="card-1 card-body">
                <div className="row">
                  <h2>Packing Status</h2>
                  <MessageBox variant={order.isPacked ? "success" : "danger"}>
                    {" "}
                    <p>{order.isPacked ? "Packed" : "Not Packed"}</p>
                  </MessageBox>
                  <button
                    type="button"
                    className={order.isPacked ? "delete" : "details"}
                    onClick={packingHandler}
                  >
                    Set {order.isPacked ? "Not Packed" : "Packed"}
                  </button>
                </div>
                <div>Updated by: {order.packedBy}</div>
                {loadingPack && <p>Loading...</p>}
                {errorPack && (
                  <MessageBox variant="danger">{errorPack}</MessageBox>
                )}
                {successPack && (
                  <MessageBox variant="success">
                    Packing Status updated successfully. Please Refresh to view
                    Changes
                  </MessageBox>
                )}
              </div>

              <div className="card-1 card-body">
                <div className="row">
                  <h2>Dispatch Status</h2>
                  <MessageBox
                    variant={order.isDispatched ? "success" : "danger"}
                  >
                    {" "}
                    <p>
                      {order.isDispatched ? "Dispatched" : "Not Dispatched"}
                    </p>
                  </MessageBox>
                  <button
                    type="button"
                    className={order.isDispatched ? "delete" : "details"}
                    onClick={dispatchHandler}
                  >
                    Set {order.isDispatched ? "Not Dispatched" : "Dispatched"}
                  </button>
                </div>
                <div>Updated by: {order.dispatchedBy}</div>
                {loadingDispatch && <p>Loading...</p>}
                {errorDispatch && (
                  <MessageBox variant="danger">{errorPack}</MessageBox>
                )}
                {successDispatch && (
                  <MessageBox variant="success">
                    Dispatch Status updated successfully. Please Refresh to view
                    Changes
                  </MessageBox>
                )}
              </div>

              <div className="card-1 card-body">
                <div className="row">
                  <h2 style={{ margin: "0rem" }}>Delivery Status</h2>
                  <MessageBox
                    variant={order.isDelivered ? "success" : "danger"}
                  >
                    {" "}
                    <p>{order.isDelivered ? "Delivered" : "Not Delivered"}</p>
                  </MessageBox>
                  <button
                    type="button"
                    className={order.isDelivered ? "delete" : "details"}
                    onClick={deliverHandler}
                  >
                    Set {order.isDelivered ? "Not Delivered" : "Delivered"}
                  </button>
                </div>
                <div>Updated by: {order.deliveredBy}</div>
                {loadingDeliver && <p>Loading...</p>}
                {errorDeliver && (
                  <MessageBox variant="danger">{errorPack}</MessageBox>
                )}
                {successDeliver && (
                  <MessageBox variant="success">
                    Delivery Status updated successfully. Please Refresh to view
                    Changes
                  </MessageBox>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
