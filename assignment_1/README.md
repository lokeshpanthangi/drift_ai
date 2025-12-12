# Employee Attrition Prediction

## Project Overview
This project analyzes employee attrition data and builds predictive models to identify employees who are likely to leave the company. The dataset contains 300 employees with various features including demographics, job roles, income, and work history.

## Most Contributed Features in the DATASET 
![alt text](output.png)




## Dataset Information
- **Total Records**: 300 employees
- **Target Variable**: Attrition (Binary: Stayed/Left)
- **Class Distribution**: 
  - Stayed: 231 employees (77%)
  - Left: 69 employees (23%)
- **Data Quality**: No null values, no duplicate rows

## Exploratory Data Analysis (EDA)

### Key Findings:

1. **Imbalanced Dataset**: Significant class imbalance with only 23% attrition rate

2. **Department Analysis**: 
   - HR team has the highest attrition rate
   - Sales team has the lowest attrition rate

3. **Age Distribution**: 
   - Employees around 35 years of age are less likely to leave
   - This age group also represents the smallest number of employees

4. **Monthly Income**: Analyzed distribution by attrition status using boxplots

5. **Categorical Features**: Analyzed overtime, department, gender, and education effects on attrition

6. **Feature Correlation**: Created correlation heatmap to identify relationships between numerical features

## Data Preprocessing

### Feature Engineering:

1. **OneHot Encoding**: Applied to categorical features without inherent order
   - Department
   - Gender
   - Overtime

2. **Ordinal Encoding**: Applied to categorical features with natural ordering
   - **Education**: Post-Graduate < Graduate < PhD
   - **Job Role**: Executive < Manager < Lead

3. **Standard Scaling**: Normalized numerical features to mean=0 and SD=1
   - Age
   - Monthly Income
   - Years at Company

### Train-Test Split:
- Training Set: 70%
- Test Set: 30%
- Random State: 12

### Handling Imbalanced Data:
Applied **SMOTE (Synthetic Minority Over-sampling Technique)** to create synthetic samples of the minority class (employees who left)

## Models Trained

Trained 4 different model variations using 2 algorithms and 2 data balancing approaches:

### 1. Logistic Regression
- **Version A**: With balanced class weights (without SMOTE)
- **Version B**: With SMOTE synthetic data

### 2. Random Forest Classifier
- **Version A**: With balanced class weights (without SMOTE)
- **Version B**: With SMOTE synthetic data
- Configuration: 100 estimators

## Model Evaluation

All models were evaluated using the following metrics:
- Accuracy
- Precision
- Recall
- F1 Score
- ROC AUC Score
- Confusion Matrix

### Best Model: **Logistic Regression with SMOTE**
- **Accuracy**: 57%
- Best overall performance among all trained models
- Random Forest performed worse despite being an ensemble method

## Feature Importance Analysis

Analyzed the top 10 feature coefficients driving attrition using the best model (Logistic Regression with SMOTE). Created visualization showing positive and negative impacts on attrition probability.

## Model Deployment

Saved the final model artifacts for deployment:

1. **logistic_smote_model.pkl**: Trained Logistic Regression model with SMOTE
2. **transformer.pkl**: Column transformer for preprocessing new data

## Technologies Used

- **Python Libraries**:
  - pandas: Data manipulation
  - numpy: Numerical operations
  - matplotlib & seaborn: Data visualization
  - scikit-learn: Machine learning models and preprocessing
  - imbalanced-learn: SMOTE implementation
  - pickle: Model serialization

## Project Structure

```
.
├── train.ipynb              # Main training notebook with EDA and modeling
├── attrition.csv            # Dataset
├── logistic_smote_model.pkl # Saved model
├── transformer.pkl          # Saved preprocessor
└── README.md               # Project documentation
```

## Key Insights

1. **Imbalanced data requires special handling**: SMOTE improved model performance
2. **Logistic Regression outperformed Random Forest**: Sometimes simpler models work better, especially with limited data
3. **Feature engineering is crucial**: Proper encoding of ordinal and categorical features improved model performance
4. **HR department shows highest attrition**: Targeted retention strategies needed
5. **Model accuracy of 57%**: Indicates that attrition is influenced by factors beyond those captured in the dataset

