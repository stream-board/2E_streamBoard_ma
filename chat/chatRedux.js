import { combineReducers } from 'redux';

export const types = {
    ADD_CHAT_MESSAGE: 'ADD_CHAT_MESSAGE',
    ADD_CHAT_LIST: 'ADD_CHAT_LIST',
}

export const actionsCreators = {
    add: (item) => {
        console.log(item);
        return { type: types.ADD_CHAT_MESSAGE, payload: item };
    },

    add_list: (list) => {
        return { type: types.ADD_CHAT_LIST, payload: list };
    }
}

const chatMessageList = [];

const chatMessageListReducer = (state = chatMessageList, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ADD_CHAT_MESSAGE: {
            return {
                ...state,
                chatMessageList: [...state, payload]
            }
        }

        case types.ADD_CHAT_LIST: {
            return {
                ...state,
                chatMessageList: [...state, ...payload]
            }
        }
    }

    return state;
}

export default combineReducers({
    chatMessageList: chatMessageListReducer
});