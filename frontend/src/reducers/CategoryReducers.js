const categoryListsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "CATEGORY_LIST_Request":
      return { loading: true };
    case "CATEGORY_LIST_SUCCESS":
      return { loading: false, categories: action.payload };
    case "CATEGORY_LIST_FAILED":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
function categorySavesReducer(state = { product: {} }, action) {
  // console.log("Created");
  switch (action.type) {
    case "CATEGORY_SAVE_REQUEST":
      return { loading: true };

    case "CATEGORY_SAVE_SUCCESS":
      return { loading: false, success: true, categories: action.payload };

    case "CATEGORY_SAVE_FAILED":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "CATEGORY_DELETE_REQUEST":
      return { loading: true };
    case "CATEGORY_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "CATEGORY_DELETE_FAILED":
      return { loading: false, error: action.payload };
    case "CATEGORY_DELETE_RESET":
      return {};
    default:
      return state;
  }
};

// const userUpdateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "USER_UPDATE_REQUEST":
//       return { loading: true };
//     case "USER_UPDATE_SUCCESS":
//       return { loading: false, success: true };
//     case "USER_UPDATE_FAILED":
//       return { loading: false, error: action.payload };
//     case "USER_UPDATE_RESET":
//       return {};
//     default:
//       return state;
//   }
// };

export { categoryListsReducer, categorySavesReducer, categoryDeleteReducer };
