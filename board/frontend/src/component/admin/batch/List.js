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
              <tr key={batch.batchId} style={styles.tableRow}>
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
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', Arial, sans-serif",
    backgroundColor: "#f8f9fa",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#343a40",
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
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #dee2e6",
  },
  tableRow: {
    transition: "background-color 0.2s",
  },
  tableRowHover: {
    backgroundColor: "#f1f3f5",
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
  runButtonHover: {
    backgroundColor: "#0056b3",
  },
};

export default List;