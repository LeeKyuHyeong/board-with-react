// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import SignUp from './component/member/SignUp';
import List from './component/member/List';
import MyPage from './component/common/MyPage';
import Main from './component/common/Main';
import Admin from './component/admin/Admin';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
				<Route path="/" exact element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/list" element={<List />} />
        <Route path="/mypage" element={<MyPage />} />
				<Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;