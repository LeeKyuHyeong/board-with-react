import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const List = () => {
  const [boards, setBoards] = useState([]);

  // 게시글 목록 가져오기
  useEffect(() => {
    axios
      .get("/api/board/lists/")
      .then((response) => {
        setBoards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching board list:", error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2>Board List</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>Created Dt</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) => (
            <tr key={board.id} style={styles.tr}>
              <td style={styles.td}>{board.id}</td>
              <td style={styles.td}>
                <Link to={`/board/${board.id}`} style={styles.link}>
                  {board.title}
                </Link>
              </td>
              <td style={styles.td}>{board.author}</td>
              <td style={styles.td}>{new Date(board.createdDt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "20px auto",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
  },
  tr: {
    backgroundColor: "#f9f9f9",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
  },
};

export default List;