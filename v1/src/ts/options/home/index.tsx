import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as Actions from "../actions";
import Home, {IValueProps,IDispatchProps, IProps} from "./home";
import { getPrefix, getSlack } from "../reducers";

const mapStateToProps = (state: any): IValueProps => {
    const slack = getSlack(state);
    return {
        prefix: getPrefix(state).prefix,
        useSlack: slack.use,
        slackRoom: slack.room,
        slackToken: slack.token,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>):IDispatchProps => {
    return {
        updatePrefix: (prefix: string) => dispatch(Actions.notifyPrefixUpdated(prefix)),
        updateUseSlack: (useSlack: boolean) => dispatch(Actions.notifyUseSlackUpdated(useSlack)),
        updateSlackToken: (token: string) => dispatch(Actions.notifySlackTokenUpdated(token)),
        updateSlackRoom: (room: string) => dispatch(Actions.notifySlackRoomUpdated(room)),
    };
};

export default connect<IValueProps, IDispatchProps, IProps>(mapStateToProps, mapDispatchToProps)<IProps>(Home);
