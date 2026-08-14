import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User';
import cartReducer from './Cart';

export const store = configureStore({
  reducer: {
    User: userReducer,
    Cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;