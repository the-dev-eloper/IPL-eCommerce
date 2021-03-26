import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

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
}