import React from 'react';
import { useLocation } from "react-router-dom";

const Main = ( {userdata} ) => {
	const location = useLocation();
	const errorMessage = location.state?.error || "";

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>Welcome to the Home Page</h1> 
      {userdata ? (
        <p>Hello, {userdata.name}! You are logged in.</p>
      ) : (
        <p>Please log in to access more features.</p>
      )}
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
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
		flexDirection: "column"
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
		whiteSpace: "pre-wrap"
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

export default Main;