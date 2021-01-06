import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface Props {
  children: React.ReactElement;
}

export default function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
