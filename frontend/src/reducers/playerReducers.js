import { PLAYER_CREATE_FAIL, PLAYER_CREATE_REQUEST, PLAYER_CREATE_RESET, PLAYER_CREATE_SUCCESS, PLAYER_DETAIL_FAIL, PLAYER_DETAIL_REQUEST, PLAYER_DETAIL_SUCCESS, PLAYER_LIST_FAIL, PLAYER_LIST_REQUEST, PLAYER_LIST_SUCCESS } from "../constants/playerConstants";

export const playerListReducer = (
    state = { loading: true, players: [] },
    action
) => {

    switch(action.type) {
        case PLAYER_LIST_REQUEST:
            return { loading: true };
        case PLAYER_LIST_SUCCESS:
            return { loading: false, players: action.payload };
        case PLAYER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const playerDetailsReducer = (state = { loading: true }, action) => {

    switch(action.type) {
        case PLAYER_DETAIL_REQUEST:
            return { loading: true };
        case PLAYER_DETAIL_SUCCESS:
            return { loading: false, player: action.payload };
        case PLAYER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const playerCreateReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case PLAYER_CREATE_REQUEST:
            return { loading: true };
        case PLAYER_CREATE_SUCCESS:
            return { loading: false, success: true, player: action.payload };
        case PLAYER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PLAYER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};