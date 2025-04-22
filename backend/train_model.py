import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import (
    accuracy_score, 
    classification_report, 
    confusion_matrix, 
    roc_auc_score
)
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv(r"Your_Dataset_Path.csv")

# Encode categorical features
label_encoders = {}
categorical_cols = ["Payment Method", "Address Issues", "Peak Hour Order", "Time of Order"]
for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le  # Store encoder for future use

# Split features and target variable
X = df.drop(columns=["Order ID", "Canceled"])
y = df["Canceled"]

# Scale numerical features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

# Train Random Forest Model with Hyperparameter Tuning
model = RandomForestClassifier(
    n_estimators=100, 
    max_depth=10,  # Prevent overfitting
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42
)
model.fit(X_train, y_train)

# Model Performance Metrics
y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)[:, 1]

print("Model Performance Metrics:")
print(f"Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Cross-Validation
cv_scores = cross_val_score(model, X_scaled, y, cv=5)
print(f"\nCross-Validation Scores: {cv_scores}")
print(f"Mean CV Score: {cv_scores.mean() * 100:.2f}%")

# Feature Importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)
print("\nFeature Importance:")
print(feature_importance)

# Visualization of Feature Importance
plt.figure(figsize=(10, 6))
sns.barplot(x='importance', y='feature', data=feature_importance)
plt.title('Feature Importance in Order Cancellation Prediction')
plt.tight_layout()
plt.savefig('feature_importance.png')

# Save model and preprocessing artifacts
model_artifacts = {
    'model': model,
    'label_encoders': label_encoders,
    'scaler': scaler
}

with open("order_cancellation_model_artifacts.pkl", "wb") as artifacts_file:
    pickle.dump(model_artifacts, artifacts_file)

print("\nModel and preprocessing artifacts saved successfully!")