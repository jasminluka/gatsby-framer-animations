import React, { useEffect } from 'react';
import { Link } from 'gatsby';

import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext';

import { HeaderNav, Logo, Menu } from '../styles/headerStyles';
import { Container, Flex } from '../styles/globalStyles';

const Header = () => {
  const { currentTheme } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const toggleTheme = () => {
    if (currentTheme === 'dark') {
      dispatch({ type: 'TOGGLE_THEME', theme: 'light'});
    }
    else {
      dispatch({ type: 'TOGGLE_THEME', theme: 'dark'});
    }
  }

  useEffect(() => {
    window.localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return (
    <HeaderNav>
      <Container>
        <Flex spaceBetween noHeight>
          <Logo>
            <Link to='/'>FURR</Link>
            <span onClick={toggleTheme}></span>
            <Link to='/'>W</Link>
          </Logo>
          <Menu>
            <button>
              <span></span>
              <span></span>
            </button>
          </Menu>
        </Flex>
      </Container>
    </HeaderNav>
  )
}

export default Header;