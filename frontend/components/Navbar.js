import React from 'react';

import { Flex, Grow } from 'du-board-design-system';

import StyledNavbar from './ui/Navbar';

const Navbar = () => (
  <StyledNavbar>
    <Flex>
      <h3>
        Innovation Map
      </h3>
    </Flex>
    <Grow />
    <a href="http://www.projectxite.org/" style={{ textDecoration: 'none', color: '#fff' }}>
      Project XITE
    </a>
  </StyledNavbar>
);

export default Navbar;
