import { PLAYER_DETAIL_FAIL, PLAYER_DETAIL_REQUEST, PLAYER_DETAIL_SUCCESS, PLAYER_LIST_FAIL, PLAYER_LIST_REQUEST, PLAYER_LIST_SUCCESS } from "../constants/playerConstants";

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

export const playerDetailsReducer = (
    state = { player: {}, loading: true },
    action
) => {

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