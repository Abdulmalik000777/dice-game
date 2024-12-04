import React, { useState, useEffect } from "react";
import axios from "axios";

function Comments({ templateId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments?templateId=${templateId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [templateId]);

  const handleAddComment = async () => {
    try {
      const res = await axios.post("/api/comments", {
        templateId,
        content: newComment,
      });
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
}

export default Comments;
