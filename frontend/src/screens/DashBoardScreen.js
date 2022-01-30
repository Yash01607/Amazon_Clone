import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-google-charts";
import { summaryOrder } from "../actions/OrderActions";
import MessageBox from "../components/MessageBox";

const DashBoardScreen = () => {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);

  return (
    <div className="main-pad">
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users">Users</i>
                </span>
              </div>
              <div className="summary-body">
                {summary && summary.users[0].numUsers}
              </div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart">Orders</i>
                </span>
              </div>
              <div className="summary-body">
                {summary && summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money">Sales</i>
                </span>
              </div>
              <div className="summary-body">
                <i className="fa fa-inr"></i>
                {summary && summary.orders[0]
                  ? summary.orders[0].totalSales
                  : 0}
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>Sales</h2>
            </div>
            {summary.dailyOrders.length === 0 ? (
              <MessageBox>No Sales</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ["Date", "Sales"],
                  ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </div>

          <div>
            <div>
              <h2>Product Category</h2>
            </div>
            {summary.productCategories.length === 0 ? (
              <MessageBox>No Categories</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ["Category", "Products"],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoardScreen;
