import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Theme from 'components/Theme/Theme';
import { SnackbarProvider } from 'notistack';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  }, [router.events]);

  return (
    <React.Fragment>
      <Head>
        <title>Neddaxs Code Test</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Theme>
        <SnackbarProvider maxSnack={1}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </Theme>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
