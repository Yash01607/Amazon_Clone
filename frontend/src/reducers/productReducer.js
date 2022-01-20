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

export { productListReducer };
