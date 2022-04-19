import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import MainNav from '../components/MainNav';
import '../styles/index.css';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MainNav mainPage={<Component {...pageProps} />} />
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
