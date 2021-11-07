const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return { loading: true };

    case "ORDER_CREATE_SUCCESS":
      return { loading: false, success: true, order: action.payload };

    case "ORDER_CREATE_FAIL":
      return { loading: false, error: action.payload };

    case "ORDER_CREATE_RESET":
      return {};

    default:
      return state;
  }
};

const orderDetailReducer = (state = { loading: true, order: {} }, action) => {
  switch (action.type) {
    case "ORDER_DETAIL_REQUEST":
      return { loading: true };

    case "ORDER_DETAIL_SUCCESS":
      return { loading: false, order: action.payload };

    case "ORDER_DETAILS_FAILED":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const orderMineListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDER_MINE_LIST_REQUEST":
      return { loading: true };

    case "ORDER_MINE_LIST_SUCCESS":
      return { loading: false, orders: action.payload };

    case "ORDER_MINE_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDER_LIST_REQUEST":
      return { loading: true };

    case "ORDER_LIST_SUCCESS":
      return { loading: false, orders: action.payload };

    case "ORDER_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_DELETE_REQUEST":
      return { loading: true };

    case "ORDER_DELETE_SUCCESS":
      return { loading: false, success: true };

    case "ORDER_DELETE_FAIL":
      return { loading: false, error: action.payload };

    case "ORDER_DELETE_RESET":
      return {};

    default:
      return state;
  }
};

const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_DELIVER_REQUEST":
      return { loading: true };
    case "ORDER_DELIVER_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_DELIVER_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_DELIVER_RESET":
      return {};
    default:
      return state;
  }
};

const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_PAY_REQUEST":
      return { loading: true };
    case "ORDER_PAY_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_PAY_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_PAY_RESET":
      return {};
    default:
      return state;
  }
};

export {
  orderCreateReducer,
  orderDetailReducer,
  orderMineListReducer,
  orderListReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderPayReducer,
};
