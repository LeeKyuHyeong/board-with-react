import React, { useEffect, useState } from "react";
import axios from "axios";

const BatchHistory = ({ userdata }) => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    // superAdmin 유저만 데이터를 가져옴
    if (userdata.role === "superAdmin") {
      axios
        .get("/api/batch/histories/")
        .then((response) => {
          setBatches(response.data);
        })
        .catch((error) => {
          console.error("Error fetching batch data:", error);
        });
    }
  }, [userdata]);

  // 소요 시간을 계산하는 함수
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "N/A";

    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = Math.floor((end - start) / 1000); // 소요 시간 (초 단위)

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;
  };

  if (userdata.role !== "superAdmin") {
    return <h3>Unauthorized Access</h3>;
  }

  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Batch History</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Batch Name</th>
            <th style={styles.th}>Start Time</th>
            <th style={styles.th}>End Time</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Error Code</th>
            <th style={styles.th}>Duration</th>
						<th style={styles.th}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((history) => (
            <tr
              key={history.id}
              style={
                history.status === "SUCCESS"
                  ? styles.rowSuccess
                  : history.status === "FAILURE"
                  ? styles.rowFailure
                  : styles.rowRunning
              }
            >
              <td style={styles.td}>{history.batchName}</td>
              <td style={styles.td}>
                {history.startTime
                  ? new Date(history.startTime).toLocaleString()
                  : "N/A"}
              </td>
              <td style={styles.td}>
                {history.endTime
                  ? new Date(history.endTime).toLocaleString()
                  : "N/A"}
              </td>
              <td style={styles.td}>{history.status}</td>
              <td style={styles.td}>{history.errorCode || "N/A"}</td>
              <td style={styles.td}>
                {calculateDuration(history.startTime, history.endTime)}
              </td>
							<td style={styles.td}>{history.remarks || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
	container: {
		// margin: "20px",
		padding: "20px",
		backgroundColor: "#f8f9fa",
		borderRadius: "10px",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
	},
	title: {
		fontSize: "24px",
		fontWeight: "bold",
		marginBottom: "20px",
		color: "#343a40",
	},
	table: {
		width: "100%",
		borderCollapse: "collapse",
	},
	th: {
		backgroundColor: "#007bff",
		color: "white",
		textAlign: "center",
		padding: "10px",
		border: "1px solid #dee2e6",
	},
	td: {
		padding: "10px",
		border: "1px solid #dee2e6",
		textAlign: "center",
	},
	rowSuccess: {
		backgroundColor: "#d4edda",
	},
	rowFailure: {
		backgroundColor: "#f8d7da",
	},
	rowRunning: {
		backgroundColor: "#fff3cd",
	},
};

export default BatchHistory;