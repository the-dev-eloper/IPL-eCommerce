import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_DETAILS } from "../constants/cartConstants";

export const addtoCart = (playerId) => async (dispatch, getState) => {

    const { data } = await Axios.get(`/api/players/${playerId}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            player: data._id,
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removefromCart = (playerId) => (dispatch, getState) => {

    dispatch({ type: CART_REMOVE_ITEM, payload: playerId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingDetails = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_DETAILS, payload: data });
    localStorage.setItem('shippingDetails', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
}