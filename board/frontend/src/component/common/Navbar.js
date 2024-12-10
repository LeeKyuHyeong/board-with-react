// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 네비게이션 바 스타일 정의
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1rem;

  &:hover {
    color: #ddd;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo><NavLink to="/" style={{"fontSize":"2rem"}}>MyApp</NavLink></Logo>
      <NavLinks>
        <NavLink to="/signup">SignUp</NavLink>
        <NavLink to="/members">List</NavLink>
        <NavLink to="/mypage">MyPage</NavLink>
				<NavLink to="/admin">Admin</NavLink>
      </NavLinks>
      <MobileMenuIcon>
        <span>&#9776;</span>
      </MobileMenuIcon>
    </NavbarContainer>
  );
};

export default Navbar;