function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case "PRODUCT_LIST_Request":
      return { loading: true, products: [] };

    case "PRODUCT_LIST_SUCCESS":
      return { loading: false, products: action.payload };

    case "PRODUCT_LIST_FAILED":
      // console.log("Failed");
      return { loading: false, error: action.payload, products: [] };

    default:
      return state;
  }
}
function reviewCreateReducer(state = { product: {} }, action) {
  // console.log("Created");
  switch (action.type) {
    case "PRODUCT_REVIEW_CREATE_REQUEST":
      return { loading: true };

    case "PRODUCT_REVIEW_CREATE_SUCCESS":
      return { loading: false, success: true, review: action.payload };

    case "PRODUCT_REVIEW_CREATE_FAILED":
      return { loading: false, error: action.payload };

    case "PRODUCT_REVIEW_CREATE_RESET":
      return {};

    default:
      return state;
  }
}
function productDeleteReducer(state = { product: {} }, action) {
  switch (action.type) {
    case "PRODUCT_DELETE_REQUEST":
      return { loading: true };

    case "PRODUCT_DELETE_SUCCESS":
      return { loading: false, product: action.payload, success: true };

    case "PRODUCT_DELETE_FAILED":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}
function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { loading: true };

    case "PRODUCT_DETAILS_SUCCESS":
      return { loading: false, product: action.payload };

    case "PRODUCT_DETAILS_FAILED":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}
function productSavesReducer(state = { product: {} }, action) {
  // console.log("Created");
  switch (action.type) {
    case "PRODUCT_SAVE_REQUEST":
      return { loading: true };

    case "PRODUCT_SAVE_SUCCESS":
      return { loading: false, success: true, product: action.payload };

    case "PRODUCT_SAVE_FAILED":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

export {
  productListReducer,
  reviewCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productSavesReducer,
};
