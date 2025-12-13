// API Configuration
// Ensure the environment variable is set

const getApiBaseUrl = (): string => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  if (!apiUrl) {
    throw new Error(
      'VITE_API_BASE_URL is not defined. Please create a .env file with VITE_API_BASE_URL=http://localhost:8000'
    );
  }
  
  return apiUrl;
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  // Assignment 1: Attrition Prediction
  PREDICT_ATTRITION_LOGISTIC: `${API_BASE_URL}/assignment_1/predict_attrition`,
  PREDICT_ATTRITION_RANDOM_FOREST: `${API_BASE_URL}/assignment_1/predict_using_random_forest`,
  
  // Assignment 2: Data Leakage
  PREDICT_BROKEN: `${API_BASE_URL}/assignment_2/predict/broken`,
  PREDICT_FIXED: `${API_BASE_URL}/assignment_2/predict/fixed`,
} as const;
