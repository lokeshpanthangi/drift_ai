# Employee Attrition Prediction

## Project Overview
This project analyzes employee attrition data and builds predictive models to identify employees who are likely to leave the company. The dataset contains 300 employees with various features including demographics, job roles, income, and work history.

## Most Contributed Features in the Provided DATASET 
![alt text](output.png)

## Most Contributed Features in the Created DATASET 
![alt text](new_data.png)


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

### Best Model Selection

#### Phase 1: Small Dataset (300 rows)
- **Best Model**: Logistic Regression with SMOTE
- **Accuracy**: 57%
- **Reasoning**: While Random Forest had higher accuracy, it failed to identify leavers (Recall ~5%). Logistic Regression with SMOTE provided the best balance, identifying 45% of leavers.

#### Phase 2: Large Dataset (3000 rows)
- **Best Model**: Random Forest
- **Accuracy**: 90%
- **Reasoning**: With sufficient data, the ensemble method (Random Forest) demonstrated its full potential, significantly outperforming Logistic Regression in both Accuracy and F1 Score.

## Dataset Comparison: Small vs Large Data

We expanded our analysis by creating a new, larger dataset with 3000 records (compared to the original 300). This new dataset is also balanced (approx. 50/50 split), unlike the original imbalanced dataset.

### Performance Comparison Table

| Model | Metric | Small Dataset (300 rows, Imbalanced) | Large Dataset (3000 rows, Balanced) |
|-------|--------|--------------------------------------|-------------------------------------|
| **Logistic Regression** | Accuracy | 51% (No SMOTE) / 58% (SMOTE) | 85% (Both) |
| | Recall | 32% (No SMOTE) / 45% (SMOTE) | 83% (Both) |
| | F1 Score | 0.24 (No SMOTE) / 0.34 (SMOTE) | 0.85 (Both) |
| **Random Forest** | Accuracy | 77% (No SMOTE) / 73% (SMOTE) | 90% (Both) |
| | Recall | 5% (No SMOTE) / 5% (SMOTE) | 90% (Both) |
| | F1 Score | 0.09 (No SMOTE) / 0.08 (SMOTE) | 0.90 (Both) |

### Key Observations

1.  **Impact of Data Size & Balance**:
    *   **Small Dataset**: The models struggled significantly. Random Forest achieved high accuracy (77%) but failed to detect attrition (Recall ~5%), essentially predicting everyone would stay. Logistic Regression with SMOTE was the most "useful" model here, despite lower accuracy, as it could actually identify some leavers (Recall 45%).
    *   **Large Dataset**: Performance improved drastically. Both models achieved high scores across all metrics.

2.  **Model Selection Shift**:
    *   With **limited data**, simple Logistic Regression (with SMOTE) was preferred because complex models like Random Forest failed to learn the minority class patterns.
    *   With **sufficient data**, Random Forest (Ensemble method) outperformed Logistic Regression (90% vs 85% accuracy), proving its superior capability when fed enough data.

3.  **Effect of SMOTE**:
    *   **Small Dataset**: SMOTE was crucial for Logistic Regression, improving Recall from 32% to 45%.
    *   **Large Dataset**: Since the new dataset was already balanced, SMOTE had negligible impact on performance.

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



## So the provided results were not satisfactory so i create a new dataset using sklearn make_classification method around 3000 rows and see what happens 

### Best Model: **Random Forest with SMOTE**
- **Accuracy**: 90%
- Best overall performance among all trained models
- Random Forest performed Best being an ensemble method

## Feature Importance Analysis

Analyzed the top 10 feature coefficients driving attrition using the best model (Logistic Regression with SMOTE). Created visualization showing positive and negative impacts on attrition probability.