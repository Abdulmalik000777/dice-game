import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get("/api/templates");
        setTemplates(res.data);
      } catch (error) {
        console.error("Error fetching templates", error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <ul className="list-group">
        {templates.map((template) => (
          <li key={template.id} className="list-group-item">
            {template.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
