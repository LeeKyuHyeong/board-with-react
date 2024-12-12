// App.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import SignUp from './component/member/SignUp';
import List from './component/member/List';
import MyPage from './component/common/MyPage';
import Main from './component/common/Main';
import Admin from './component/admin/Admin';
import Detail from './component/member/Detail';
import Edit from './component/member/Edit';
import Login from './component/login/Login';
import Logout from './component/login/Logout';


const App = () => {
	const [userData, setUserData] = useState(null); // 사용자 정보
  const [sessionTime, setSessionTime] = useState(null); // 남은 세션 시간

  return (
    <Router>
      <Navbar userData={userData} sessionTime={sessionTime} />
      <Routes>
				<Route path="/" exact element={<Main userData={userData} sessionTime={sessionTime} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/members" element={<List />} />
        <Route path="/mypage" element={<MyPage />} />
				<Route path="/members/:id" element={<Detail />} /> {/* 회원 상세 페이지 */}
				<Route path="/members/edit/:id" element={<Edit />} /> {/* 회원 수정 페이지 */}
				<Route path="/login" element={<Login setUserData={setUserData} setSessionTime={setSessionTime}/>} />
				<Route path="/logout" element={<Logout setUserData={setUserData} setSessionTime={setSessionTime}/>} />


				<Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;