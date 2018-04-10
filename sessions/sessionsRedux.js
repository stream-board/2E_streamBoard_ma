export const types = {
    ADD_USER_EMAIL: 'ADD_USER_EMAIL',
    ADD_USER_PASSWORD: 'ADD_USER_PASSWORD',
};

export const sessionActionCreators = {
    addUserEmail: (text) => {
        return { type: types.ADD_USER_EMAIL, payload: text };
    },
    addUserPassword: (text) => {
        return { type: types.ADD_USER_PASSWORD, payload: text }
    }
}

const sessionCreateParams = {};

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