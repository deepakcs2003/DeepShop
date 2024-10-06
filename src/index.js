import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { store } from './store/store'; // Adjust this path based on your project structure
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'; // Correct import for persistStore
import App from './App';
import { Atom } from 'react-loading-indicators';

const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor = persistStore(store); // Create the persistor

root.render(
  // <StrictMode></StrictMode>
  <Provider store={store}>
    <PersistGate loading={
      <div className='flex justify-center items-center h-screen'>
              <Atom color="#8631f5" size="medium" text="" textColor="" />
      </div>
      } persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);

reportWebVitals();
