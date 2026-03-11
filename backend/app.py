# app.py - Order Cancellation Prediction API
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import traceback
import logging
import os

# --------------------------
# Configuration & Logging
# --------------------------
logging.basicConfig(
    format="%(asctime)s [%(levelname)s] %(message)s",
    level=logging.DEBUG
)

MODEL_PATH = "order_cancellation_model.pkl"

# --------------------------
# Load Model
# --------------------------
model = None
if os.path.exists(MODEL_PATH):
    try:
        with open(MODEL_PATH, "rb") as model_file:
            model = pickle.load(model_file)
        logging.info("✅ Model loaded successfully.")
    except Exception as e:
        logging.error(f"❌ Failed to load model: {e}")
else:
    logging.warning(f"⚠ Model file '{MODEL_PATH}' not found.")

# --------------------------
# Flask App Setup
# --------------------------
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Order Cancellation Prediction API is running!", "usage": "POST /predict"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        logging.info(f"Incoming request from {request.remote_addr}")

        if not request.is_json:
            return jsonify({"error": "Request must be in JSON format"}), 400

        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        logging.debug(f"Received data: {data}")

        required_keys = [
            "delivery_time", "order_value", "cancellation_history",
            "distance", "time_of_order", "payment_method",
            "address_issues", "peak_hour_order"
        ]

        missing_keys = [key for key in required_keys if key not in data]
        if missing_keys:
            return jsonify({"error": f"Missing keys: {', '.join(missing_keys)}"}), 400

        features = np.array([
            data["delivery_time"], data["order_value"], data["cancellation_history"],
            data["distance"], data["time_of_order"], data["payment_method"],
            data["address_issues"], data["peak_hour_order"]
        ]).reshape(1, -1)

        if model is None:
            return jsonify({"error": "Model not loaded"}), 500

        prediction = int(model.predict(features)[0])

        response = {"cancel_prediction": prediction}

        # Add probability/confidence if available
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(features)[0].tolist()
            response["probability"] = proba

        return jsonify(response)

    except Exception as e:
        logging.error("Error during prediction:")
        logging.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
