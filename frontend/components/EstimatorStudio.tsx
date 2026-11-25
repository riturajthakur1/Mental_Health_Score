"use client";

import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/predict";

interface StudentFormState {
  age: string;
  gender: "Male" | "Female";
  country: string;
  academic_level: "High School" | "Undergraduate" | "Graduate";
  most_used_platform: string;
  purpose_of_use: "Networking" | "Education" | "Entertainment" | "News";
  avg_daily_usage_hours: string;
  daily_unlocks: string;
  study_hours: string;
  physical_activity_hours: string;
  sleep_hours_per_night: string;
  stress_level: "Low" | "Medium" | "High" | "Very High";
}

const PRESETS: Record<string, { label: string; values: StudentFormState }> = {
  typical: {
    label: "Typical",
    values: {
      age: "20",
      gender: "Male",
      country: "India",
      academic_level: "Undergraduate",
      most_used_platform: "Instagram",
      purpose_of_use: "Education",
      avg_daily_usage_hours: "6.0",
      daily_unlocks: "171",
      study_hours: "4.0",
      physical_activity_hours: "1.0",
      sleep_hours_per_night: "7.0",
      stress_level: "Medium",
    },
  },
  balanced: {
    label: "Balanced",
    values: {
      age: "21",
      gender: "Female",
      country: "USA",
      academic_level: "Undergraduate",
      most_used_platform: "YouTube",
      purpose_of_use: "Education",
      avg_daily_usage_hours: "2.5",
      daily_unlocks: "48",
      study_hours: "5.0",
      physical_activity_hours: "2.0",
      sleep_hours_per_night: "8.2",
      stress_level: "Low",
    },
  },
  strained: {
    label: "High screen",
    values: {
      age: "19",
      gender: "Male",
      country: "UK",
      academic_level: "Undergraduate",
      most_used_platform: "TikTok",
      purpose_of_use: "Entertainment",
      avg_daily_usage_hours: "8.0",
      daily_unlocks: "230",
      study_hours: "2.0",
      physical_activity_hours: "0.3",
      sleep_hours_per_night: "4.8",
      stress_level: "Very High",
    },
  },
};

const COUNTRIES = [
  "India",
  "USA",
  "Canada",
  "Australia",
  "UK",
  "Germany",
  "Mexico",
  "Turkey",
  "France",
  "Other",
];

const PLATFORMS = [
  "Facebook",
  "LinkedIn",
  "Instagram",
  "Snapchat",
  "Twitter",
  "YouTube",
  "TikTok",
  "LINE",
  "KakaoTalk",
  "VKontakte",
  "WhatsApp",
  "WeChat",
];

function interpretationFor(score: number) {
  if (score >= 7.5) {
    return "Above the 6.23 dataset mean. Habits align with higher-scoring respondents in the 5,000-student sample.";
  }
  if (score >= 5.5) {
    return "Near the 6.23 dataset mean. Small shifts in sleep duration or daily screen time move this estimate.";
  }
  return "Below the 6.23 dataset mean. If this reflects how you feel, consider speaking with someone you trust or campus support.";
}

