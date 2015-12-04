import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';

let {ActionTypes} = AppConstants;


export default {
    saveStatusPrefix(prefix) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_STATUS_PREFIX,
            prefix: prefix
        });
    },

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
    },

    saveSlackUser(user) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_SLACK_USER,
            slackUser: user
        });
    },

    saveSlackRoom(room) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_SLACK_ROOM,
            slackRoom: room
        });
    }
}
