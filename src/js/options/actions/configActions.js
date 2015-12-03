import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';

let {ActioNTypes} = AppConstants;

console.log(ActionTypes.SAVE_USE_SLACK);


export default {
    saveSlackToken(token) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_SLACK_TOKEN,
            slackToken: token
        });
    },

    saveSlackUseSlack(useSlack) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_USE_SLACK,
            slackUseSlack: useSlack
        });
    }

    saveSlackUser(user) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_SLACK_USER,
            slackUser: user
        });
    }

    saveSlackRoom(room) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_SLACK_ROOM,
            slackRoom: room
        });
    }
}
