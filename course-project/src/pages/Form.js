import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Form() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`/api/forms/${id}`);
        setForm(res.data);
      } catch (error) {
        console.error("Error fetching form", error);
      }
    };

    fetchForm();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/forms/${id}`, responses);
      // Redirect or notify success
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="container">
      {form ? (
        <div>
          <h2>Form</h2>
          <form onSubmit={handleSubmit}>
            {form.questions.map((question, index) => (
              <div key={index} className="form-group">
                <label>{question.title}</label>
                <input
                  type="text"
                  className="form-control"
                  name={question.title}
                  value={responses[question.title] || ""}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Form;
