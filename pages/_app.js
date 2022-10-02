import React from 'react';
import '../styles/globals.css';

import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <Footer />
    </React.Fragment>
  );
}

export default MyApp;