export function EstimatorStudio() {
  const [activePreset, setActivePreset] = useState<string>("typical");
  const [form, setForm] = useState<StudentFormState>(PRESETS.typical.values);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  function updateField<K extends keyof StudentFormState>(
    key: K,
    value: StudentFormState[K],
  ) {
    setActivePreset("custom");
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function applyPreset(key: string) {
    const preset = PRESETS[key];
    if (!preset) return;
    setActivePreset(key);
    setForm(preset.values);
    setError(null);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    setError(null);

    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(form.age),
          gender: form.gender,
          country: form.country,
          academic_level: form.academic_level,
          most_used_platform: form.most_used_platform,
          purpose_of_use: form.purpose_of_use,
          avg_daily_usage_hours: Number(form.avg_daily_usage_hours),
          daily_unlocks: Number(form.daily_unlocks),
          study_hours: Number(form.study_hours),
          physical_activity_hours: Number(form.physical_activity_hours),
          sleep_hours_per_night: Number(form.sleep_hours_per_night),
          stress_level: form.stress_level,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const detail = Array.isArray(data.detail)
          ? data.detail[0]?.msg
          : data.detail;
        throw new Error(detail || "Prediction request failed.");
      }

      const value = Number(data.predicted_mental_health_score);
      if (!Number.isFinite(value)) {
        throw new Error("The API returned an invalid score.");
      }
      setScore(value);
    } catch (cause) {
      setError(
        cause instanceof TypeError
          ? `Could not reach ${API_URL}. Make sure the FastAPI server is running on port 8000.`
          : cause instanceof Error
            ? cause.message
            : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  function onReset() {
    applyPreset("typical");
    setScore(null);
    setError(null);
  }

  const statusState = error
    ? "error"
    : score !== null
      ? "success"
      : "idle";
  const statusLabel = loading
    ? "Running…"
    : error
      ? "Error"
      : score !== null
        ? "200 OK"
        : "Ready";

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__head">
          <h1 className="hero__title">
            <span className="hero__line">Score your habits</span>
            <span className="hero__line hero__line--delayed">
              in one <em className="hero__title-italic">glance.</em>
            </span>
          </h1>
          <p className="hero__sub">
            MindMetric turns twelve daily student habits
            <br />
            into a 0–10 mental health score.
          </p>
          <div className="hero__cta">
            <a className="btn btn--soft" href="#studio">
              Use the model
            </a>
            <a className="btn btn--link" href="#dataset">
              View dataset
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="studio" id="studio">
          <div className="studio__bar">
            <div className="studio__bar-left">
              <span className="studio__title">Estimator</span>
              <span className="mono" style={{ color: "var(--ink-muted)" }}>
                POST /predict
              </span>
            </div>

            <div className="studio__presets" aria-label="Sample presets">
              <span className="mono" style={{ color: "var(--ink-muted)", marginRight: 4 }}>
                Presets:
              </span>
              {Object.entries(PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  className="preset-chip"
                  data-active={activePreset === key}
                  onClick={() => applyPreset(key)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="studio__grid">
            <form className="studio__form-pane" onSubmit={onSubmit}>
              <div className="field-group">
                <p className="field-group__label">Profile</p>
                <div className="fields-row">
                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="age">Age</label>
                      <span className="field__hint">18–24</span>
                    </div>
                    <input
                      id="age"
                      type="number"
                      min={18}
                      max={24}
                      value={form.age}
                      onChange={(e) => updateField("age", e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="gender">Gender</label>
                    </div>
                    <select
                      id="gender"
                      value={form.gender}
                      onChange={(e) =>
                        updateField("gender", e.target.value as "Male" | "Female")
                      }
                      required
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>

                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="country">Country</label>
                    </div>
                    <select
                      id="country"
                      value={form.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      required
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="academic_level">Academic level</label>
                    </div>
                    <select
                      id="academic_level"
                      value={form.academic_level}
                      onChange={(e) =>
                        updateField(
                          "academic_level",
                          e.target.value as StudentFormState["academic_level"],
                        )
                      }
                      required
                    >
                      <option value="High School">High School</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field-group">
                <p className="field-group__label">Digital habits</p>
                <div className="fields-row">
                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="most_used_platform">Most-used platform</label>
                    </div>
                    <select
                      id="most_used_platform"
                      value={form.most_used_platform}
                      onChange={(e) =>
                        updateField("most_used_platform", e.target.value)
                      }
                      required
                    >
                      {PLATFORMS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="purpose_of_use">Primary purpose</label>
                    </div>
                    <select
                      id="purpose_of_use"
                      value={form.purpose_of_use}
                      onChange={(e) =>
                        updateField(
                          "purpose_of_use",
                          e.target.value as StudentFormState["purpose_of_use"],
                        )
                      }
                      required
                    >
                      <option value="Networking">Networking</option>
                      <option value="Education">Education</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="News">News</option>
                    </select>
                  </div>

                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="avg_daily_usage_hours">Daily usage (hrs)</label>
                      <span className="field__hint">1–8.8</span>
                    </div>
                    <input
                      id="avg_daily_usage_hours"
                      type="number"
                      min={1}
                      max={8.8}
                      step={0.1}
                      value={form.avg_daily_usage_hours}
                      onChange={(e) =>
                        updateField("avg_daily_usage_hours", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="daily_unlocks">Daily unlocks</label>
                      <span className="field__hint">1–273</span>
                    </div>
                    <input
                      id="daily_unlocks"
                      type="number"
                      min={1}
                      max={273}
                      value={form.daily_unlocks}
                      onChange={(e) => updateField("daily_unlocks", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="field-group">
                <p className="field-group__label">Routine & stress</p>
                <div className="fields-row">
                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="study_hours">Study hours</label>
                      <span className="field__hint">0.3–8.3</span>
                    </div>
                    <input
                      id="study_hours"
                      type="number"
                      min={0.3}
                      max={8.3}
                      step={0.1}
                      value={form.study_hours}
                      onChange={(e) => updateField("study_hours", e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="physical_activity_hours">
                        Physical activity (hrs)
                      </label>
                      <span className="field__hint">0–4.1</span>
                    </div>
                    <input
                      id="physical_activity_hours"
                      type="number"
                      min={0}
                      max={4.1}
                      step={0.1}
                      value={form.physical_activity_hours}
                      onChange={(e) =>
                        updateField("physical_activity_hours", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="sleep_hours_per_night">Sleep (hrs)</label>
                      <span className="field__hint">3.6–9.9</span>
                    </div>
                    <input
                      id="sleep_hours_per_night"
                      type="number"
                      min={3.6}
                      max={9.9}
                      step={0.1}
                      value={form.sleep_hours_per_night}
                      onChange={(e) =>
                        updateField("sleep_hours_per_night", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="field">
                    <div className="field__head">
                      <label htmlFor="stress_level">Stress level</label>
                    </div>
                    <select
                      id="stress_level"
                      value={form.stress_level}
                      onChange={(e) =>
                        updateField(
                          "stress_level",
                          e.target.value as StudentFormState["stress_level"],
                        )
                      }
                      required
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Very High">Very High</option>
                    </select>
                  </div>
                </div>
              </div>

              {error ? (
                <p className="form-error" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="form-actions">
                <span className="mono" style={{ color: "var(--ink-muted)" }}>
                  12 fields · no data stored
                </span>
                <div className="form-actions__buttons">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={onReset}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={loading}
                  >
                    {loading ? "Estimating…" : "Estimate score"}
                  </button>
                </div>
              </div>
            </form>

            <aside className="studio__inspector" aria-live="polite">
              <div>
                <div className="inspector__header">
                  <span className="mono" style={{ color: "var(--ink-muted)" }}>
                    OUTPUT INSPECTOR
                  </span>
                  <span className="status-pill" data-state={statusState}>
                    {statusLabel}
                  </span>
                </div>

                <div className="score-card">
                  <p className="score-card__label">Predicted mental health score</p>
                  <div className="score-card__value">
                    <strong>{score !== null ? score.toFixed(2) : "—"}</strong>
                    <span>/ 10</span>
                  </div>
                  <div className="score-bar" aria-hidden="true">
                    <div
                      className="score-bar__fill"
                      style={{
                        width: `${score !== null ? Math.min(100, Math.max(0, score * 10)) : 0}%`,
                      }}
                    />
                    <div
                      className="score-bar__mean"
                      style={{ left: "62.3%" }}
                      title="Sample mean: 6.23"
                    />
                  </div>
                  <p className="score-card__note">
                    {score !== null
                      ? interpretationFor(score)
                      : "Adjust any of the twelve fields or pick a preset, then click Estimate score to query the model."}
                  </p>
                </div>

                <div className="inspector-list">
                  <div className="inspector-row">
                    <span>Sleep / night</span>
                    <b>{form.sleep_hours_per_night || "—"} h</b>
                  </div>
                  <div className="inspector-row">
                    <span>Daily usage</span>
                    <b>{form.avg_daily_usage_hours || "—"} h</b>
                  </div>
                  <div className="inspector-row">
                    <span>Phone unlocks</span>
                    <b>{form.daily_unlocks || "—"}</b>
                  </div>
                  <div className="inspector-row">
                    <span>Stress level</span>
                    <b>{form.stress_level}</b>
                  </div>
                </div>
              </div>

              <p className="inspector__foot">
                Vertical marker on the bar indicates the sample mean (6.23) across
                5,000 student responses.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
