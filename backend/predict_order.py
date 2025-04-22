import pickle
import numpy as np

# Load trained model
with open("order_cancellation_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

# Sample new order (test input)
new_order = np.array([
    50,    # Delivery Time (min)
    1200,  # Order Value (₹)
    0,     # Cancellation History
    12,    # Distance (km)
    1,     # Time of Order (Encoded)
    0,     # Payment Method (1 = COD, 0 = Online)
    0,     # Address Issues (1 = Yes, 0 = No)
    0      # Peak Hour Order (1 = Yes, 0 = No)
]).reshape(1, -1)

# Predict cancellation
prediction = model.predict(new_order)

# Print result
if prediction[0] == 1:
    print("⚠️ High Risk: Order is likely to be canceled!")
else:
    print("✅ Safe: Order is unlikely to be canceled!")
