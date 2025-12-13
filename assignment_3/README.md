# Employee Productivity Prediction

## What is this project?
This project predicts how productive an employee will be by looking at their daily work patterns. We built two versions: a basic model and an improved model with better features. The improved version predicts productivity with 99% accuracy.

---

## What you need to install

```bash
pip install numpy pandas matplotlib seaborn scikit-learn scipy
```

---

## How to run the models

### Step 1: Run the baseline model
1. Open Jupyter Notebook
2. Go to `notebooks/productivity_analysis_t1.ipynb`
3. Click "Run All"
4. You'll see basic predictions with 95% accuracy

### Step 2: Run the optimized model
1. Open `notebooks/productivity_analysis_t2.ipynb`
2. Click "Run All"
3. You'll see improved predictions with 99% accuracy
4. See charts comparing before and after

### Step 3: Generate new data (optional)
1. Open `notebooks/mock_data_gen.ipynb`
2. Click "Run All"
3. Creates fresh dataset with 1,500 employees

---

## Expected Output

### 1. Baseline Model (Simple Version)

**What we used:**
- Just 4 basic features from the data
- Simple models without extra work

**Results:**

| Model | Accuracy (R²) | Error (RMSE) |
|-------|---------------|--------------|
| Linear Regression | 78% | 9.85 |
| Decision Tree | 82% | 9.02 |
| **Random Forest** | **95%** | **4.59** |

**Best baseline:** Random Forest with 95% accuracy

---

### 2. Optimized Model (Improved Version)

**What we added:**
- 12 new smart features
- Better model settings
- Advanced techniques

**Results:**

| Model | Accuracy (R²) | Error (RMSE) |
|-------|---------------|--------------|
| Linear Regression | 90% | 6.61 |
| Random Forest | 98% | 2.62 |
| **Gradient Boosting** | **99%** | **2.19** |

**Best optimized:** Gradient Boosting with 99% accuracy

---

### 3. Engineered Features (12 Smart Features)

| Feature Name | What it means |
|--------------|---------------|
| `hours_worked` | How many hours employee works per day |
| `tasks_per_hour` | How many tasks completed each hour (efficiency) |
| `attendance_rate` | How often employee shows up to work |
| `work_intensity` | Combination of hours worked and tasks done |
| `efficiency_score` | Overall productivity combining speed and attendance |
| `is_early_bird` | Whether employee starts work before 9 AM |
| `is_long_hours` | Whether employee works more than 8 hours |
| `task_load_category` | Low, Medium, or High workload grouping |
| `behavioral_cluster` | Which of 4 work style groups employee belongs to |
| `pca_component_1` | Main pattern in the data (technical) |
| `pca_component_2` | Second pattern in the data (technical) |
| `interaction_features` | How different features work together |

**Most important features:** `tasks_per_hour`, `efficiency_score`, `hours_worked`

---

### 4. Before vs After Comparison

| What we measure | Baseline | Optimized | Change |
|-----------------|----------|-----------|--------|
| **Accuracy (R²)** | 95% | 99% | +4% better |
| **Error (RMSE)** | 4.59 | 2.19 | 52% less error |
| **Features used** | 4 basic | 12 smart | 8 more features |
| **Model type** | Random Forest | Gradient Boosting | Better algorithm |

**Key improvement:** We cut the prediction error in half!

---

## Summary of Engineered Features

### Why we created new features:

**Original features (what we started with):**
- Login time
- Logout time  
- Total tasks completed
- Weekly absences

**Problem:** These don't show the full picture

**Solution:** Create smarter features that combine information

### Categories of new features:

**1. Time-based (2 features)**
- `hours_worked` - Shows actual work duration
- Binary flags for early birds and long hours

**2. Efficiency metrics (3 features)**
- `tasks_per_hour` - How fast work gets done
- `efficiency_score` - Overall productivity rating
- `attendance_rate` - Reliability measure

**3. Combined features (2 features)**
- `work_intensity` - Workload pressure indicator
- `interaction_features` - How features relate to each other

**4. Pattern recognition (3 features)**
- `task_load_category` - Low/Medium/High grouping
- `behavioral_cluster` - 4 types of workers identified
- PCA components - Hidden patterns in data

**5. Behavioral flags (2 features)**
- `is_early_bird` - Morning person indicator
- `is_long_hours` - Overtime worker indicator

---

## What the data looks like

**Original dataset:**
- 1,500 employees
- 4 basic columns
- 1 prediction target (productivity score 0-100)

**Split for training:**
- 80% for training (1,200 employees)
- 20% for testing (300 employees)

---

## Key Findings

1. **Feature engineering works**
   - Adding smart features improved accuracy from 95% to 99%
   - Cut prediction error in half

2. **Efficiency matters most**
   - Tasks per hour is the strongest predictor
   - How fast work gets done beats how many hours worked

3. **Employee patterns exist**
   - Found 4 distinct work styles using clustering
   - Early birds and long-hour workers have different patterns

4. **Better algorithms help**
   - Gradient Boosting beat Random Forest
   - Non-linear models work better than linear ones

5. **Small improvements add up**
   - Each new feature made predictions slightly better
   - Combined effect was significant

---

---

## What you learn from this project

1. **Feature engineering is powerful** - New features improved results more than better algorithms
2. **Start simple, then improve** - Baseline shows what's possible, optimization shows what's achievable
3. **Efficiency beats volume** - Tasks per hour matters more than total tasks
4. **Patterns exist in behavior** - Clustering revealed 4 employee work styles
5. **Compare fairly** - Always test on data the model hasn't seen

---

## Bottom Line

**Started with:** 95% accuracy using basic features

**Ended with:** 99% accuracy using smart features

**How we did it:** Created 12 new features that better capture work patterns

**Real impact:** Predictions are now twice as accurate (error cut in half)