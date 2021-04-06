import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer } from './reducers/orderReducer';
import { playerCreateReducer, playerDeleteReducer, playerDetailsReducer, playerListReducer, playerUpdateReducer } from './reducers/playerReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers';

const initialState={
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingDetails: localStorage.getItem('shippingDetails')
            ? JSON.parse(localStorage.getItem('shippingDetails'))
            : {},
        paymentMethod: 'PayPal',
    },
};

const reducer = combineReducers({
    playerList: playerListReducer,
    playerDetails: playerDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    playerCreate: playerCreateReducer,
    playerUpdate: playerUpdateReducer,
    playerDelete: playerDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;