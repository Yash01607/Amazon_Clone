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

export { productListReducer, reviewCreateReducer };
