import { swap } from "change-case";

export const types = {
    ADD_USER_EMAIL: 'ADD_USER_EMAIL',
    ADD_USER_PASSWORD: 'ADD_USER_PASSWORD',
    ADD_CURRENT_USER: 'ADD_CURRENT_USER',
};

export const sessionActionCreators = {
    addUserEmail: (text) => {
        return { type: types.ADD_USER_EMAIL, payload: text };
    },
    addUserPassword: (text) => {
        return { type: types.ADD_USER_PASSWORD, payload: text }
    },
    addCurrentUser: (object) => {
        return { type: types.ADD_CURRENT_USER, payload: object }
    }
}

const sessionCreateParams = {};
const currrentUser = {};

export const sessionCreateReducer = (state = sessionCreateParams, action) => {

    const { type, payload } = action;

    switch (type) {
        case types.ADD_USER_EMAIL: {
            return {
                ...state,
                email: payload
            }
        }
        case types.ADD_USER_PASSWORD: {
            return {
                ...state,
                password: payload
            }
        }
    }

    return state;
}

export const currentUserReducer = (state = currrentUser, action) => {

    const { type, payload } = action; 

    switch (type) {
        case types.ADD_CURRENT_USER:
            return payload;
        break
    }
    
    return state;
}