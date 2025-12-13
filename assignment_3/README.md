# Employee Productivity Analysis

## Project Overview
This project aims to predict employee productivity scores based on daily work patterns and behavior. Using a synthetic dataset, we explore the relationship between working hours, task completion, absences, and overall productivity. The project evolves from a basic analysis to a comprehensive machine learning pipeline involving advanced feature engineering and non-linear modeling.

## Dataset
The dataset is synthetically generated to simulate real-world employee metrics.
*   **Source**: `mock_data_gen.ipynb`
*   **File**: `employee_productivity.csv`

### Basic Features
The model initially works with these fundamental features provided in the dataset:
*   **`login_time`**: The hour of the day the employee started work (e.g., 8, 9, 10).
*   **`logout_time`**: The hour of the day the employee finished work.
*   **`total_tasks_completed`**: The number of tasks finished by the employee.
*   **`weekly_absences`**: The number of days the employee was absent in a week.
*   **`productivity_score`** (Target): A score from 0-100 representing the employee's productivity.

## Project Workflow

### 1. Data Generation (`mock_data_gen.ipynb`)
*   Creates a dataset of 1500 employees.
*   Uses `sklearn.make_regression` to establish base relationships.
*   Scales features to realistic ranges (e.g., 8-hour workdays, 20-150 tasks).

### 2. Initial Analysis (`productivity_analysis_t1.ipynb`)
*   **Goal**: Establish a baseline using raw features.
*   **Process**:
    *   Loads data and removes `employee_id`.
    *   Implements a standard pipeline: Scaling -> PCA -> SGD Regressor / Ridge Regression.
    *   **Outcome**: Identifies the need for more complex features to capture the nuances of productivity.

### 3. Advanced Analysis & Feature Engineering (`productivity_analysis_t2.ipynb`)
*   **Goal**: Maximize predictive performance through deep EDA and Feature Engineering.
*   **Exploratory Data Analysis (EDA)**:
    *   Distribution plots and Correlation heatmaps.
    *   Non-linearity checks using scatter plots and residual analysis.
*   **Feature Engineering**:
    The model's performance is significantly boosted by deriving new insights from the basic features:
    *   **`hours_worked`**: Calculated duration (`logout_time` - `login_time`).
    *   **`tasks_per_hour`**: Efficiency metric (`total_tasks_completed` / `hours_worked`).
    *   **`attendance_rate`**: Normalized inverse of absences.
    *   **`work_intensity`**: Interaction between volume and time.
    *   **`efficiency_score`**: A composite score of speed and attendance.
    *   **Behavioral Clusters**: Using K-Means to segment employees into behavioral groups (e.g., "High Performers", "Steady Workers").
*   **Modeling**:
    *   Compares Linear Regression, Decision Trees, and Random Forests.
    *   Demonstrates that non-linear models and engineered features provide superior accuracy.

## Key Insights
*   **Basic features** alone provide a limited view of productivity.
*   **Derived metrics** like *efficiency* (tasks/hour) are stronger predictors than raw counts.
*   **Non-linear relationships** exist; for example, working longer hours doesn't always linearly increase productivity (diminishing returns).

---
*This project demonstrates the end-to-end lifecycle of a machine learning problem, from data creation to advanced feature optimization.*
