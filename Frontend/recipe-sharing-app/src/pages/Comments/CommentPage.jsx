import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CommentPage() {
  const { id } = useParams(); // recipeId from URL
  const navigate = useNavigate(); // navigation hook
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/comments/${id}`);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments.");
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        `http://localhost:5000/api/comments/${id}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setText("");
      fetchComments(); // refresh after new comment
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ⬅ Back to Meals
      </button>

      <h2 style={styles.heading}>💬 Comments</h2>

      {error && <div style={styles.errorBox}>{error}</div>}

      {/* New Comment Form */}
      <form onSubmit={addComment} style={styles.form}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment..."
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.submitBtn}>
          Post Comment
        </button>
      </form>

      {/* Comment List */}
      <div style={styles.commentList}>
        {comments.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} style={styles.commentBox}>
              <strong style={styles.commentAuthor}>{c.user?.name}</strong>
              <p style={styles.commentText}>{c.text}</p>
              <small style={styles.commentDate}>
                {new Date(c.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: "30px 40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    borderRadius: 12,
  },
  backBtn: {
    marginBottom: 20,
    color: "#4b9e22",
    border: "none",
    padding: "10px 16px",
    fontWeight: "600",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  heading: {
    textAlign: "center",
    color: "#4b9e22",
    fontWeight: "700",
    fontSize: 28,
    marginBottom: 25,
    letterSpacing: 1,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 30,
  },
  textarea: {
    padding: "12px 14px",
    borderRadius: 8,
    border: "1.5px solid #cbd5e1",
    fontSize: 16,
    minHeight: 90,
    resize: "vertical",
    transition: "border-color 0.3s",
    outline: "none",
  },
  submitBtn: {
    backgroundColor: "#4b9e22",
    color: "white",
    padding: "12px 0",
    borderRadius: 8,
    fontWeight: "700",
    fontSize: 16,
    cursor: "pointer",
    border: "none",
    boxShadow: "0 4px 12px rgba(75, 158, 34, 0.6)",
    transition: "background-color 0.3s",
  },
  commentList: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  commentBox: {
    border: "1.5px solid #e5e7eb",
    padding: "12px 16px",
    borderRadius: 10,
    backgroundColor: "#f9fafb",
  },
  commentAuthor: {
    fontWeight: "600",
    color: "#355e1b",
  },
  commentText: {
    marginTop: 6,
    marginBottom: 6,
    color: "#374151",
  },
  commentDate: {
    color: "#6b7280",
    fontSize: 13,
  },
  errorBox: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "12px 16px",
    borderRadius: 8,
    marginBottom: 16,
    fontWeight: "600",
  },
};
