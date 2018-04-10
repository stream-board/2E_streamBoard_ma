export const types = {
    ADD_CHAT_MESSAGE: 'ADD_CHAT_MESSAGE',
    ADD_CHAT_LIST: 'ADD_CHAT_LIST',
}

export const chatActionsCreators = {
    addChatMessage: (item) => {
        console.log(item);
        return { type: types.ADD_CHAT_MESSAGE, payload: item };
    },

    addChatMessageList: (list) => {
        return { type: types.ADD_CHAT_LIST, payload: list };
    }
}

const chatMessageList = [];

export const chatMessageListReducer = (state = chatMessageList, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ADD_CHAT_MESSAGE: {
            return [...state, payload]
        }

        case types.ADD_CHAT_LIST: {
            return payload
        }
    }

    return state;
}