import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css"; // Import the CSS file

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const prediction = location.state?.prediction; // Get the prediction result from location state

  const handleGoBack = () => {
    navigate("/"); // Navigate back to the form page
  };

  return (
    <div className="app-container">
      <div className="result-container">
        <h3>Prediction Result</h3>
        <div
          style={{
            padding: "15px",
            marginTop: "10px",
            backgroundColor: prediction ? "#ffe6e6" : "#e6ffe6",
            border: `2px solid ${prediction ? "#ff9999" : "#99ff99"}`,
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {prediction ? (
              <span style={{ fontSize: "24px" }}>⚠️</span>
            ) : (
              <span style={{ fontSize: "24px" }}>✅</span>
            )}
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: prediction ? "#cc0000" : "#006600",
              }}
            >
              {prediction
                ? "Higher Risk of Stroke Detected"
                : "Lower Risk of Stroke Detected"}
            </span>
          </div>
          <p
            style={{
              marginTop: "10px",
              color: "#666",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            {prediction
              ? "Please consult with a healthcare provider for proper medical evaluation."
              : "Continue maintaining a healthy lifestyle and regular check-ups."}
          </p>
        </div>
        <button onClick={handleGoBack} style={{ marginTop: "20px" }}>
          Go Back to Form
        </button>
      </div>
    </div>
  );
}

export default ResultPage;