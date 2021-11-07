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
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./screens/OrderListScreen";
import toBeAddedSoonScreeen from "./screens/toBeAddedSoonScreeen";

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
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Kapil Agencies
            </Link>
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
                </ul>
              </div>
            )}
          </div>
        </header>
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
            <AdminRoute
              path="/orderlist"
              component={OrderListScreen}
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
