import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as Actions from "../actions";
import { getTwitter } from "../reducers";
import Account, {IProps} from "./account";

const mapStateToProps = (state: any):IProps => {
    const twitter = getTwitter(state);
    return {
        twitter,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): any => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account) as any;
