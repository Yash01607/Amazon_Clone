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

function productCategoryListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case "PRODUCT_CATEGORY_LIST_Request":
      return { loading: true, categories: [] };

    case "PRODUCT_CATEGORY_LIST_SUCCESS":
      return { loading: false, categories: action.payload };

    case "PRODUCT_CATEGORY_LIST_FAILED":
      // console.log("Failed");
      return { loading: false, error: action.payload, categories: [] };

    default:
      return state;
  }
}

export { productListReducer, productCategoryListReducer };
