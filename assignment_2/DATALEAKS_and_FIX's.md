# 1. The "Answer Key" Leak (Feature Engineering)

**Where is it wrong?**
In the Feature Engineering section, you created two columns:
- `attrition_copy`
- `target_leakage_feature`

Both of these are direct copies or simple transformations of your target variable (`attrition`).

**The Problem:**
You have effectively given the model the "Answer Key" inside the "Question Paper." When the model trains, it doesn't learn that "low income leads to attrition"; it learns "if `attrition_copy` is 1, the answer is 1." It ignores all other data.

**How to solve it:**
We need to remove these columns from `X` before training. We must ensure that `X` (our features) contains only information that would be available before an employee actually quits.

![alt text](leakage_columns.png)
![alt text](model_features_selection.png)

---

# 2. The "Future Peeking" Leak (Preprocessing Leakage)

**Where is it wrong?**
```python
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
# Split AFTER scaling
X_train, X_test, ... = train_test_split(X_scaled, ...)
```

**The Problem:**
StandardScaler calculates the Mean and Standard Deviation of your data to scale it. By running `.fit_transform(X)` on the entire dataset (before splitting), the scaler "saw" the Test data. It used the Test data's mean to scale the Training data.

This is subtle, but strictly speaking, it is data leakage because the training process has been influenced by the test set's distribution.

**How to solve it:**
1. **Split First:** Divide data into Train and Test.
2. **Fit on Train Only:** `scaler.fit(X_train)` (Learn the mean/std from training data only).
3. **Transform Both:** `scaler.transform(X_train)` and `scaler.transform(X_test)`.

---

# 3. The "Practice Exam" Mistake

**Where is it wrong?**
```python
# Run cross-validation only on the TEST set
cv_scores = cross_val_score(model, X_test, y_test, cv=5)
```

**The Problem:**
Cross-Validation (CV) is a technique used to tune your model or check its stability during the training phase.

The Test Set is sacred. It is the "Final Exam." You take it once at the very end.

Running CV on the `X_test` is like taking a practice quiz using the questions from the Final Exam. It defeats the purpose of having a separated test set.

**How to solve it:**
You should run `cross_val_score` on `X_train` and `y_train`. This tells you how stable the model is before you risk touching the final Test set.
