import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonUtils from "../common/CommonUtils";

const BoardCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

	useEffect(() => {
    // localStorage에서 로그인된 사용자 ID 가져오기
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setAuthor(loggedInUser);
    } else {
      alert("You must be logged in to create a post!");
      navigate("/login"); // 로그인 페이지로 리다이렉트
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

		const encodeContent = CommonUtils.encodeHtml(content);

    const boardData = { title, content : encodeContent, author };

    axios
      .post("/api/board/", boardData)
      .then((response) => {
        alert("Board created successfully!");
        navigate("/board/lists/"); // 등록 후 메인 페이지 이동
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert(error.response.data);
      });
  };

  return (
    <div style={styles.container}>
      <h2>Create Board</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Author:</label>
          <input
            type="text"
            value={author}
						readOnly
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "50%",
    margin: "50px auto",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "8px",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default BoardCreate;