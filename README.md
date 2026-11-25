# MindMetric — Student Mental Health Score Estimator

A full-stack machine learning web application that estimates a student's mental health score (`0–10`) from twelve everyday digital and lifestyle habits using a trained `RandomForestRegressor` model.

> **Disclaimer:** MindMetric provides a statistical estimate based on survey data. It is not a clinical diagnosis and cannot replace professional care.

---

## Overview

- **Backend:** FastAPI service (`main.py`) serving predictions from a pre-trained `scikit-learn` `RandomForestRegressor` pipeline (`Mental_Health_Model.pkl`).
- **Frontend:** Next.js 16 + React 19 interface (`frontend/`) featuring an interactive 12-field estimator, preset profiles (*Typical*, *Balanced*, *High screen*), live score inspector, dataset insights, and smooth scrolling with Lenis.
- **Dataset:** `Student Social Media And Mental Health Impact.csv` (`5,000` student responses, explored and trained in `ML_Project.ipynb`).

---

## Project Structure

```text
Mental_Health_Score/
├── main.py                                           # FastAPI backend & /predict endpoint
├── Mental_Health_Model.pkl                           # Trained RandomForestRegressor model
├── ML_Project.ipynb                                  # Exploratory analysis & model training
├── Student Social Media And Mental Health Impact.csv # 5,000-row student survey dataset
├── requirements.txt                                  # Python dependencies
└── frontend/                                         # Next.js web application
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── EstimatorStudio.tsx
    │   ├── DatasetSection.tsx
    │   ├── FAQSection.tsx
    │   ├── SiteNav.tsx
    │   ├── SiteFooter.tsx
    │   └── SmoothScroll.tsx
    └── public/images/hero-bg.jpg
```

---

## Running Locally

### 1. Backend (FastAPI)

From the repository root:

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

### 2. Frontend (Next.js)

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

To point the frontend at a different backend URL, set `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8000/predict`).

---

## API Reference

### `GET /`
Health check returning `["Welcome to my project"]`.

### `POST /predict`
Accepts a JSON payload with 12 validated fields and returns `{"predicted_mental_health_score": <float>}`.

| Field | Type / Allowed Values | Range / Constraint |
| --- | --- | --- |
| `age` | `int` | `18` – `24` |
| `gender` | `string` | `Male`, `Female` |
| `country` | `string` | Any country (`Top 9` grouped + `Other`) |
| `academic_level` | `string` | `High School`, `Undergraduate`, `Graduate` |
| `most_used_platform` | `string` | `Facebook`, `LinkedIn`, `Instagram`, `Snapchat`, `Twitter`, `YouTube`, `TikTok`, `LINE`, `KakaoTalk`, `VKontakte`, `WhatsApp`, `WeChat` |
| `purpose_of_use` | `string` | `Networking`, `Education`, `Entertainment`, `News` |
| `avg_daily_usage_hours` | `float` | `1.0` – `8.8` |
| `daily_unlocks` | `int` | `1` – `273` |
| `study_hours` | `float` | `0.3` – `8.3` |
| `physical_activity_hours` | `float` | `0.0` – `4.1` |
| `sleep_hours_per_night` | `float` | `3.6` – `9.9` |
| `stress_level` | `string` | `Low`, `Medium`, `High`, `Very High` |

---

## Author

Personal project by **Rituraj Thakur**

- GitHub: [riturajthakur1](https://github.com/riturajthakur1)
- LinkedIn: [rituraj-thakur](https://www.linkedin.com/in/rituraj-thakur/)
