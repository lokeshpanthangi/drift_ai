export interface EmployeeFormData {
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

export interface LeakyFormData extends EmployeeFormData {
  attrition_copy: number;
  target_leakage_feature: number;
}

export interface AttritionPredictionResponse {
  attrition_prediction: number;
  attrition_probability: number;
  stay_probability: number;
}

export interface LeakagePredictionResponse {
  prediction: number[];
}

export const GENDER_OPTIONS = ["Male", "Female"] as const;

export const EDUCATION_OPTIONS = [
  "Graduate",
  "Post-Graduate", 
  "PhD",
] as const;

export const DEPARTMENT_OPTIONS = [
  "Finance",
  "HR",
  "IT",
  "Sales",
] as const;

export const JOB_ROLE_OPTIONS = [
  "Executive",
  "Lead",
  "Manager",
] as const;

export const OVERTIME_OPTIONS = ["Yes", "No"] as const;

export const PERFORMANCE_RATING_OPTIONS = [
  { value: 1, label: "1 - Low" },
  { value: 2, label: "2 - Below Average" },
  { value: 3, label: "3 - Average" },
  { value: 4, label: "4 - High" },
] as const;
