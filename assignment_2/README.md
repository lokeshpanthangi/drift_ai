# Employee Attrition Prediction - Debugging Assignment

## Project Overview
This project involves analyzing, debugging, and fixing a broken machine learning pipeline designed to predict employee attrition. The original notebook contained several critical data leakage issues that led to artificially inflated accuracy scores. The goal was to identify these flaws and implement a robust, production-ready solution.

## Analysis of the Broken Model
The initial model achieved an accuracy of over 95%, which was suspiciously high for a human behavior prediction task. Upon inspection, several critical errors were identified:

### 1. Target Leakage
The most significant issue was the inclusion of features that directly leaked the target variable into the training data.
- `attrition_copy`: A direct copy of the target variable.
- `target_leakage_feature`: A simple transformation of the target variable.

These features allowed the model to "cheat" by looking up the answer rather than learning patterns from legitimate employee data.

### 2. Preprocessing Data Leakage
The original code applied `StandardScaler` and `OneHotEncoder` to the entire dataset before splitting it into training and testing sets.
- This allowed the model to "peek" at the statistical properties (mean, variance, categories) of the test set during training.
- This violates the fundamental rule that the test set must remain completely unseen until the final evaluation.

### 3. Incorrect Validation Strategy
Cross-validation was performed on the test set instead of the training set. This defeats the purpose of a hold-out test set, which should only be used for a single final evaluation.

### 4. Poor Data Handling
Missing values were filled with zeros without analysis, which introduced bias into features like Age or Monthly Income where zero is not a valid value.

## The Debugging Process
The debugging process involved a systematic review of the data pipeline:
1. **Feature Audit:** We compared the correlation of all features with the target variable. The leakage features showed a perfect or near-perfect correlation, identifying them as suspicious.
2. **Pipeline Inspection:** We traced the flow of data to ensure that no transformations were applied to the test set before the split.
3. **Code Review:** We identified that the cross-validation function was called on `X_test` instead of `X_train`.

## The Fixed Model
The corrected notebook implements a robust machine learning pipeline with the following improvements:

### 1. Removal of Leakage Features
We explicitly defined a list of `SAFE_FEATURES` (e.g., Age, Department, Job Role) that are legitimately available before an employee leaves. All suspicious columns were removed.

### 2. Proper Train-Test Split
The data is split into training and testing sets before any preprocessing occurs. This ensures that the test set remains completely isolated.

### 3. Scikit-Learn Pipelines
We used `ColumnTransformer` and `Pipeline` to encapsulate preprocessing steps.
- **Numeric Features:** Imputed with the median and scaled using `StandardScaler`.
- **Categorical Features:** Imputed and encoded using `OneHotEncoder` with `handle_unknown='ignore'` to manage future unseen categories.

### 4. Correct Validation
The model is trained on `X_train` and validated using cross-validation on `X_train`. The test set `X_test` is used only once for the final performance report.

## Results Comparison

| Metric | Broken Model | Fixed Model |
|--------|--------------|-------------|
| **Accuracy** | ~95-99% (Fake) | ~75-85% (Realistic) |
| **Reliability** | None (Cannot be used) | High (Production Ready) |
| **Methodology** | Flawed | Robust |

### Conclusion
While the accuracy of the fixed model is lower, it represents the true performance of the model on unseen data. The drop in accuracy confirms that the previous model was relying on leaked information. The new model provides a realistic baseline for predicting employee attrition and can be trusted for decision-making.
