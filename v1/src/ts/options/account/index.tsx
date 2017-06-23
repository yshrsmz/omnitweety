import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IAction, IPayloadAction } from "../../common/actions";
import * as Actions from "../actions";
import * as LoginActions from "../actions/login";
import * as TwitterActions from "../actions/twitter";
import { getTwitter } from "../reducers";
import Account, { IProps } from "./account";
import ActionDispatcher from "./dispatcher";

const mapStateToProps = (state: any) => {
    const twitter = getTwitter(state);
    return {
        twitter,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        actions: new ActionDispatcher(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
