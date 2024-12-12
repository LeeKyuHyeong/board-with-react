// Navbar.js
import React, {useEffect, useState} from 'react';
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

const Navbar = ( { userData, sessionTime } ) => {

	const [remainingTime, setRemainingTime] = useState(sessionTime);
	
	console.log("navbar sessionTime : " + sessionTime);
	console.log("navbar remainingTime : " + remainingTime);
  useEffect(() => {
		if (sessionTime) {
			const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(timer); // 타이머 중지
          return 0;
        });
      }, 1000);

      return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [sessionTime]);

  return (
    <NavbarContainer>
      <Logo><NavLink to="/" style={{"fontSize":"2rem"}}>MyApp</NavLink></Logo>
      <NavLinks>
				{userData ? (
					<>
          <span>Logged in as: {userData.name}, sessionTime Left: {remainingTime}s</span>
					<NavLink to="/mypage">MyPage</NavLink>
					<NavLink to="/admin">Admin</NavLink>
					<NavLink to="/members">List</NavLink>
					<NavLink to="/logout">Logout</NavLink>
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