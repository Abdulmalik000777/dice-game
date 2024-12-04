import React, { useState, useEffect } from "react";
import axios from "axios";

function Likes({ templateId }) {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(`/api/likes?templateId=${templateId}`);
        setLikes(res.data.length);
      } catch (error) {
        console.error("Error fetching likes", error);
      }
    };

    fetchLikes();
  }, [templateId]);

  const handleLike = async () => {
    try {
      await axios.post("/api/likes", { templateId });
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error liking template", error);
    }
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <p>{likes} likes</p>
    </div>
  );
}

export default Likes;
