import { combineReducers } from "redux";

export const types = {
    ADD_ROOM_NAME: 'ADD_ROOM_NAME',
    ADD_ROOM_DESCRIPTION: 'ADD_ROOM_DESCRIPTION',
    ADD_ROOM_OWNER: 'ADD_ROOM_OWNER',
    ADD__ROOM_CATEGORY: 'ADD__ROOM_CATEGORY',
    addUserEmail: 'addUserEmail',
    addUserPassword: 'addUserPassword',
};

export const roomActionCreators = {
    addRoomName: (text) => {
        return { type: types.ADD_ROOM_NAME, payload: text };
    },
    addRoomDescription: (text) => {
        return { type: types.ADD_ROOM_DESCRIPTION, payload: text }
    },
    addRoomOwner: (userId) => {
        return { type: types.ADD_ROOM_OWNER, payload: userId }
    },
    addRoomCategory: (text) => {
        return { type: types.ADD__ROOM_CATEGORY, payload: text }
    }
}

const roomCreateParams = {};
const initialState = {
 sessionCreateParams:{},
};

export const roomCreateReducer = (state = roomCreateParams, action) => {

    const { type, payload } = action;

    switch (type) {
        case types.ADD_ROOM_NAME: {
            return {
                ...state,
                nameRoom: payload
            }
        }
        case types.ADD_ROOM_DESCRIPTION: {
            return {
                ...state,
                descriptionRoom: payload
            }
        }
        case types.ADD_ROOM_OWNER: {
            return {
                ...state,
                idOwner: payload
            }
        }
        case types.ADD__ROOM_CATEGORY: {
            return {
                ...state,
                categoryRoom: payload
            }
        }
    }

    return state;
}

const sessionCreateReducer = (state = initialState.sessionCreateParams, action) => {

    const { type, payload } = action;

    switch (type) {
        case types.addUserEmail: {
            return {
                ...state,
                email: payload
            }
        }
        case types.addUserPassword: {
            return {
                ...state,
                password: payload
            }
        }
    }

    return state;
}