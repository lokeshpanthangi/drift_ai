import joblib 
import pandas as pd
from pydantic import BaseModel
from sklearn.preprocessing import StandardScaler
from fastapi import APIRouter


class BrokenData(BaseModel):
    age: int
    gender: str
    education: str
    department: str
    job_role: str
    monthly_income: float
    years_at_company: int
    promotions: int
    overtime: str
    performance_rating: float
    attrition_copy: int
    target_leakage_feature : int

class FixedData(BaseModel):
    age: int
    gender: str
    education: str
    department: str
    job_role: str
    monthly_income: float
    years_at_company: int
    promotions: int
    overtime: str
    performance_rating: float

a2_app = APIRouter()

@a2_app.get("/")
def root():
    return {"message": "API is running", "endpoints": ["/predict/broken", "/predict/fixed"]}

model = joblib.load('models/broken.pkl')
scaler = joblib.load('models/scaler.pkl')
fixed_model = joblib.load('models/fixed.pkl')

# Get the exact feature names and order from the scaler
BROKEN_MODEL_TRAINED_COLS = scaler.feature_names_in_.tolist()

broken_categorical_cols = ['gender', 'education', 'department', 'job_role', 'overtime']


@a2_app.post("/predict/broken")
def predict_broken(input_data: BrokenData):
    input_dict = input_data.model_dump()
    input_df = pd.DataFrame([input_dict])
    input_df_encoded = pd.get_dummies(input_df, columns=broken_categorical_cols, drop_first=True)
    X_predict = input_df_encoded.reindex(columns=BROKEN_MODEL_TRAINED_COLS, fill_value=0)
    X_scaled = scaler.transform(X_predict) 
    prediction = model.predict(X_scaled)

    return {"prediction": prediction.tolist()}



@a2_app.post("/predict/fixed")
def predict_fixed(input_data: FixedData):
    input_dict = input_data.model_dump()
    input_df = pd.DataFrame([input_dict])
    
    prediction = fixed_model.predict(input_df)

    return {"prediction": prediction.tolist()}