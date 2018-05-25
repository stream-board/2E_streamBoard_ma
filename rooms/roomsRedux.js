export const types = {
    ADD_ROOM_NAME: 'ADD_ROOM_NAME',
    ADD_ROOM_DESCRIPTION: 'ADD_ROOM_DESCRIPTION',
    ADD_ROOM_OWNER: 'ADD_ROOM_OWNER',
    ADD_ROOM_CATEGORY: 'ADD__ROOM_CATEGORY',
    ADD_ROOM_PARTICIPANT_LIST: 'ADD_ROOM_PARTICIPANT_LIST',
    ADD_ROOM_PARTICIPANT: 'ADD_ROOM_PARTICIPANT',
    ADD_ROOM_CURRENT_ID: 'ADD_ROOM_CURRENT_ID',
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
        return { type: types.ADD_ROOM_CATEGORY, payload: text }
    },
    addRoomParticipantList: (list) => {
        return { type: types.ADD_ROOM_PARTICIPANT_LIST, payload: list }
    },
    addRoomParticipant: (obj) => {
        return { type: types.ADD_ROOM_PARTICIPANT, payload: obj }
    },

    addCurrentRoomId: (text) => {
        return { type: types.ADD_ROOM_CURRENT_ID, payload: text }
    }
}

const roomCreateParams = {};
const roomParticipants = {};

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
        case types.ADD_ROOM_CATEGORY: {
            return {
                ...state,
                categoryRoom: payload
            }
        }
        case types.ADD_ROOM_CURRENT_ID: {
            return {
                ...state,
                currentRoomId: payload
            }
        }
    }

    return state;
}

export const roomParticipantsReducer = (state = roomParticipants, action) => {
    const { type, payload }= action;

    switch (type) {
        case types.ADD_ROOM_PARTICIPANT_LIST:
            const result = {};
            payload.map((userObj, index)=> {
                result[userObj.id] = userObj;
            });
            return result;
            
        case types.ADD_ROOM_PARTICIPANT:
            const currentRoomParticipants = Object.assign({}, state);
            console.log(currentRoomParticipants);
            console.log(payload);   
            currentRoomParticipants[payload.id] = payload;
            return currentRoomParticipants;
    }

    return state;
}  