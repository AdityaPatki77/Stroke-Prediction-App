from flask import Flask, jsonify, request
from joblib import load
import numpy as np
from flask_cors import CORS
import pandas as pd

# loading the trained model
model = load("./stroke_prediction_model.joblib")

# initilize the flask app
app =  Flask(__name__)
CORS(app)

# For example, if your frontend (React) is on http://localhost:3000 and the backend (Flask) is on http://localhost:5000, the browser will block the request unless CORS is enabled.

@app.route('/predict', methods=["POST"])
def predict():
    try:
        data = request.json

        df = pd.DataFrame([data])

        prediction = model.predict(df)[0]

        print(f"prediction: {prediction}")

        return jsonify({"stroke": int(prediction)}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Welcome to stroke prediction api"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)