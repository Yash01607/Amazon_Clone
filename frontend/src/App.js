import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import CreateProductScreen from "./screens/CreateProductScreen";
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
// import { images } from "";
import ProductEditScreen from "./screens/ProductEditScreen";
import ContactScreen from "./screens/ContactScreen";

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
  const [openModal, setopenModal] = useState(false);

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
      <div className="grid-container-2">
        <div className="head-image">
          <img
            src="https://sps.honeywell.com/content/dam/honeywell-edam/sps/common/en-us/industries/infrastructure/agriculture/images/sps-agriculture-hero.jpg"
            alt="head"
          ></img>
        </div>
        <div className="back-img">
          <header className="row">
            <div className="header-brand">
              <Link className="brand" to="/">
                Kapil Agencies
              </Link>
            </div>
            <div className="row cont-info">
              <i className="fa fa-envelope header-icon"></i>
              <p>{"admin-yash@kapilagencies.com"}</p>
            </div>
            <div className="row cont-info">
              <i className="fa fa-phone header-icon"></i>
              <p>{"+91-9491818181"}</p>
            </div>
            <div className="row header-soc-icon">
              <div>
                <i className="fa fa-facebook"></i>
              </div>
              <div>
                <i className="fa fa-twitter"></i>
              </div>
              <div>
                <i className="fa fa-instagram"></i>
              </div>
              <div>
                <i className="fa fa-youtube"></i>
              </div>
            </div>
          </header>
          <div className="row sec-head">
            <div className="sec-head-ele">
              <i
                className="fa fa-search fa-lg home"
                onClick={() => {
                  setopenModal(true);
                }}
              ></i>

              <Route
                render={({ history }) => (
                  <SearchBox
                    onClose={() => {
                      setopenModal(false);
                    }}
                    show={openModal}
                    history={history}
                  ></SearchBox>
                )}
              ></Route>
            </div>

            <div className="sec-head-ele">
              <Link className="home" to="/">
                Home
              </Link>
            </div>
            <div className="dropdown sec-head-ele">
              Shop
              <ul className="dropdown-content">
                <li>
                  <Link
                    to={`/search/category/all/name/all/min/0/max/99999/rating/0/order/newest`}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                    Cart{" "}
                    {numberofitems !== 0 && (
                      <span className="badge">{numberofitems}</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/shipping">Checkout</Link>
                </li>
              </ul>
            </div>
            <div className="sec-head-ele">About Us</div>
            <div className="sec-head-ele">
              <Link className="home" to="/contactus">
                Contact Us
              </Link>
            </div>
            <div className="sec-head-ele">
              <Link to="/cart" className="home">
                Cart{"  "}
                <i className="fa fa-shopping-cart"></i>
                {numberofitems !== 0 && (
                  <span className="badge">{numberofitems}</span>
                )}
              </Link>
            </div>
            <div className="sec-head-ele">
              {userInfo ? (
                <Link to="/profile" className="home">
                  <i className="fa fa-user-circle"></i>
                  {"  "}
                  {userInfo.name}
                </Link>
              ) : (
                <Link to="/signin" className="home">
                  <i className="fa fa-user-circle"></i>
                  {"  "}SignIn
                </Link>
              )}
            </div>
            {/* <div>
                {userInfo && (
                  <Link className="home" to="/profile">
                    {userInfo.name}
                  </Link>
                )}
              </div> */}
            <div className="sec-head-ele">
              <Link className="home" to="#signout" onClick={signoutHandler}>
                Sign Out
              </Link>
            </div>
            <div>
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin" className="home">
                    Admin <i className="fa fa-caret-down sec-head-ele"></i>
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
            {/* {userInfo ? (
              <div className="dropdown sec-head">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )} */}
            {/* <div className="header-links">
              <Link to="/cart">
                <i className="fa fa-shopping-cart fa-2x sec-head-ele"></i>
                {numberofitems !== 0 && (
                  <span className="badge">{numberofitems}</span>
                )}
              </Link>
              {userInfo ? (
                <div className="row">
                  <div></div>
                  <Link to="/profile">
                    <i className="fa fa-user-circle fa-2x sec-head-ele"></i>
                    <h2>{userInfo.name}</h2>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">
                  <i className="fa fa-user-circle fa-2x sec-head-ele"></i>Sign
                  In
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    Admin <i className="fa fa-caret-down sec-head-ele"></i>{" "}
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
            </div> */}
          </div>
          {/* {document.location.pathname === "/" && (
            <div className="title">
              <h3 className="title-intro">
                We have the best agricultural products...
              </h3>
              <h1 className="title-name"> WELCOME TO KAPIL AGENCIES</h1>
              <Link
                to={`/search/category/all/name/all/min/0/max/99999/rating/0/order/newest`}
              >
                <button className="title-button">Discover More</button>
              </Link>
            </div>
          )} */}
        </div>
        {/* <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li className="aside-title">
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
                      to={`/search/category/${c}/name/all/min/0/max/99999/rating/0/order/newest`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      {c}
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </aside> */}
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
            <Route path="/contactus" component={ContactScreen}></Route>
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
            <AdminRoute
              path="/ProductEditScreen/:id"
              component={ProductEditScreen}
            ></AdminRoute>
            <AdminRoute
              path="/Createprodct"
              component={CreateProductScreen}
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
