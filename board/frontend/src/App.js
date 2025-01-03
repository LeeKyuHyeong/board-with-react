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
import News from './component/sports/News';
import BatchHistory from './component/admin/batch/BatchHistory';
import BatchDefList from './component/admin/batch/List'
import GameMainPage from './component/game/GameMainPage';
import EditGamePage from './component/game/EditGamePage';
import BodyLanguageAdminPage from './component/admin/game/BodyLanguageAdminPage';
import Memo from './component/common/Memo';

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
				{/* 스포츠 기사*/}
				<Route path="/news" element={<News  /> } />
				{/* 배치 이력 */}
				<Route path="/batchHist" element={<BatchHistory  userdata={userdata}/> } />
				<Route path="/batchList" element={<BatchDefList  /> } />
				{/* 게임 */}
				<Route path="/game" element={<GameMainPage  userdata={userdata}/> } />
				<Route path="/game/body-language" element={<div>몸으로 말해요 게임 화면</div>} />
        <Route path="/game/quiz" element={<div>상식 퀴즈 게임 화면</div>} />
        <Route path="/game/lyric-guess" element={<div>가사 맞추기 게임 화면</div>} />
        <Route path="/game/person" element={<div>인물 맞추기 게임 화면</div>} />
        <Route path="/game/song" element={<div>노래 맞추기 게임 화면</div>} />
        <Route path="/game/drama" element={<div>드라마 맞추기 게임 화면</div>} />
        <Route path="/game/dialogue" element={<div>대사 맞추기 게임 화면</div>} />
				<Route path="/edit-games" element={<EditGamePage />} />
				{/* 게임 관리자 */}
				<Route path="/game/admin/body-language" element={<BodyLanguageAdminPage />} />
				{/* 나만의 장소 */}
				<Route path="/memo" element={<Memo />} />
      </Routes>
		</>
  );
};

export default App;