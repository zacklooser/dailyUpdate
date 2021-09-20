import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import createAccountReducer from './createAccountReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  createAccount:createAccountReducer
});

export default rootReducer;