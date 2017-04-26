import * as Actions from "../actions";

const initialState = {
    isLoggedIn: false,
};

const loginStatus = (state = initialState, action: Actions.IAction<boolean>) => {
    switch (action.type) {
        case Actions.CHECK_LOGIN_RECEIVE:
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        default:
            return state;
    }
};

export default loginStatus;
