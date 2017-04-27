const preventRepeatActions = require('../index');
const callOnce = require('call-once-in-interval');

describe('middleware', () => {
  it('preventRepeatActions: should prevent repeat dispatches of passed actions', () => {
    const mockDispatch = jest.fn();
    const action = {
      type: 'TEST_ACTION_ABC'
    };
    const middlewareInstance = preventRepeatActions(['TEST_ACTION_ABC'], 1000)()(mockDispatch);
    middlewareInstance(action);
    middlewareInstance(action);
    middlewareInstance(action);
    expect(mockDispatch).toHaveBeenCalledTimes(1); // dispatches action only once for 1 second.
  });
  it('preventRepeatActions: should not prevent repeat dispatches of other than passed actions', () => {
    const mockDispatch = jest.fn();
    const action = {
      type: 'TEST_ACTION_XYZ'
    };
    const middlewareInstance = preventRepeatActions(['TEST_ACTION_ABC'], 1000)()(mockDispatch);
    middlewareInstance(action);
    middlewareInstance(action);
    middlewareInstance(action);
    expect(mockDispatch).toHaveBeenCalledTimes(3); // dispatches everytime for all the other actions
  });
});
