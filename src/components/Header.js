import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';

import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext';
import useElementPosition from '../hooks/useElementPosition';

import { HeaderNav, Logo, Menu } from '../styles/headerStyles';
import { Container, Flex } from '../styles/globalStyles';

const Header = ({ onCursor, toggleMenu, setToggleMenu, setHamburgerMenuPosition }) => {
  const { currentTheme } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const hamburgerMenu = useRef(null);
  const elementPosition = useElementPosition(hamburgerMenu);

  const toggleTheme = () => {
    if (currentTheme === 'dark') {
      dispatch({ type: 'TOGGLE_THEME', theme: 'light'});
    }
    else {
      dispatch({ type: 'TOGGLE_THEME', theme: 'dark'});
    }
  }

  // Lock Cursor
  const menuHover = () => {
    onCursor('locked');
    setHamburgerMenuPosition({
      x: elementPosition.x,
      y: elementPosition.y + 72
    });
  }

  useEffect(() => {
    window.localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return (
    <HeaderNav
      animate={{y: 0, opacity: 1}}
      initial={{y: -72, opacity: 0}}
      transition={{duration: 1, ease: [.6, .05, -.01, .9]}}
    >
      <Container>
        <Flex spaceBetween noHeight>
          <Logo
            onMouseEnter={() => onCursor('hovered')}
            onMouseLeave={onCursor}
          >
            <Link to='/'>FURR</Link>
            <span
              onClick={toggleTheme}
              onMouseEnter={() => onCursor('pointer')}
              onMouseLeave={onCursor}
            >
            </span>
            <Link to='/'>W</Link>
          </Logo>
          <Menu
            ref={hamburgerMenu}
            onClick={() => setToggleMenu(!toggleMenu)}
            onMouseEnter={menuHover}
            onMouseLeave={onCursor}
          >
            <button>
              <span></span>
              <span></span>
            </button>
          </Menu>
        </Flex>
      </Container>
    </HeaderNav>
  );
}

export default Header;