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
      <h2 style={styles.header}>Batch History</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Batch Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Error Code</th>
            <th>Duration</th>
						<th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr style={styles.tableTr} key={batch.id}>
              <td>{batch.id}</td>
              <td>{batch.batchName}</td>
              <td>{batch.startTime}</td>
              <td>{batch.endTime || "N/A"}</td>
              <td style={batch.status === "SUCCESS" ? styles.success : styles.failure}>
                {batch.status}
              </td>
              <td>{batch.errorCode || "N/A"}</td>
              <td>{calculateDuration(batch.startTime, batch.endTime)}</td>
							<td>{batch.remarks || "N/A"}</td>
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
  success: {
    color: "green",
  },
  failure: {
    color: "red",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
	tableTr: {
		textAlign: "center"
	},
};

export default BatchHistory;