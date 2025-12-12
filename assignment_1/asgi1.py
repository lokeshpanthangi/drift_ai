import pickle
from pydantic import BaseModel
import pandas as pd


#Load the Model and the FITTED Transformer

with open('logistic_smote_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('transformer.pkl', 'rb') as f:
    transformer = pickle.load(f)


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



def predict_attrition(data: LogisticModel):
    if transformer is None:
        return {'error': 'Model transformer failed to load.'}

    input_data = data.dict()
    df = pd.DataFrame([input_data])
    
    transformed_data = transformer.transform(df)
    
    prediction = model.predict(transformed_data)

    
    return {
        'attrition_prediction': int(prediction[0]),
    }