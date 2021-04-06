import { PLAYER_CREATE_FAIL, PLAYER_CREATE_REQUEST, PLAYER_CREATE_RESET, PLAYER_CREATE_SUCCESS, PLAYER_DELETE_FAIL, PLAYER_DELETE_REQUEST, PLAYER_DELETE_RESET, PLAYER_DELETE_SUCCESS, PLAYER_DETAIL_FAIL, PLAYER_DETAIL_REQUEST, PLAYER_DETAIL_SUCCESS, PLAYER_LIST_FAIL, PLAYER_LIST_REQUEST, PLAYER_LIST_SUCCESS, PLAYER_UPDATE_FAIL, PLAYER_UPDATE_REQUEST, PLAYER_UPDATE_RESET, PLAYER_UPDATE_SUCCESS } from "../constants/playerConstants";

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

export const playerCreateReducer = ( state = {}, action ) => {
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

export const playerUpdateReducer = ( state = {}, action ) => {
    switch (action.type) {
        case PLAYER_UPDATE_REQUEST:
            return { loading: true };
        case PLAYER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case PLAYER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case PLAYER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const playerDeleteReducer = ( state = {}, action ) => {
    switch (action.type) {
        case PLAYER_DELETE_REQUEST:
            return { loading: true };
        case PLAYER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PLAYER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case PLAYER_DELETE_RESET:
            return {};
        default:
            return state;
    }
};