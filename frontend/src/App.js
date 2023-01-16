import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import CreateProductScreen from './screens/CreateProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentOptionsScreen from './screens/PaymentOptionsScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import OrderListScreen from './screens/OrderListScreen';
import toBeAddedSoonScreeen from './screens/toBeAddedSoonScreeen';
import UserLIstScreen from './screens/UserLIstScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listCategories } from './actions/CategoryActions';
import { useState, useEffect } from 'react';
import ProductEditScreen from './screens/ProductEditScreen';
import ContactScreen from './screens/ContactScreen';
import { Image } from 'cloudinary-react';
import CategoryListScreen from './screens/CategoryListScreen';
import useScreenDimension from './hooks/use-ScreenResolution';
import DashBoardScreen from './screens/DashBoardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';

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
    if (window.confirm('Are you sure you want to signout?')) {
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

              <SearchBox
                onClose={() => {
                  setopenModal(false);
                }}
                show={openModal}
                setShow={setopenModal}
              ></SearchBox>
            </div>

            <div className="sec-head-ele">
              <Link className="home" to="/">
                Home
              </Link>
            </div>

            <div className="dropdown sec-head-ele">
              <Link
                className="home"
                to="/search/category/all/name/all/min/0/max/99999/rating/0/order/newest"
              >
                Shop
              </Link>
              <ul className="dropdown-content">
                <Link
                  to={`/search/category/all/name/all/min/0/max/99999/rating/0/order/newest`}
                >
                  <li>All Products</li>
                </Link>

                <Link to="/cart">
                  <li>
                    Your Cart{' '}
                    {numberofitems !== 0 && (
                      <span className="badge">{numberofitems}</span>
                    )}
                  </li>
                </Link>

                <Link to="/shipping">
                  <li>Checkout</li>
                </Link>
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
                {width > 1150 && 'Cart'}
                {'  '}
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
                  {'  '}
                  {width > 1150 && userInfo.name}
                </Link>
              ) : (
                <>
                  <Link to="/signin" className="home">
                    <i className="fa fa-user-circle"></i>
                    {'  '}SignIn
                  </Link>
                </>
              )}
            </div>
            {!userInfo && (
              <div className="sec-head-ele">
                <Link to="/register" className="home">
                  <i className="fa fa-user-plus"></i>
                  {'  '}Register
                </Link>
              </div>
            )}

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
                    <Link to="/dashboard">
                      <li>Dashboard</li>
                    </Link>
                    <Link to="/orderList">
                      <li>Orders</li>
                    </Link>
                    <Link to="/products">
                      <li>Products</li>
                    </Link>
                    <Link to="/userList">
                      <li>Users</li>
                    </Link>
                    <Link to="categorylist">
                      <li>Categories</li>
                    </Link>
                    <Link to="/support">
                      <li>Support</li>
                    </Link>
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
            <Routes>
              <Route path="/shipping" element={<ShippingScreen />}></Route>
              <Route path="/payment" element={<PaymentOptionsScreen />}></Route>
              <Route path="/signin" element={<SignInScreen />}></Route>
              <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
              <Route path="/register" element={<RegisterScreen />}></Route>
              <Route path="/product/:_id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />}></Route>
              <Route path="/orders/:id" element={<OrderScreen />}></Route>
              <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>
              <Route path="/contactus" element={<ContactScreen />}></Route>
              <Route
                path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
                element={<SearchScreen />}
                exact
              ></Route>

              {/* Admin routes for here */}

              <Route
                path="/products"
                element={
                  <AdminRoute>
                    <ProductsScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route
                path="/orderlist"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/categorylist"
                element={
                  <AdminRoute>
                    <CategoryListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <DashBoardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/userList"
                element={
                  <AdminRoute>
                    <UserLIstScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/user/:id/edit"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/ProductEditScreen/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/Createprodct"
                element={
                  <AdminRoute>
                    <CreateProductScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/support"
                element={
                  <AdminRoute>
                    <SupportScreen />
                  </AdminRoute>
                }
              ></Route>

              {/* Provate roures from here */}

              <Route
                path="/pay"
                element={
                  <PrivateRoute>
                    <toBeAddedSoonScreeen />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfileScreen />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="/" exact element={<HomeScreen />} />
            </Routes>
          </div>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && (
            <ChatBox userInfo={userInfo}></ChatBox>
          )}
          <div>All right reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
