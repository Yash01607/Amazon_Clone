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
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./screens/OrderListScreen";
import toBeAddedSoonScreeen from "./screens/toBeAddedSoonScreeen";
import UserLIstScreen from "./screens/UserLIstScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import { listCategories } from "./actions/CategoryActions";
import { useState, useEffect } from "react";
import ProductEditScreen from "./screens/ProductEditScreen";
import ContactScreen from "./screens/ContactScreen";
import { Image } from "cloudinary-react";
import CategoryListScreen from "./screens/CategoryListScreen";
import useScreenDimension from "./hooks/use-ScreenResolution";

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

  const { width } = useScreenDimension();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  // const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [openModal, setopenModal] = useState(false);

  const signoutHandler = () => {
    if (window.confirm("Are you sure you want to signout?")) {
      dispatch(signout());
    }
  };

  return (
    <BrowserRouter>
      <div className="grid-container-2">
        <div className="head-image">
          <Image
            cloudName="df7lcoica"
            publicId="all-page-header_znryqg"
          ></Image>
        </div>
        <div className="back-img">
          <header className="row">
            <div className="header-brand">
              <Link className="brand" to="/">
                Kapil Agencies
              </Link>
            </div>
            {width > 1210 && (
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
            )}
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
                    setShow={setopenModal}
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
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                    Your Cart{" "}
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

            <div className="sec-head-ele">
              <Link className="home" to="/aboutus">
                About Us
              </Link>
            </div>

            <div className="sec-head-ele">
              <Link className="home" to="/contactus">
                Contact Us
              </Link>
            </div>

            {userInfo && (
              <div className="sec-head-ele">
                <Link className="home" to="/orderhistory">
                  <i className="fa fa-history"></i> Your Orders
                </Link>
              </div>
            )}

            <div className="sec-head-ele">
              <Link to="/cart" className="home">
                {width > 1150 && "Cart"}
                {"  "}
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
                  {width > 1150 && userInfo.name}
                </Link>
              ) : (
                <Link to="/signin" className="home">
                  <i className="fa fa-user-circle"></i>
                  {"  "}SignIn
                </Link>
              )}
            </div>

            {userInfo && (
              <div className="sec-head-ele">
                <Link className="home" to="#signout" onClick={signoutHandler}>
                  <i className="fa fa-sign-out"></i> Sign Out
                </Link>
              </div>
            )}

            <div>
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown sec-head-ele">
                  Admin
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
                    <li>
                      <Link to="categorylist">Categories</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
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
              path="/categorylist"
              component={CategoryListScreen}
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
