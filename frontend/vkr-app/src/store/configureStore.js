import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducers/loginReducer';
import chatReducer from '../reducers/chatReducer';
import userReducer from '../reducers/userReducer';

export function createCustomStore() {
  const rootReducer = {
    login: loginReducer,
    chat: chatReducer,
    user: userReducer,
  };

  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
}
