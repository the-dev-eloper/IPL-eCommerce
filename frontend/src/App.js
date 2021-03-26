import { BrowserRouter, Link, Route } from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import PlayerScreen from './screens/PlayerScreen';
import SignInScreen from './screens/SignInScreen';

function App() {
  return (

    <BrowserRouter>

      <div className="grid-container">

        <header className="row">

          <div>
            <button
              type="button"
              className="open-sidebar"
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link to="/" className="brand">AUCTION</Link>
          </div>

          <div>
            <Link to="/cart">Cart</Link>
            <Link to="/signIn">Sign-In</Link>
          </div>
        </header>

        <main>

          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signIn" component={SignInScreen} />
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
