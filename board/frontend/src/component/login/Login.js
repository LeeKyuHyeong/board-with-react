import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";

const Login = ( { setUserData, setSessionTime } ) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
	const [rememberId, setRememberId] = useState(false); // 아이디 저장 체크박스

	const navi = useNavigate();

	// 페이지 로드 시 쿠키에서 ID 가져오기
	useEffect(() => {
		const savedId = Cookies.get("rememberedId");
		if (savedId) {
			setId(savedId);
			setRememberId(true);
		}
	}, []);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8011/api/login/', { 
        id, 
        password 
      }, { withCredentials: true });

      setMessage(response.data.statMsg);
			
			if(response.data.statCd === '200') {

				if (rememberId) {
					Cookies.set("rememberedId", id, { expires: 7 }); // 7일간 유지
				} else {
					Cookies.remove("rememberedId"); // 체크 해제 시 쿠키 삭제
				}

				localStorage.setItem("loggedInUser", id); // 사용자 ID 저장
				
				setUserData(response.data.member);
				setSessionTime(response.data.timeout);
				alert(id + '님 로그인 하셨습니다.');
				navi('/'); // 로그인 성공 시 메인 페이지로 이동
			} else {
				return;
			}
    } catch (error) {
      setMessage('로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div style={styles.container}>
			<div style={styles.card}>
				<h1 style={styles.title}>Login</h1>
				<form onSubmit={handleLogin} style={styles.form}>
					<div style={styles.inputGroup}>
						<label style={styles.label}>ID: </label>
						<input 
							type="text" 
							value={id} 
							onChange={(e) => setId(e.target.value)} 
							required 
							style={styles.input}
						/>
					</div>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Password: </label>
						<input 
							type="password" 
							value={password} 
							onChange={(e) => setPassword(e.target.value)} 
							required 
							style={styles.input}
						/>
					</div>
					<div style={styles.checkboxGroup}>
						<input
							type="checkbox"
							checked={rememberId}
							onChange={() => setRememberId(!rememberId)}
						/>
						<label>Remember ID</label>
					</div>
					{message && <p>{message}</p>}
					<button type="submit" style={styles.button}>Login</button>
				</form>
				<button style={styles.forgetPassword} onClick={() => navi('/pwdReset')}>
          Forget Password?
        </button>
			</div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    marginBottom: "5px",
    display: "block",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  forgetPassword: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#007bff",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "10px",
  },
};

export default Login;