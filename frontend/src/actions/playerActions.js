import Axios from "axios";
import { PLAYER_CREATE_FAIL, PLAYER_CREATE_REQUEST, PLAYER_CREATE_SUCCESS, PLAYER_DETAIL_FAIL, PLAYER_DETAIL_REQUEST, PLAYER_DETAIL_SUCCESS, PLAYER_LIST_FAIL, PLAYER_LIST_REQUEST, PLAYER_LIST_SUCCESS } from "../constants/playerConstants"

export const listPlayers = () => async(dispatch) => {

    dispatch({ type: PLAYER_LIST_REQUEST });

    try {
        const { data } = await Axios.get('/api/players');
        dispatch({ type: PLAYER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PLAYER_LIST_FAIL, payload: error.message });
    }
};

export const detailsPlayer = (playerId) => async(dispatch) => {

    dispatch({ type: PLAYER_DETAIL_REQUEST, payload: playerId });

    try {
        const { data } = await Axios.get(`/api/players/${playerId}`);
        dispatch({ type: PLAYER_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PLAYER_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const createPlayer = () => async (dispatch, getState) => {

    dispatch({ type: PLAYER_CREATE_REQUEST });

    const {
        userSignin: { userInfo },
    } = getState();

    try {
        const { data } = await Axios.post(
            '/api/players',
            {},
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        );
        dispatch({ type: PLAYER_CREATE_SUCCESS, payload: data.player });
    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

            dispatch({ type: PLAYER_CREATE_FAIL, payload: message });
    }
};