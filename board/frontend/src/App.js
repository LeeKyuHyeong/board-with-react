// App.js
import React, {useState, useEffect} from 'react';
import { 
	NavLink, 
	Route, 
	Routes, 
	} from 'react-router-dom';
import axios from 'axios';
import Navbar from './component/common/Navbar';
import SignUp from './component/member/SignUp';
import List from './component/admin/List';
import MyPage from './component/member/MyPage';
import Main from './component/common/Main';
import Admin from './component/admin/Admin';
import Detail from './component/member/Detail';
import Edit from './component/member/Edit';
import Login from './component/login/Login';
import Logout from './component/login/Logout';
import PwdReset from './component/member/PwdReset';

const App = () => {
	const [userData, setUserData] = useState(null); // 사용자 정보
  const [sessionTime, setSessionTime] = useState(null); // 남은 세션 시간
	
	// 세션 시간 감소 타이머
	useEffect(() => {
    if (sessionTime) {
      const timer = setInterval(() => {
        setSessionTime((prevTime) => {
          if (prevTime > 0) return prevTime - 1;
          clearInterval(timer);
          return 0;
        });
      }, 1000);

      return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [sessionTime]);

	// 세션 시간 만료 시 자동 로그아웃
  useEffect(() => {
    const handleSessionTimeout = async () => {
      if (!sessionTime && sessionTime === 0) {
        try {
          await axios.get("http://localhost:8011/api/logout/"); // 백엔드에 로그아웃 요청
        } catch (error) {
          console.error("Logout failed", error);
        }
        setUserData(null); // 사용자 데이터 초기화
      }
    };

    handleSessionTimeout();
  }, [sessionTime]);
  return (
		<>
      <Navbar userData={userData} sessionTime={sessionTime} />
      <Routes>
				<Route path="/" exact element={<Main userData={userData} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/members" element={<List userData={userData} />} />
        <Route path="/mypage" element={<MyPage userData={userData} />} />
				<Route path="/members/:id" element={<Detail />} /> {/* 회원 상세 페이지 */}
				<Route path="/members/edit/:id" element={<Edit userData={userData}/>} /> {/* 회원 수정 페이지 */}
				<Route 
					path="/login" 
					element={!userData ? <Login setUserData={setUserData} setSessionTime={setSessionTime} /> : <NavLink to="/" />}
					/>
				<Route path="/logout" element={<Logout setUserData={setUserData} />} />
				<Route path="/admin" element={<Admin userData={userData} /> } />
				<Route path="/pwdReset" element={<PwdReset  /> } />
      </Routes>
		</>
  );
};

export default App;