import { BrowserRouter, Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import PlayerScreen from './screens/PlayerScreen';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreenn from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceorderScreen from './screens/PlaceorderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PlayerListScreen from './screens/PlayerListScreen';

function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (

    <BrowserRouter>

      <div className="grid-container">

        <header className="row">

          <div>
            <Link to="/" className="brand">
              AUCTION
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>

            { userInfo ? (
              <div className="dropdown">

                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
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
              <Link to="/signIn">Sign-In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/playerlist">Players</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <main>

          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/player/:id" component={PlayerScreen} />
          <Route path="/signin" component={SignInScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingScreenn} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceorderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <Route path="/" component={HomeScreen} exact />
          <AdminRoute
            path="/playerlist"
            component={PlayerListScreen}
          ></AdminRoute>
        </main>

        <footer className="row center">
          All Rights Reserved
        </footer>
      </div>
    </BrowserRouter>

  );
}

export default App;
