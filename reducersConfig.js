import { combineReducers } from "redux";
import { chatMessageListReducer } from './chat/chatRedux';

export const types = {
    addRoomName: 'addRoomName',
    addRoomDescription: 'addRoomDescription',
    addRoomOwner: 'addRoomOwner',
    ADD_CHAT_MESSAGE: 'ADD_CHAT_MESSAGE',
    ADD_CHAT_LIST: 'ADD_CHAT_LIST'
};

export const actionCreators = {
    add: (item) => {
        return { type: types.ADD, payload: item };
    },
    
    remove: (index) => {
        return { type: types.REMOVE, payload: index }
    },

    addChatMessage: (item) => {
        console.log(item);
        return { type: types.ADD_CHAT_MESSAGE, payload: item };
    },

    addChatMessageList: (list) => {
        return { type: types.ADD_CHAT_LIST, payload: list };
    }
}

const initialState = {
 roomCreateParams:{},
 chatMessageList: []
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
    roomCreateParams: roomCreateReducer,
    chatMessageList: chatMessageListReducer,
})