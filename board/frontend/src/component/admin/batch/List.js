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
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.th}>Batch Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Scheduled Time</th>
              <th style={styles.th}>Success Count</th>
              <th style={styles.th}>Failure Count</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {batchDefinitions.length > 0 ? (
              batchDefinitions.map((batch) => (
                <tr key={batch.batchId}>
                  <td style={styles.td}>{batch.batchName}</td>
                  <td style={styles.td}>{batch.description}</td>
                  <td style={styles.td}>{batch.scheduledTime}</td>
                  <td style={styles.td}>{batch.successCount}</td>
                  <td style={styles.td}>{batch.failureCount}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.runButton}
                      onClick={() => handleRunBatch(batch.batchId)}
                    >
                      Run Now
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.noData}>
                  No batches available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
  runAllButton: {
    marginBottom: "20px",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  tableWrapper: {
    overflowX: "auto", // 테이블을 가로로 스크롤 가능하게 만듦
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  tableHead: {
    backgroundColor: "#343a40",
    color: "#fff",
  },
  th: {
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
    whiteSpace: "nowrap", // 열 크기가 작아질 때 줄바꿈 방지
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #dee2e6",
    whiteSpace: "nowrap",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#868e96",
    fontStyle: "italic",
  },
  runButton: {
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default List;