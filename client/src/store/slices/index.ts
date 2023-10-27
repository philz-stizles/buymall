import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: (
    state: { isAuthenticated: boolean } = { isAuthenticated: false },
    action: { type: string }
  ) => {
    switch (action) {
      default:
        return state;
    }
  },
});

export default rootReducer;
