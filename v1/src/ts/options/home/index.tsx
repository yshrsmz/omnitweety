import { Dispatch } from "redux";
import { connect } from "react-redux";

import Home from "./home";
import { IProps as IHomeProps, IState as IHomeState} from "./home";

const mapStateToProps = (state: any):IHomeProps => {
    return {
        prefix: "",
        useSlack: false,
        slackRoom: "",
        slackToken: "",
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {

};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
