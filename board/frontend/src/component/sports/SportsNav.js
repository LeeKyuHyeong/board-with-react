// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 네비게이션 바 스타일 정의
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: cadetblue;
  padding: 0.1rem 2rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1rem;

  &:hover {
    color: #ddd;
  }
`;

const Navbar = () => {

  return (
    <NavbarContainer>
      <NavLinks>
				<NavLink to="/baseball">Baseball</NavLink>
				<NavLink to="/volleyball">Volleyball</NavLink>
				<NavLink to="/baseball">Soccer</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;