// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import SignUp from './component/member/SignUp';
import List from './component/member/List';
import MyPage from './component/common/MyPage';
import Main from './component/common/Main';
import Admin from './component/admin/Admin';
import Detail from './component/member/Detail';
import Edit from './component/member/Edit';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
				<Route path="/" exact element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/members" element={<List />} />
        <Route path="/mypage" element={<MyPage />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/members/:id" element={<Detail />} /> {/* 회원 상세 페이지 */}
				<Route path="/members/edit/:id" element={<Edit />} /> {/* 회원 수정 페이지 */}
      </Routes>
    </Router>
  );
};

export default App;