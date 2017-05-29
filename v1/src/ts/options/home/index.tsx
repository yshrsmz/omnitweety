import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as Actions from "../actions";
import Home from "./home";
import { getPrefix, getSlack } from "../reducers";

const mapStateToProps = (state: any) => {
    const slack = getSlack(state);
    return {
        prefix: getPrefix(state).prefix,
        useSlack: slack.use,
        slackRoom: slack.room,
        slackToken: slack.token,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        updatePrefix: (prefix: string) => dispatch(Actions.notifyPrefixUpdated(prefix)),
        updateUseSlack: (useSlack: boolean) => dispatch(Actions.notifyUseSlackUpdated(useSlack)),
        updateSlackToken: (token: string) => dispatch(Actions.notifySlackTokenUpdated(token)),
        updateSlackRoom: (room: string) => dispatch(Actions.notifySlackRoomUpdated(room)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
