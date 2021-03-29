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
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signIn">Sign-In</Link>
            )}
          </div>
        </header>

        <main>

          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={SignInScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingScreenn} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceorderScreen} />
          <Route path="/player/:id" component={PlayerScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>

        <footer className="row center">
          All Rights Reserved
        </footer>
      </div>
    </BrowserRouter>

  );
}

export default App;
