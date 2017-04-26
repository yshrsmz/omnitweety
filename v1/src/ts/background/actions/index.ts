export const CHECK_LOGIN_REQUEST = "CHECK_LOGIN_REQUEST";
export const CHECK_LOGIN_RECEIVE = "CHECK_LOGIN_SUCCESS";
export const CHECK_LOGIN_FAILURE = "CHECK_LOGIN_FAILURE";

export interface IAction<T> {
    type: string;
    payload: T;
}

export const requestLoginStatus = () => ({
    type: CHECK_LOGIN_REQUEST,
});

export const receiveLoginStatus = (loggedIn: boolean) => ({
    type: CHECK_LOGIN_RECEIVE,
    payload: loggedIn,
});
