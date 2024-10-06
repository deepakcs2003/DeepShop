import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import { combineReducers } from 'redux'; // Import combineReducers
import userReducer from './userSlice'; // Correctly importing the user slice
import cartReducer from './cartSlice'; // Correctly importing the cart slice

// Create a persist configuration
const persistConfig = {
  key: 'root', // Key for the storage
  storage, // Use localStorage for web
};

// Combine your reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
export const persistor = persistStore(store);
