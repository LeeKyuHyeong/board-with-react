import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PwdReset = (  ) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

	const navi = useNavigate();

  const handlePwdRest = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8011/api/find/', { 
        name, 
        email 
      });

			alert(response.data);
			navi('/login');
			
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <div style={styles.container}>
			<div style={styles.card}>
				<h1 style={styles.title}>Reset Password</h1>
				<form onSubmit={handlePwdRest} style={styles.form}>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Name: </label>
						<input 
							type="text" 
							value={name} 
							onChange={(e) => setName(e.target.value)} 
							required 
							style={styles.input}
						/>
					</div>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Email: </label>
						<input 
							type="email" 
							value={email} 
							onChange={(e) => setEmail(e.target.value)} 
							required 
							style={styles.input}
						/>
					</div>
					
					{message && <p>{message}</p>}
					<button type="submit" style={styles.button}>Reset</button>
				</form>
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

export default PwdReset;