import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams(); // URL에서 게시글 ID 추출
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // 기존 게시글 데이터 불러오기
    axios
      .get(`/api/board/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching board:", error);
        alert("Failed to fetch board data.");
        navigate("/board/lists");
      });
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/board/${id}`, { title, content })
      .then(() => {
        alert("Board updated successfully.");
        navigate(`/board/${id}`); // 수정 후 상세 페이지로 이동
      })
      .catch((error) => {
        console.error("Error updating board:", error);
        alert("Failed to update board.");
      });
  };

  return (
    <div style={styles.container}>
      <h2>Edit Board</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button}>
          Update
        </button>
        <button
          type="button"
          onClick={() => navigate(`/board/${id}`)}
          style={styles.cancelButton}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "50%",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  cancelButton: {
    padding: "10px 15px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Edit;