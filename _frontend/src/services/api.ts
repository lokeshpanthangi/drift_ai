import { API_ENDPOINTS } from '@/config/api';
import { AttritionPredictionResponse, LeakagePredictionResponse } from '@/types/hr-analytics';

// Type for attrition prediction payload
interface AttritionPayload {
  age: number;
  gender: string;
  education: string;
  department: string;
  job_role: string;
  monthly_income: number;
  years_at_company: number;
  promotions: number;
  overtime: string;
  performance_rating: number;
}

// Type for broken model payload (with leaky features)
interface BrokenModelPayload extends AttritionPayload {
  attrition_copy: number;
  target_leakage_feature: number;
}

// Type for fixed model payload (without leaky features)
type FixedModelPayload = AttritionPayload;

/**
 * Predict employee attrition using Logistic Regression model
 */
export async function predictAttritionLogistic(
  payload: AttritionPayload
): Promise<AttritionPredictionResponse> {
  const response = await fetch(API_ENDPOINTS.PREDICT_ATTRITION_LOGISTIC, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Predict employee attrition using Random Forest model
 */
export async function predictAttritionRandomForest(
  payload: AttritionPayload
): Promise<AttritionPredictionResponse> {
  const response = await fetch(API_ENDPOINTS.PREDICT_ATTRITION_RANDOM_FOREST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Predict using broken model (with data leakage)
 */
export async function predictBrokenModel(
  payload: BrokenModelPayload
): Promise<LeakagePredictionResponse> {
  const response = await fetch(API_ENDPOINTS.PREDICT_BROKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Predict using fixed model (without data leakage)
 */
export async function predictFixedModel(
  payload: FixedModelPayload
): Promise<LeakagePredictionResponse> {
  const response = await fetch(API_ENDPOINTS.PREDICT_FIXED, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
