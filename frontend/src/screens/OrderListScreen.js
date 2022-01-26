import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { listOrders, deletedOrder } from "../actions/OrderActions";

function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  let loading,
    error,
    orders = [];
  if (orderList) {
    ({ loading, error, orders } = orderList);
  }

  // console.log(orders);

  const orderDelete = useSelector((state) => state.orderDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ORDER_DELETE_RESET" });
    dispatch(listOrders());
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deletedOrder(order._id));
    }
  };

  return (
    <div className="main-pad">
      <h1 className="heading">Orders</h1>
      {loadingDelete && <p>Deleting...</p>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <p>Loading....</p>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Total Price</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id || "id"}</td>
                <td>
                  {order.user && order.user.name
                    ? order.user.name
                    : "Name_Not_Available"}
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  <i className="fa fa-inr"></i>
                  <strong>{order.totalPrice}</strong>
                </td>
                {order.isPaid ? (
                  <td className="success-sts">
                    {order.paidAt.substring(0, 10)}
                  </td>
                ) : (
                  <td className="danger-sts">Not Paid</td>
                )}

                {order.isDelivered ? (
                  <td className="success-sts">
                    {order.deliveredAt.substring(0, 10)}
                  </td>
                ) : (
                  <td className="danger-sts">Not Delivered</td>
                )}

                <td>
                  <button
                    type="button"
                    className="details"
                    onClick={() => {
                      props.history.push(`/orders/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => {
                      deleteHandler(order);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderListScreen;
