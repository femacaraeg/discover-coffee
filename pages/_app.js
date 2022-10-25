import React, { createContext, useReducer } from 'react';
import '../styles/globals.css';

import Footer from '../components/Footer';

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES',
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return {
        ...state,
        latLong: action.payload.latLong,
      };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return {
        ...state,
        coffeeStores: action.payload.coffeeStores,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: '7.084513095103229%2C125.61906172742461',
    coffeeStores: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <React.Fragment>
        <Component {...pageProps} />
        {/* <Footer /> */}
      </React.Fragment>
    </StoreProvider>
  );
}

export default MyApp;
