import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentOptionsScreen from "./screens/PaymentOptionsScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import { signout } from "./actions/userActions";
import { listPoductCategories } from "./actions/productActions";
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./screens/OrderListScreen";
import toBeAddedSoonScreeen from "./screens/toBeAddedSoonScreeen";
import UserLIstScreen from "./screens/UserLIstScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import { useEffect, useState } from "react";
import MessageBox from "./components/MessageBox";

function App() {
  const userSignIn = useSelector((state) => state.userSignIn);
  let userInfo = null;
  if (userSignIn.userInfo) {
    ({ userInfo } = userSignIn);
  }
  const cart = useSelector((state) => state.cartDetails);
  let cartItems;
  if (cart) {
    ({ cartItems } = cart);
  }
  let numberofitems = null;
  if (cartItems !== []) {
    numberofitems = cartItems.reduce((curNo, item) => {
      return curNo + item.qty;
    }, 0);
  }

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    if (window.confirm("Are you sure you want to signout?")) {
      dispatch(signout());
    }
  };

  useEffect(() => {
    dispatch(listPoductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              Agro-Tech
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div className="header-links">
            <Link to="/cart">
              Cart{" "}
              {numberofitems !== 0 && (
                <span className="badge">{numberofitems}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orderList">Orders</Link>
                  </li>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/userList">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <p>Loading...</p>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : categories === undefined ? (
              <p>No categories found</p>
            ) : categories.length === 0 ? (
              <MessageBox variant="danger">No Products Found</MessageBox>
            ) : (
              categories.map((c) => {
                return (
                  <li key={c}>
                    <Link
                      to={`/search/category/${c}/name/all`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      {c}
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <AdminRoute
              path="/products"
              component={ProductsScreen}
            ></AdminRoute>
            <Route path="/shipping" component={ShippingScreen}></Route>
            <Route path="/payment" component={PaymentOptionsScreen}></Route>
            <Route path="/signin" component={SignInScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/product/:_id" component={ProductScreen} />
            <Route path="/cart" component={CartScreen}></Route>
            <Route path="/orders/:id" component={OrderScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
              component={SearchScreen}
              exact
            ></Route>
            <AdminRoute
              path="/orderlist"
              component={OrderListScreen}
            ></AdminRoute>
            <AdminRoute
              path="/userList"
              component={UserLIstScreen}
            ></AdminRoute>
            <AdminRoute
              path="/user/:id/edit"
              component={UserEditScreen}
            ></AdminRoute>
            <PrivateRoute
              path="/pay"
              component={toBeAddedSoonScreeen}
            ></PrivateRoute>
            <PrivateRoute
              path="/profile"
              component={ProfileScreen}
            ></PrivateRoute>
            <Route path="/" exact component={HomeScreen} />
          </div>
        </main>
        <footer className="row center">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
