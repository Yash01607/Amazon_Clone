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
  
  export default productDeleteReducer;
  