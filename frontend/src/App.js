import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css"; // Import the CSS file
import ResultPage from "./ResultPage"; // Import the ResultPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} /> {/* Form Page */}
        <Route path="/result" element={<ResultPage />} /> {/* Result Page */}
      </Routes>
    </Router>
  );
}

function FormPage() {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    ever_married: "",
    work_type: "",
    Residence_type: "",
    avg_glucose_level: "",
    bmi: "",
    smoking_status: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log("Response:", result);

    // Navigate to the result page and pass the prediction result
    navigate("/result", { state: { prediction: result.stroke } });
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1 className="title">Stroke Prediction</h1>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Gender */}
            <div className="form-group">
              <label>
                Gender:
                <select name="gender" onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            {/* Age */}
            <div className="form-group">
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  onChange={handleChange}
                  placeholder="Age"
                  required
                />
              </label>
            </div>
          </div>

          <div className="row">
            {/* Hypertension */}
            <div className="form-group">
              <label>
                Hypertension:
                <select name="hypertension" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </label>
            </div>

            {/* Heart Disease */}
            <div className="form-group">
              <label>
                Heart Disease:
                <select name="heart_disease" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </label>
            </div>
          </div>

          <div className="row">
            {/* Ever Married */}
            <div className="form-group">
              <label>
                Ever Married:
                <select name="ever_married" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>
            </div>

            {/* Work Type */}
            <div className="form-group">
              <label>
                Work Type:
                <select name="work_type" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Private">Private</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Govt_job">Govt_job</option>
                  <option value="Children">Children</option>
                  <option value="Never_worked">Never worked</option>
                </select>
              </label>
            </div>
          </div>

          <div className="row">
            {/* Residence Type */}
            <div className="form-group">
              <label>
                Residence Type:
                <select name="Residence_type" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Urban">Urban</option>
                  <option value="Rural">Rural</option>
                </select>
              </label>
            </div>

            {/* Avg Glucose Level */}
            <div className="form-group">
              <label>
                Avg Glucose Level:
                <input
                  type="number"
                  name="avg_glucose_level"
                  onChange={handleChange}
                  placeholder="Avg Glucose Level"
                  step="0.01"
                  required
                />
              </label>
            </div>
          </div>

          <div className="row">
            {/* BMI */}
            <div className="form-group">
              <label>
                BMI:
                <input
                  type="number"
                  name="bmi"
                  onChange={handleChange}
                  placeholder="BMI"
                  step="0.01"
                  required
                />
              </label>
            </div>

            {/* Smoking Status */}
            <div className="form-group">
              <label>
                Smoking Status:
                <select name="smoking_status" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="formerly smoked">Formerly Smoked</option>
                  <option value="never smoked">Never Smoked</option>
                  <option value="smokes">Smokes</option>
                </select>
              </label>
            </div>
          </div>

          <button type="submit">Predict Stroke</button>
        </form>
      </div>
    </div>
  );
}

export default App;