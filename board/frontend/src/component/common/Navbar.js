import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    display: ${(props) => (props.open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #333;
    padding: 1rem 0;
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

const Navbar = ({ userdata, sessionTime }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavbarContainer>
      <Logo>
        <NavLink to="/">MyApp</NavLink>
      </Logo>
      <MobileMenuIcon onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </MobileMenuIcon>
      <NavLinks open={menuOpen}>
        <NavLink to="/news">Sports</NavLink>
        {userdata ? (
          <>
            <NavLink to="/board/lists">Board List</NavLink>
            <NavLink to="/game">Mini Game</NavLink>
            {userdata.role !== "user" && (
              <>
                <NavLink to="/member/lists">Member List</NavLink>
                <NavLink to="/batchHist">Batch History</NavLink>
                <NavLink to="/batchList">Batch List</NavLink>
								<NavLink to="/game/admin/body-language">B_L_ADMIN</NavLink>
              </>
            )}
            <NavLink to="/mypage">MyPage</NavLink>
            <NavLink to="/logout">Logout</NavLink>
              <UserNav><LoggedInUserB>{userdata.name}</LoggedInUserB> ({sessionTime}s)</UserNav>
          </>
        ) : (
          <>
            <NavLink to="/signup">SignUp</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
