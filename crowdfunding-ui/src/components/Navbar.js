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
import logo from '../images/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='bg-[#0a192f]'>
      <Navbar color="bg-[#0a192f]" dark expand="md" className="flex flex-wrap items-center justify-center p-6">
        <Link to="/" className="text-white font-bold text-xl mr-4 no-underline">Deffyfunds</Link>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto justify-center" navbar>
            <Nav navbar className="justify-center">
              <NavItem>
                <NavLink tag={Link} to="/campaigns" className="text-gray-200 hover:text-white mr-4">Campaigns</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/about" className="text-gray-200 hover:text-white mr-4">About</NavLink>
              </NavItem>
            </Nav>
            <WalletMultiButton />
          </Nav>
        </Collapse>
        
      </Navbar>
    </div>
  );
}

export default Example;