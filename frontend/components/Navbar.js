import React from 'react';

import { Grow } from 'du-board-design-system';

import StyledNavbar from './ui/Navbar';

const Navbar = () => (
  <StyledNavbar>
    <img src="static/xite_logo.png" alt="x-ite logo" />
    <h3>
      <span style={{ color: 'rgba(255, 255, 255, .7)' }}>
        Project X-ITE
      </span>
      &nbsp;
      <b>
        Innovation Map
      </b>
    </h3>
    <Grow />
    <a href="http://www.projectxite.org/" style={{ textDecoration: 'none', color: 'rgba(255, 255, 255, .7)' }}>
      Back to Project X-ITE
    </a>
  </StyledNavbar>
);

export default Navbar;
