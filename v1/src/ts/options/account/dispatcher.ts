import { Dispatch } from "redux";
import { IAction, IPayloadAction } from "../../common/actions";
import * as LoginActions from "../actions/login";

export default class ActionDispatcher {
    constructor(private dispatch: Dispatch<IAction>) { }

    public requestLogin() {
        this.dispatch(LoginActions.notifyLoginRequested());
    }
}
