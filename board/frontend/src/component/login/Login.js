import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ( { setUserData, setSessionTime } ) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

	const navi = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8011/api/auth/login/', { 
        id, 
        password 
      }, { withCredentials: true });

			// console.log("expiryTime : " + response.data.expiryTime);
			// console.log("timeout : " + response.data.timeout);
			setUserData(response.data.member);
			setSessionTime(response.data.timeout);
      setMessage(response.data.statMsg);
			if(response.data.statCd === '200') {
				alert(id + '님 로그인 하셨습니다.');
				navi('/'); // 로그인 성공 시 메인 페이지로 이동
			}
    } catch (error) {
      setMessage('로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>ID: </label>
          <input 
            type="text" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;