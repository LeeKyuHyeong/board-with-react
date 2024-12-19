import React, { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  const [batchDefinitions, setBatchDefinitions] = useState([]);

  useEffect(() => {
    // 배치 목록 불러오기
    axios
      .get("/api/batch/definitions/")
      .then((response) => {
        setBatchDefinitions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching batch definitions:", error);
      });
  }, []);

  const handleRunBatch = (id) => {
    // 배치 실행
    axios
      .post(`/api/batch/definitions/run/${id}`)
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error("Error running batch:", error);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Batch Management</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Batch Name</th>
            <th>Description</th>
            <th>Scheduled Time</th>
            <th>Success Count</th>
            <th>Failure Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {batchDefinitions.map((batch) => (
            <tr key={batch.id}>
              <td>{batch.batchName}</td>
              <td>{batch.description}</td>
              <td>{batch.scheduledTime}</td>
              <td>{batch.successCount}</td>
              <td>{batch.failureCount}</td>
              <td>
                <button style={styles.runButton} onClick={() => handleRunBatch(batch.id)}>
                  Run Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  runButton: {
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default List;