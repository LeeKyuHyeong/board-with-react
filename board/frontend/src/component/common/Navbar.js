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

const NavLinkLogout = styled(Link)`
  text-decoration: none;
  color: red;
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

const UserNav = styled.span`
	color: white;
    /* font-size: 0.7rem; */
    /* padding-top: 0.1rem; */
    padding: 0.1rem;
    border: 1px solid #d4d4d6;
    line-height: 0.8rem;
`;

const LoggedInUserB = styled.b`
	font-size: 1rem;
`;

const Navbar = ( { userdata, sessionTime } ) => {

  return (
    <NavbarContainer>
      <Logo><NavLink to="/" style={{"fontSize":"2rem"}}>MyApp</NavLink></Logo>
      <NavLinks>
			<NavLink to="/news">Sports</NavLink>
				{userdata ? (
					<>          
					<NavLink to="/board/lists">Board List</NavLink>
					{userdata.role !== "user" ? (
						<>
						<NavLink to="/member/lists" userdata={userdata}>Member List</NavLink>
						<NavLink to="/batchHist" userdata={userdata}>Batch History</NavLink>
						<NavLink to="/batchList" >Batch List</NavLink>
						</>
					) : (<></>)}
					<NavLink to="/mypage">MyPage</NavLink>
					<NavLinkLogout to="/logout">Logout</NavLinkLogout>
					<UserNav><LoggedInUserB>{userdata.name}</LoggedInUserB> ({sessionTime}s)</UserNav>
					</>
        ) : (
					<>
					<NavLink to="/signup">SignUp</NavLink>
					<NavLink to="/login">Login</NavLink>
					</>
        )}
      </NavLinks>
      <MobileMenuIcon>
        <span>&#9776;</span>
      </MobileMenuIcon>
    </NavbarContainer>
  );
};

export default Navbar;