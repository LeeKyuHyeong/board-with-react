import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUserData, setSessionTime }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.get("http://localhost:8011/api/auth/logout/"); // 백엔드에 로그아웃 요청
        setUserData(null); // 사용자 데이터를 초기화
				setSessionTime(null);
        navigate("/login"); // 로그인 페이지로 리다이렉트
      } catch (error) {
        console.error("Logout failed", error);
      }
    };

    handleLogout();
  }, [setUserData, setSessionTime, navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;