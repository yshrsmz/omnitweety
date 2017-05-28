import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as Actions from "../actions";
import Home from "./home";

const mapStateToProps = (state: any) => {
    return {
        prefix: "",
        useSlack: false,
        slackRoom: "",
        slackToken: "",
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        updatePrefix: (prefix: string) => dispatch(Actions.notifyPrefixUpdated(status)),
        updateUseSlack: (useSlack: boolean) => dispatch(Actions.notifyUseSlackUpdated(useSlack)),
        updateSlackToken: (token: string) => dispatch(Actions.notifySlackTokenUpdated(token)),
        updateSlackRoom: (room: string) => dispatch(Actions.notifySlackRoomUpdated(room)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
