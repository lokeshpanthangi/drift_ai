import pickle
from pydantic import BaseModel
import pandas as pd
from fastapi import APIRouter
from pathlib import Path
from pathlib import Path

# Get the directory containing this file
BASE_DIR = Path(__file__).parent
MODELS_DIR = BASE_DIR / 'models'

with open(MODELS_DIR / 'logistic_smote_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open(MODELS_DIR / 'transformer.pkl', 'rb') as f:
    transformer = pickle.load(f)

with open(MODELS_DIR / 'rand_smote_model.pkl', 'rb') as f:
    rand_smote_model = pickle.load(f)


a1_app = APIRouter()

class LogisticModel(BaseModel):
    age : int
    gender : str
    education : str
    department : str
    job_role : str
    monthly_income : int
    years_at_company : int
    promotions : int
    overtime : str
    performance_rating : int



@a1_app.post('/predict_attrition')
def predict_attrition(data: LogisticModel):
    if transformer is None:
        return {'error': 'Model transformer failed to load.'}

    input_data = data.dict()
    df = pd.DataFrame([input_data])
    
    transformed_data = transformer.transform(df)
    
    prediction = model.predict(transformed_data)
    probability = model.predict_proba(transformed_data)[0]

    
    return {
        'attrition_prediction': int(prediction[0]),
        'attrition_probability': float(probability[1]),
        'stay_probability': float(probability[0])
    }



@a1_app.post('/predict_using_random_forest')
def predict_using_random_forest(data: LogisticModel):
    if transformer is None:
        return {'error': 'Model transformer failed to load.'}

    input_data = data.dict()
    df = pd.DataFrame([input_data])
    
    transformed_data = transformer.transform(df)
    
    prediction = rand_smote_model.predict(transformed_data)
    probability = rand_smote_model.predict_proba(transformed_data)[0]

    
    return {
        'attrition_prediction': int(prediction[0]),
        'attrition_probability': float(probability[1]),
        'stay_probability': float(probability[0])
    }