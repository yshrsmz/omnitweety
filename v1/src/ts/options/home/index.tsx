import { Dispatch } from "redux";
import { connect } from "react-redux";

import Home from "./home";
import * as Actions from "./actions";

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
