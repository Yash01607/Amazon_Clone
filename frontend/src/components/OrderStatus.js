import React from "react";

const OrderStatus = (props) => {
  const status = props.status;

  return (
    <div className="order_status_dots">
      <div>
        <span className={status ? "yellow_dot" : "black_dot"}></span>
      </div>
      <div>
        <span className={status ? "yellow_dot" : "black_dot"}></span>
      </div>
      <div>
        <span className={status ? "yellow_dot_name" : "black_dot_name"}></span>
      </div>
      {!props.last && (
        <div>
          <span className={status ? "yellow_dot" : "black_dot"}></span>
        </div>
      )}
      {!props.last && (
        <div>
          <span className={status ? "yellow_dot" : "black_dot"}></span>
        </div>
      )}
    </div>
  );
};

OrderStatus.propTypes = {};

export default OrderStatus;
