import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function Example(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark {...args}>
        <NavbarBrand href="/">DEFFYFUNDS</NavbarBrand>
        <Nav>
          <NavItem>
          <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
          <NavLink href="/campaigns">Campaigns</NavLink>
          </NavItem>
          <NavItem>
          <NavLink href="#">About</NavLink>
          </NavItem>
        </Nav>
        <Nav>
          <WalletMultiButton />
        </Nav>
      </Navbar>
    </div>
  );
}

export default Example;