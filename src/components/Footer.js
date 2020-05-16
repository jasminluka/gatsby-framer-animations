import React from 'react';

import { Container, Flex } from '../styles/globalStyles';
import { FooterNav, FooterContent, FooterSocial } from '../styles/footerStyles';
import { Instagram, Facebook, Vimeo } from "../assets/svg/social-icons";

const Footer = ({ onCursor }) => {
  return (
    <FooterNav>
      <Container>
        <Flex spaceBetween>
          <FooterContent>
            <p>902.315.1279</p>
            <p>info@furrow.studio</p>
          </FooterContent>
          <FooterContent wider>
            <p>15 Camburhill Ct Unit C</p>
            <p>Charlottetown, PE C1E 0E2</p>
          </FooterContent>
          <FooterSocial>
            <a
              onMouseEnter={() => onCursor('hovered')}
              onMouseLeave={onCursor}
              href="/"
              target="_blank"
            >
              <Instagram />
            </a>
            <a
              onMouseEnter={() => onCursor('hovered')}
              onMouseLeave={onCursor}
              href="/"
              target="_blank"
            >
              <Facebook />
            </a>
            <a
              onMouseEnter={() => onCursor('hovered')}
              onMouseLeave={onCursor}
              href="/"
              target="_blank"
            >
              <Vimeo />
            </a>
          </FooterSocial>
        </Flex>
      </Container>
    </FooterNav>
  );
}

export default Footer;