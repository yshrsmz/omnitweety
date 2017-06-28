import { Action } from "redux";

export interface IAction extends Action {
    type: string;
}

export interface IPayloadAction<T> extends IAction {
    payload?: T;
}
