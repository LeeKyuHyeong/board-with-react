// App.js
import React, {useState, useEffect} from 'react';
import { 
	NavLink, 
	Route, 
	Routes, 
	Navigate,
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
import BoardCreate from './component/board/BoardCreate';
import BoardList from './component/board/List'
import BoardDeatil from './component/board/Detail'
import BoardEdit from './component/board/Edit'
import Baseball from './component/sports/Baseball';
import Volleyball from './component/sports/Volleyball';
import Soccer from './component/sports/Soccer';
import Floorball from './component/sports/Floorball';
import Frisbee from './component/sports/Frisbee';

const App = () => {
	const [userdata, setUserdata] = useState(null); // 사용자 정보
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
        setUserdata(null); // 사용자 데이터 초기화
      }
    };
    handleSessionTimeout();
  }, [sessionTime]);
  return (
		<>
      <Navbar userdata={userdata} sessionTime={sessionTime} />
      <Routes>
				<Route path="/" exact element={<Main userdata={userdata} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/member/lists" element={<List userdata={userdata} />} />
        <Route path="/mypage" element={<MyPage userdata={userdata} />} />
				<Route path="/members/" element={<Navigate to="/" replace />} /> {/*회원 상세 페이지 오류 리다이렉트*/}
				<Route path="/members/:id" element={<Detail />} /> {/* 회원 상세 페이지 */}
				<Route path="/members/edit/:id" element={<Edit userdata={userdata}/>} /> {/* 회원 수정 페이지 */}
				<Route 
					path="/login" 
					element={!userdata ? <Login setUserdata={setUserdata} setSessionTime={setSessionTime} /> : <NavLink to="/" />}
					/>
				<Route path="/logout" element={<Logout setUserdata={setUserdata} />} />
				<Route path="/admin" element={<Admin userdata={userdata} /> } />
				<Route path="/pwdReset" element={<PwdReset  /> } />
				{/* 게시판 */}
				<Route path="/board/lists" element={<BoardList  /> } />
				<Route path="/board/create" element={<BoardCreate  /> } />
				<Route path="/board/:id" element={<BoardDeatil  /> } />
				<Route path="/board/edit/:id" element={<BoardEdit  /> } />
				{/* 스포츠 */}
				<Route path="/baseball" element={<Baseball  /> } />
				<Route path="/volleyball" element={<Volleyball  /> } />
				<Route path="/soccer" element={<Soccer  /> } />
				<Route path="/floorball" element={<Floorball  /> } />
				<Route path="/frisbee" element={<Frisbee  /> } />
      </Routes>
		</>
  );
};

export default App;