# redux-prevent-repeat-dispatch
A redux middleware to prevent dispatching of repeat actions for a specific period of time.

## Usage

Pass the actions which you want to prevent and an optional time in ms for which you want to prevent multiple dispatches.

```
import preventRepeatActions from 'redux-prevent-repeat-dispatch';

const enhancer = compose(applyMiddleware(preventRepeatActions(['ACTION_TO_PREVENT_DISPATCH'], 1000)), ...enhancers);

const store = createStore(rootReducer, {}, enhancer);

```

## Tests

Below are the passing tests cases for the middleware.

```
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
```
