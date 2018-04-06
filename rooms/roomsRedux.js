import { combineReducers } from "redux";

export const types = {
    addRoomName: 'addRoomName',
    addRoomDescription: 'addRoomDescription',
    addRoomOwner: 'addRoomOwner'
};

export const actionCreators = {
    add: (item) => {
        return { type: types.ADD, payload: item };
    },
    
    remove: (index) => {
        return { type: types.REMOVE, payload: index }
    }
}

const initialState = {
 roomCreateParams:{}
};

 const roomCreateReducer = (state = initialState.roomCreateParams, action) => {

    const { type, payload } = action;


    switch (type) {
        case types.addRoomName: {
            return {
                ...state,
                nameRoom: payload
            }
        }
        case types.addRoomDescription: {
            return {
                ...state,
                descriptionRoom: payload
            }
        }
        case types.addRoomOwner: {
            return {
                ...state,
                idOwner: payload
            }
        }
    }

    return state;
}

export default combineReducers({
    roomCreateParams: roomCreateReducer
})