const callOnce = require('call-once-in-interval');

module.exports = preventRepeatActions = (actions=[], interval = 600) => () => (dispatch) => {
  const result = callOnce(dispatch, interval);
  return (action) => {
    if (actions.includes(action.type)) {
      return result(action);
    }
    return dispatch(action);
  };
};
