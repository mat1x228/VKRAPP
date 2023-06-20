import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import chatReducer from './chatReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  chat: chatReducer,
  user: userReducer,
});

export default rootReducer;
