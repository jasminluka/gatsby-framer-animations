import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby"
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import CustomCursor from './CustomCursor';
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    text-decoration: none;
    cursor: none;
  }

  html {
    box-sizing: border-box;
    --webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  body {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${props => props.theme.background};
    overscroll-behavior: none;
    overflow-x: hidden;
  }
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  
  const [hamburgerMenuPosition, setHamburgerMenuPosition] = useState({ x: 0, y: 0 });

  const darkTheme = {
    background: '#000',
    text: '#fff',
    red: '#ea291e',
    left: `${hamburgerMenuPosition.x}px`,
    top: `${hamburgerMenuPosition.y}px`
  }

  const lightTheme = {
    background: '#fff',
    text: '#000',
    red: '#ea291e',
    left: `${hamburgerMenuPosition.x}px`,
    top: `${hamburgerMenuPosition.y}px`
  }

  const { currentTheme, cursorStyles } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;

    dispatch({ type: 'CURSOR_TYPE', cursorType });
  }

  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <CustomCursor toggleMenu={toggleMenu} />
      <Header
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        setHamburgerMenuPosition={setHamburgerMenuPosition}
        siteTitle={data.site.siteMetadata.title}
      />
      <Navigation
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
      />
      <main>{children}</main>
      <Footer
        onCursor={onCursor}
      />
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;