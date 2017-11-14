import React from 'react';

import './styles/header.css'

import Logo from './Logo' // import svg as a react component so that we can manipulate it

const Header = (props) => (
    <header >
      <Logo  />
    </header>
)

export default Header;
