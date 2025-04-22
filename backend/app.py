# Server-side (app.py)
from flask import Flask, request, jsonify
import pickle
import numpy as np
import traceback
from flask_cors import CORS  # Add this for cross-origin requests

# Load trained model
try:
    with open("order_cancellation_model.pkl", "rb") as model_file:
        model = pickle.load(model_file)
except FileNotFoundError:
    print("Model file not found. Please ensure 'order_cancellation_model.pkl' exists.")
    model = None

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return "Order Cancellation Prediction API is Running! Use /predict"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Print all incoming request details for debugging
        print("Request Method:", request.method)
        print("Request Content Type:", request.content_type)
        print("Request Headers:", request.headers)
        print("Raw Request Data:", request.data)

        # Force content type to JSON if not set
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        # Get JSON data with silent=True to prevent errors
        data = request.get_json(silent=True)
        
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        print("Parsed JSON:", data)

        # Validate required keys
        required_keys = [
            "delivery_time", "order_value", "cancellation_history",
            "distance", "time_of_order", "payment_method",
            "address_issues", "peak_hour_order"
        ]
        
        for key in required_keys:
            if key not in data:
                return jsonify({"error": f"Missing required key: {key}"}), 400

        # Prepare features for prediction
        features = np.array([
            data["delivery_time"], data["order_value"], data["cancellation_history"],
            data["distance"], data["time_of_order"], data["payment_method"],
            data["address_issues"], data["peak_hour_order"]
        ]).reshape(1, -1)

        # Check if model is loaded
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500

        # Make prediction
        prediction = model.predict(features)[0]
        return jsonify({"cancel_prediction": int(prediction)})

    except Exception as e:
        print("Error occurred:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

# Client-side testing script (test_client.py)
import requests

def test_prediction():
    url = "http://localhost:5000/predict"
    
    # Sample prediction data
    data = {
        "delivery_time": 30,
        "order_value": 500,
        "cancellation_history": 2,
        "distance": 10,
        "time_of_order": 14,
        "payment_method": 1,
        "address_issues": 0,
        "peak_hour_order": 1
    }
    
    # Send POST request
    try:
        response = requests.post(url, json=data)
        print("Response Status Code:", response.status_code)
        print("Response JSON:", response.json())
    except requests.exceptions.RequestException as e:
        print("Error:", e)

if __name__ == "__main__":
    test_prediction()