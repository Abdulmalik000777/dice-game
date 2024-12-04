import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "../components/Comments"; // Ensure this path is correct
import Likes from "../components/Likes";

function Template() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`/api/templates/${id}`);
        setTemplate(res.data);
      } catch (error) {
        console.error("Error fetching template", error);
      }
    };

    fetchTemplate();
  }, [id]);

  return (
    <div className="container">
      {template ? (
        <div>
          <h2>{template.title}</h2>
          <p>{template.description}</p>
          <Likes templateId={id} />
          <Comments templateId={id} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Template;
