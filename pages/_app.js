import React, { createContext, useReducer } from 'react';
import '../styles/globals.css';

import Footer from '../components/Footer';
import StoreProvider from '../store/store-context';

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
