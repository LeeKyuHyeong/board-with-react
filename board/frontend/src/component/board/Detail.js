import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Detail = () => {
  const { id } = useParams(); // URL에서 게시글 ID 추출
  const [board, setBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
	const [loggedInUser, setLoggedInUser] = useState(""); // 로그인된 사용자 ID
  const navigate = useNavigate();

	const fetchComments = useCallback(async () => {
    axios
      .get(`/api/comments/${id}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id]);

  useEffect(() => {
    // 게시글 상세 정보 불러오기
    axios
      .get(`/api/board/${id}`)
      .then((response) => {
        setBoard(response.data);
      })
      .catch((error) => {
        console.error("Error fetching board:", error);
        alert(error.response.data);
        navigate("/board/lists/"); // 에러 발생 시 목록 페이지로 이동
      });

			// 댓글 데이터 불러오기
			fetchComments();

			// 현재 로그인된 사용자 ID 가져오기
			axios
      .get("/api/session/user/") // 로그인된 사용자 정보 가져오는 엔드포인트
      .then((response) => {
				console.log('userId : ' + response.data.userId);
        setLoggedInUser(response.data.userId);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [id, navigate, fetchComments]);

	const handleAddComment = () => {
    if (!newComment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    axios
      .post(`/api/comments/${id}`, { content: newComment })
      .then(() => {
        setNewComment("");
        fetchComments(); // 댓글 새로 불러오기
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        alert("Failed to add comment.");
      });
  };

	const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`/api/board/${id}`)
        .then(() => {
          alert("Board deleted successfully.");
          navigate("/board/lists");
        })
        .catch((error) => {
          console.error("Error deleting board:", error);
          alert(error.response.data);
        });
    }
  };

  if (!board) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Board Detail
				<div>
					{/* 작성자와 로그인된 사용자가 같을 때만 수정 및 삭제 버튼 보여주기 */}
					{loggedInUser === board.author && (
						<>
							<button
								onClick={() => navigate(`/board/edit/${board.id}`)}
								style={styles.editButton}
							>
								Edit
							</button>
							<button onClick={handleDelete} style={styles.deleteButton}>
								Delete
							</button>
						</>
					)}
				
					<button onClick={() => navigate("/board/lists/")} style={styles.button}>
						Back to List
					</button>
				</div>
			</h2>
      <div style={styles.detailBox}>
        <p>
          <strong>ID:</strong> {board.id}
        </p>
        <p>
          <strong>Title:</strong> {board.title}
        </p>
        <p>
          <strong>Author:</strong> {board.author}
        </p>
        <p>
          <strong>Content:</strong>
        </p>
        <div style={styles.content}>{board.content}</div>
        <p>
          <strong>Created Dt:</strong>{" "}
          {new Date(board.createdDt).toLocaleString()}
        </p>
				</div>

				{/* 댓글 입력 폼 */}
				<div style={styles.commentSection}>
            <h3>Comments</h3>
            {comments.map((comment) => (
              <div key={comment.id} style={styles.comment}>
                <p>
                  <strong>{comment.author}</strong>: {comment.content}
                </p>
                <span style={styles.commentDate}>
                  {new Date(comment.createdDt).toLocaleString()}
                </span>
              </div>
            ))}

            <div style={styles.commentInput}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows="3"
              />
              <button onClick={handleAddComment}>Add Comment</button>
            </div>
          </div>

      

			
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "20px auto",
    textAlign: "left",
  },
  detailBox: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  content: {
    whiteSpace: "pre-wrap",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    margin: "10px 0",
  },
	editButton: {
    marginTop: "10px",
    marginRight: "10px",
    padding: "10px 15px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
	deleteButton: {
    marginTop: "10px",
    marginRight: "10px",
    padding: "10px 15px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  button: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
	commentSection: {
    marginTop: "20px",
  },
  comment: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  commentDate: {
    fontSize: "12px",
    color: "#999",
  },
  commentInput: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
};

export default Detail;